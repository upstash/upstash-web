import { UPSTASH_BACKEND_URL } from "@/utils/const.server";
import { NextResponse, type NextRequest } from "next/server";

import { clientHeaders, trackEvent } from "./analytics";

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
    return new NextResponse(
      "something went wrong while fetching Redis start info",
      { status: 500 },
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
    return new NextResponse(
      "something went wrong while starting the Redis database",
      { status: 500 },
    );
  }
}
