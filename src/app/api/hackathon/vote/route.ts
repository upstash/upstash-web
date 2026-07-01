import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { castVote } from "@/lib/hackathon/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  voterId: z.string().min(1),
  projectIds: z.array(z.string()).default([]),
});

export async function POST(req: NextRequest) {
  let parsed: z.infer<typeof Body>;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const result = await castVote(parsed.voterId, parsed.projectIds);
  if (!result.ok) {
    return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json(result);
}
