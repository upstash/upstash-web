import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { resetVotes, setVotingOpen } from "@/lib/hackathon/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.HACKATHON_ADMIN_PASSWORD || "admin1234";

const Body = z.object({
  password: z.string(),
  action: z.enum(["open", "close", "reset"]),
});

export async function POST(req: NextRequest) {
  let parsed: z.infer<typeof Body>;
  try {
    parsed = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (parsed.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ ok: false, error: "Wrong password." }, { status: 401 });
  }

  try {
    if (parsed.action === "open") await setVotingOpen(true);
    else if (parsed.action === "close") await setVotingOpen(false);
    else if (parsed.action === "reset") await resetVotes();
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Action failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
