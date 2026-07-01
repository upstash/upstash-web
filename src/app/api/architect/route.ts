import { extract, isBoxConfigured } from "@/lib/architect/box";
import { priceEngine } from "@/lib/architect/pricing";
import {
  auditAppend,
  cacheGet,
  cacheSet,
  checkRateLimit,
  sessionAppend,
  sessionLoad,
} from "@/lib/architect/redis";
import { SpecValidationError } from "@/lib/architect/schema";
import { citationsFor } from "@/lib/architect/search";
import type { ChatResponse } from "@/lib/architect/types";
import { BoxError } from "@upstash/box";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  message: z.string().min(1).max(2000),
  sessionId: z.string().min(1).max(128),
});

function clientId(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anon";
}

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

/**
 * POST /api/architect — the orchestrator (doc §3, steps 1–7).
 *
 *   1. Ratelimit by IP        4. Extract spec via Box + validate (kill-switch)
 *   2. Response cache         5. Deterministic pricing engine
 *   3. Session history        6. Citations   7. Persist (cache + session + audit)
 *
 * Fail-closed at every guard. The LLM never computes cost and never triggers a side effect.
 */
export async function POST(req: NextRequest) {
  // 0. Validate the request body.
  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await req.json());
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  const { message, sessionId } = body;

  // 1. Ratelimit.
  const { success } = await checkRateLimit(clientId(req));
  if (!success) { return json({ error: "rate_limited" }, 429); }

  // 2. Cache — skip the LLM entirely on repeat/similar requests.
  const cached = await cacheGet(message);
  if (cached) { return json(cached); }

  if (!isBoxConfigured) {
    return json({ error: "llm_unavailable" }, 503);
  }

  // 3. Session history (context only; still untrusted).
  const history = await sessionLoad(sessionId);

  try {
    // 4. Extract → validated WorkloadSpec. Off-schema output throws SpecValidationError.
    const spec = await extract(message, history);

    // 5. Deterministic recommendation + 6. citations.
    const recommendation = priceEngine(spec);
    const citations = citationsFor(recommendation.products);
    const response: ChatResponse = { recommendation, citations, cached: false };

    // 7. Persist: cache the result, append the turn, audit the outcome.
    const now = Date.now();
    await Promise.all([
      cacheSet(message, response),
      sessionAppend(
        sessionId,
        { role: "user", content: message, at: now },
        {
          role: "assistant",
          content: `Recommended: ${recommendation.products
            .map((p) => `${p.product} (${p.chosenPlan})`)
            .join(", ")}`,
          at: now,
        },
      ),
      auditAppend({ sessionId, message, spec, ok: true, at: now }),
    ]);

    return json(response);
  } catch (err) {
    if (err instanceof SpecValidationError) {
      // Always log the full failure server-side: message, raw model output, and validation issues.
      console.error(
        `[architect] unclear_request (session=${sessionId}): ${err.message}`,
        "\n  input:",
        message,
        "\n  raw:",
        err.raw,
        "\n  issues:",
        err.issues,
      );
      await auditAppend({
        sessionId,
        message,
        ok: false,
        reason: "spec_validation",
        raw: typeof err.raw === "string" ? err.raw.slice(0, 2000) : err.raw,
        at: Date.now(),
      });
      return json({ error: "unclear_request" }, 422);
    }
    if (err instanceof Error && err.message === "box_not_configured") {
      console.error("[architect] llm_unavailable: UPSTASH_BOX_API_KEY not set");
      return json({ error: "llm_unavailable" }, 503);
    }
    // The Box run itself failed (agent error, max turns, timeout) — upstream/LLM issue,
    // not our bug. Log it and return a retryable status rather than a 500.
    if (err instanceof BoxError) {
      console.error(
        `[architect] box_run_failed (session=${sessionId}) for input: ${message}`,
        err,
      );
      return json({ error: "generation_failed" }, 503);
    }
    console.error(
      `[architect] internal_error (session=${sessionId}) for input: ${message}`,
      err,
    );
    return json({ error: "internal_error" }, 500);
  }
}
