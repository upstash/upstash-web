import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

import { resetVotes, setVotingOpen } from "@/lib/hackathon/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The admin password is never stored or compared in plaintext — only its
// SHA-256 hash lives here. Default is the hash of "adminhackhaton2026!."; set
// HACKATHON_ADMIN_PASSWORD_HASH (a hex sha256) to override without touching code.
const ADMIN_PASSWORD_HASH = (
  process.env.HACKATHON_ADMIN_PASSWORD_HASH ||
  "5ed6fbc4c8ff7108e39ae65a840fc3bb339fdce02c9a1562bc5dbdd9d4c60a41"
).toLowerCase();

/** Constant-time check of a candidate password against the stored hash. */
function passwordMatches(candidate: string): boolean {
  const candidateHash = createHash("sha256").update(candidate).digest();
  let expected: Buffer;
  try {
    expected = Buffer.from(ADMIN_PASSWORD_HASH, "hex");
  } catch {
    return false;
  }
  if (expected.length !== candidateHash.length) return false;
  return timingSafeEqual(candidateHash, expected);
}

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

  if (!passwordMatches(parsed.password)) {
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
