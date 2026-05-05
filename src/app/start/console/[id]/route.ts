import { NextResponse, type NextRequest } from "next/server";

const CONSOLE_REDIS_START_PATH = "/start/redis";
const UPSTASH_CONSOLE_URL = process.env.UPSTASH_CONSOLE_URL;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!UPSTASH_CONSOLE_URL) {
    return NextResponse.json(
      { error: "UPSTASH_CONSOLE_URL is not configured" },
      { status: 500 },
    );
  }

  return NextResponse.redirect(
    `${UPSTASH_CONSOLE_URL}${CONSOLE_REDIS_START_PATH}/${params.id}`,
  );
}
