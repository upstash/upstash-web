import { NextResponse, type NextRequest } from "next/server";

const UPSTASH_BACKEND_URL = process.env.UPSTASH_BACKEND_URL;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    if (!UPSTASH_BACKEND_URL) {
      return NextResponse.json(
        { error: "UPSTASH_BACKEND_URL is not configured" },
        { status: 500 },
      );
    }

    const upstream = await fetch(
      `${UPSTASH_BACKEND_URL}/v2/agent/redis/metrics/${params.id}`,
      {
        method: "GET",
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
