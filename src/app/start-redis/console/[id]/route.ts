import { NextResponse, type NextRequest } from "next/server";

import { trackEvent } from "../../analytics";

const CONSOLE_REDIS_START_PATH = "/start-redis";
const UPSTASH_CONSOLE_URL =
  process.env.UPSTASH_CONSOLE_URL ?? "https://console.upstash.com";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    trackEvent("start_redis_console", req);

    return NextResponse.redirect(
      `${UPSTASH_CONSOLE_URL}${CONSOLE_REDIS_START_PATH}/${params.id}`,
    );
  } catch (error) {
    console.error("Failed to redirect to Redis console:", error);
    return new NextResponse(
      "something went wrong while redirecting to the Redis console",
      { status: 500 },
    );
  }
}
