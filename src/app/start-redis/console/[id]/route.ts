import { UPSTASH_CONSOLE_URL } from "@/utils/const.server";
import { NextResponse, type NextRequest } from "next/server";

import { trackEvent } from "../../analytics";

const CONSOLE_REDIS_START_PATH = "/start-redis";

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
