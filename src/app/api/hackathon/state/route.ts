import { NextResponse, type NextRequest } from "next/server";

import {
  MAX_VOTES,
  PROJECTS,
  VOTERS,
  ownProjectId,
} from "@/lib/hackathon/data";
import {
  computeResults,
  getBallot,
  getBallots,
  isConfigured,
  isVotingOpen,
} from "@/lib/hackathon/redis";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Public state for both the voting page and the summary/admin page.
 * Pass `?voter=<id>` to also get that voter's current ballot (used to
 * pre-select their picks so they can change their vote).
 */
export async function GET(req: NextRequest) {
  const voterId = req.nextUrl.searchParams.get("voter");

  const [votingOpen, ballots] = await Promise.all([
    isVotingOpen(),
    getBallots(),
  ]);
  const results = computeResults(ballots, votingOpen);

  const myBallot = voterId ? await getBallot(voterId) : null;

  return NextResponse.json({
    configured: isConfigured(),
    votingOpen,
    maxVotes: MAX_VOTES,
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
    })),
    tally: results.tally,
    votedCount: results.votedCount,
    totalVoters: results.totalVoters,
    complete: results.complete,
    winnerIds: results.winnerIds,
    myBallot,
  });
}
