import { NextResponse } from "next/server";

import {
  MAX_POINTS,
  PROJECTS,
  VOTERS,
  ownProjectId,
} from "@/lib/hackathon/data";
import {
  computeResults,
  getBallots,
  getRegisteredIds,
  isConfigured,
  isVotingOpen,
} from "@/lib/hackathon/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public state for both the voting page and the summary/admin page. Note this
 * intentionally never returns anyone's ballot — a voter's picks are only
 * returned by the authenticated /auth and /vote endpoints.
 */
export async function GET() {
  const [votingOpen, ballots, registeredIds] = await Promise.all([
    isVotingOpen(),
    getBallots(),
    getRegisteredIds(),
  ]);
  const results = computeResults(ballots, votingOpen);
  const registered = new Set(registeredIds);

  return NextResponse.json({
    configured: isConfigured(),
    votingOpen,
    maxPoints: MAX_POINTS,
    projects: PROJECTS.map((p) => ({
      id: p.id,
      name: p.name,
      emoji: p.emoji,
      description: p.description,
      members: p.members,
    })),
    voters: VOTERS.map((v) => ({
      id: v.id,
      name: v.name,
      ownProjectId: ownProjectId(v.id),
      voted: results.votedVoterIds.includes(v.id),
      registered: registered.has(v.id),
    })),
    tally: results.tally,
    votedCount: results.votedCount,
    totalVoters: results.totalVoters,
    complete: results.complete,
    winnerIds: results.winnerIds,
  });
}
