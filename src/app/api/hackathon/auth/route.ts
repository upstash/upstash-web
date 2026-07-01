import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { authenticate } from "@/lib/hackathon/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  voterId: z.string().min(1),
  password: z.string().min(1),
});

/**
 * Log in as a voter — or set their password the first time. Returns the voter's
 * current ballot on success so the voting UI can pre-select their picks.
 */
export async function POST(req: NextRequest) {
  let parsed: z.infer<typeof Body>;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = await authenticate(parsed.voterId, parsed.password);
  if (!result.ok) {
    const status = result.error === "Wrong password." ? 401 : 400;
    return NextResponse.json(result, { status });
  }
  return NextResponse.json(result);
}
