import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { castVote, verifyPassword } from "@/lib/hackathon/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  voterId: z.string().min(1),
  password: z.string().min(1),
  // projectId -> points allocated. Validated in full server-side (castVote).
  points: z.record(z.string(), z.number()).default({}),
});

export async function POST(req: NextRequest) {
  let parsed: z.infer<typeof Body>;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // A ballot can only be cast/changed by someone who knows this voter's password.
  if (!(await verifyPassword(parsed.voterId, parsed.password))) {
    return NextResponse.json(
      { ok: false, error: "Not logged in. Please sign in again." },
      { status: 401 },
    );
  }

  const result = await castVote(parsed.voterId, parsed.points);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}
