import { extract, isBoxConfigured } from "@/lib/architect/box";
import { screenInput } from "@/lib/architect/guard";
import { priceEngine } from "@/lib/architect/pricing";
import {
  auditAppend,
  cacheGet,
  cacheSet,
  checkRateLimit,
  clearDemoState,
} from "@/lib/architect/redis";
import { SpecValidationError } from "@/lib/architect/schema";
import { citationsFor } from "@/lib/architect/search";
import type { ChatResponse } from "@/lib/architect/types";
import { BoxError } from "@upstash/box";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Box spins up a container + runs the agent, which far exceeds Vercel's default 15s limit.
// 60s works on Hobby and all paid plans; raise toward 300 on Pro/Enterprise if runs need it.
export const maxDuration = 60;

// One-shot, anonymous: just a description. No sessionId, no conversation state.
const Body = z.object({
  message: z.string().min(1).max(2000),
});

// Demo-only affordances (the `clearhistory` command) are available on preview
// deployments and local dev, never in production.
const IS_DEMO =
  process.env.VERCEL_ENV === "preview" ||
  process.env.NODE_ENV === "development";

function clientId(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anon";
}

const json = (data: unknown, status = 200) =>
  NextResponse.json(data, { status });

/**
 * POST /api/architect — stateless, one-shot advisor. Same pipeline for web + agents.
 *
 *   1. Ratelimit by IP     3. Cache            5. Deterministic pricing engine
 *   2. Input gate          4. Extract via Box  6. Citations   7. Cache + audit
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
  const { message } = body;

  // Demo escape hatch (preview / local only): wipe cache + rate-limit keys so the same
  // prompt can be re-run fresh. Runs before rate-limiting so it works even when limited.
  if (IS_DEMO && message.trim().toLowerCase() === "clearhistory") {
    const cleared = await clearDemoState();
    return json({
      cleared: true,
      message: `Cleared ${cleared} key(s) — cache + rate limits reset.`,
    });
  }

  // 1. Ratelimit.
  const { success } = await checkRateLimit(clientId(req));
  if (!success) {
    return json({ error: "rate_limited" }, 429);
  }

  // 2. Input gate — shared by web + agent callers. Fail fast (no LLM spend) on
  // too-short / too-vague / off-topic input. `message` is the authoritative reason.
  const gate = screenInput(message);
  if (!gate.ok) {
    return json({ error: gate.code, message: gate.message }, 422);
  }

  // 3. Cache — skip the LLM entirely on repeat requests.
  const cached = await cacheGet(message);
  if (cached) {
    return json(cached);
  }

  if (!isBoxConfigured) {
    return json({ error: "llm_unavailable" }, 503);
  }

  try {
    // 4. Extract → validated WorkloadSpec. Off-schema output throws SpecValidationError.
    const spec = await extract(message);

    // 5. Deterministic recommendation + 6. citations.
    const recommendation = priceEngine(spec);
    const citations = citationsFor(recommendation.products);
    const response: ChatResponse = { recommendation, citations, cached: false };

    // 7. Persist: cache the result + audit the outcome.
    await Promise.all([
      cacheSet(message, response),
      auditAppend({ message, spec, ok: true, at: Date.now() }),
    ]);

    return json(response);
  } catch (err) {
    if (err instanceof SpecValidationError) {
      // Always log the full failure server-side: message, raw model output, and issues.
      console.error(
        `[architect] unclear_request: ${err.message}`,
        "\n  input:",
        message,
        "\n  raw:",
        err.raw,
        "\n  issues:",
        err.issues,
      );
      await auditAppend({
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
        `[architect] box_run_failed for input: ${message}`,
        err,
      );
      return json({ error: "generation_failed" }, 503);
    }
    console.error(`[architect] internal_error for input: ${message}`, err);
    return json({ error: "internal_error" }, 500);
  }
}
