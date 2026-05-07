import { NextResponse, type NextRequest } from "next/server";

const CONSOLE_REDIS_START_PATH = "/start/redis";
const UPSTASH_CONSOLE_URL = process.env.UPSTASH_CONSOLE_URL;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    if (!UPSTASH_CONSOLE_URL) {
      return NextResponse.json(
        { error: "UPSTASH_CONSOLE_URL is not configured" },
        { status: 500 },
      );
    }

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
