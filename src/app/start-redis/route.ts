import { apiError } from "@/lib/api-error";
import { NextResponse, type NextRequest } from "next/server";
import { clientHeaders, trackEvent } from "./analytics";

const UPSTASH_BACKEND_URL =
  process.env.UPSTASH_BACKEND_URL ?? "https://api.upstash.com";

export async function GET(req: NextRequest) {
  try {
    trackEvent("start_redis_get", req);

    const upstream = await fetch(
      `${UPSTASH_BACKEND_URL}/v2/agent/redis/start`,
      {
        method: "GET",
        headers: clientHeaders(req),
        cache: "no-store",
      },
    );

    const body = await upstream.text();
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to fetch Redis start info:", error);
    return apiError(
      500,
      "upstream_unavailable",
      "Could not fetch the Redis start instructions from the Upstash API.",
      "Retry after a short delay. If the problem persists, contact support@upstash.com.",
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    trackEvent("start_redis_post", req);

    const idempotencyKey = req.headers.get("Idempotency-Key");

    const upstream = await fetch(
      `${UPSTASH_BACKEND_URL}/v2/agent/redis/start`,
      {
        method: "POST",
        headers: {
          ...clientHeaders(req),
          ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
        },
        cache: "no-store",
      },
    );

    const body = await upstream.text();
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        "Content-Type":
          upstream.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to start Redis agent:", error);
    return apiError(
      500,
      "upstream_unavailable",
      "Could not reach the Upstash API to create the Redis database.",
      "Retry after a short delay. If the problem persists, contact support@upstash.com.",
    );
  }
}
