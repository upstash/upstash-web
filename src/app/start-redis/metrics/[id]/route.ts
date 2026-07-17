import { UPSTASH_BACKEND_URL } from "@/utils/const.server";
import { NextResponse, type NextRequest } from "next/server";

import { clientHeaders, trackEvent } from "../../analytics";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    trackEvent("start_redis_metrics", req);

    const upstream = await fetch(
      `${UPSTASH_BACKEND_URL}/v2/agent/redis/metrics/${params.id}`,
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
    console.error("Failed to fetch Redis metrics:", error);
    return new NextResponse(
      "something went wrong while fetching Redis metrics",
      { status: 500 },
    );
  }
}
