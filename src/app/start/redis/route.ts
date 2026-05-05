import { NextResponse, type NextRequest } from "next/server";

const UPSTASH_BACKEND_URL = process.env.UPSTASH_BACKEND_URL;

export async function GET(_req: NextRequest) {
  if (!UPSTASH_BACKEND_URL) {
    return NextResponse.json(
      { error: "UPSTASH_BACKEND_URL is not configured" },
      { status: 500 },
    );
  }

  const upstream = await fetch(`${UPSTASH_BACKEND_URL}/v2/agent/start`, {
    method: "GET",
    cache: "no-store",
  });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}

export async function POST(req: NextRequest) {
  if (!UPSTASH_BACKEND_URL) {
    return NextResponse.json(
      { error: "UPSTASH_BACKEND_URL is not configured" },
      { status: 500 },
    );
  }

  const idempotencyKey = req.headers.get("Idempotency-Key");

  const upstream = await fetch(`${UPSTASH_BACKEND_URL}/v2/agent/start`, {
    method: "POST",
    headers: idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {},
    cache: "no-store",
  });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "Content-Type":
        upstream.headers.get("Content-Type") ?? "application/json",
    },
  });
}
