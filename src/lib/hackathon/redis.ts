import { Redis } from "@upstash/redis";

import {
  MAX_VOTES,
  PROJECTS,
  VOTERS,
  isValidProject,
  isValidVoter,
  ownProjectId,
} from "./data";

/**
 * Redis-backed storage for hackathon voting. Uses the existing
 * UPSTASH_REDIS_REST_* env vars.
 *
 * Data model (all under the `hackathon:*` namespace):
 *   - `hackathon:open`     string  "1" when voting is open, else "0"/absent
 *   - `hackathon:ballots`  hash    voterId -> JSON array of project ids
 *
 * Tally is computed on read from the ballots hash. With ~19 voters this is a
 * single HGETALL, so there's no need for a separately maintained counter that
 * we'd have to keep in sync when someone changes their vote.
 */

const KEY = {
  open: "hackathon:open",
  ballots: "hackathon:ballots",
} as const;

const isRedisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = isRedisConfigured ? Redis.fromEnv() : null;

export function isConfigured(): boolean {
  return isRedisConfigured;
}

export async function isVotingOpen(): Promise<boolean> {
  if (!redis) return false;
  return (await redis.get<string>(KEY.open)) === "1";
}

export async function setVotingOpen(open: boolean): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.set(KEY.open, open ? "1" : "0");
}

/** Raw ballots: voterId -> project ids they voted for. */
export async function getBallots(): Promise<Record<string, string[]>> {
  if (!redis) return {};
  const raw = (await redis.hgetall<Record<string, unknown>>(KEY.ballots)) ?? {};
  const out: Record<string, string[]> = {};
  for (const [voterId, value] of Object.entries(raw)) {
    out[voterId] = normalizeBallotValue(value);
  }
  return out;
}

export async function getBallot(voterId: string): Promise<string[]> {
  if (!redis) return [];
  const value = await redis.hget<unknown>(KEY.ballots, voterId);
  return normalizeBallotValue(value);
}

/**
 * The Upstash Redis client auto-deserializes JSON, so a stored array may come
 * back as a real array; older/edge cases may come back as a JSON string. Handle
 * both and drop anything that's no longer a valid project.
 */
function normalizeBallotValue(value: unknown): string[] {
  let arr: unknown = value;
  if (typeof value === "string") {
    try {
      arr = JSON.parse(value);
    } catch {
      arr = [];
    }
  }
  if (!Array.isArray(arr)) return [];
  return arr.filter(
    (id): id is string => typeof id === "string" && isValidProject(id),
  );
}

export interface VoteResult {
  ok: boolean;
  error?: string;
  ballot?: string[];
}

/**
 * Cast or replace a voter's ballot. Enforces every rule server-side so the API
 * is the single source of truth:
 *   - voting must be open (closing locks everyone's decision)
 *   - voter must be on the eligible list
 *   - at most MAX_VOTES distinct, valid projects
 *   - cannot vote for your own project
 */
export async function castVote(
  voterId: string,
  projectIds: string[],
): Promise<VoteResult> {
  if (!redis) return { ok: false, error: "Voting storage is not configured." };

  if (!isValidVoter(voterId)) {
    return { ok: false, error: "Unknown voter." };
  }
  if (!(await isVotingOpen())) {
    return { ok: false, error: "Voting is not open." };
  }

  const unique = Array.from(new Set(projectIds));

  if (unique.length > MAX_VOTES) {
    return { ok: false, error: `You can vote for at most ${MAX_VOTES} projects.` };
  }
  for (const id of unique) {
    if (!isValidProject(id)) {
      return { ok: false, error: `Unknown project: ${id}` };
    }
  }
  const own = ownProjectId(voterId);
  if (own && unique.includes(own)) {
    return { ok: false, error: "You can't vote for your own project." };
  }

  await redis.hset(KEY.ballots, { [voterId]: JSON.stringify(unique) });
  return { ok: true, ballot: unique };
}

export interface Results {
  tally: Record<string, number>;
  votedVoterIds: string[];
  votedCount: number;
  totalVoters: number;
  complete: boolean;
  /** Winning project id(s). Multiple on a tie. Empty until complete. */
  winnerIds: string[];
}

/**
 * Compute live results from the ballots.
 * `votingOpen` is passed in so "complete" reflects an admin close as well as
 * "everyone has voted".
 */
export function computeResults(
  ballots: Record<string, string[]>,
  votingOpen: boolean,
): Results {
  const tally: Record<string, number> = {};
  for (const p of PROJECTS) tally[p.id] = 0;

  const votedVoterIds: string[] = [];
  for (const [voterId, ids] of Object.entries(ballots)) {
    if (!isValidVoter(voterId) || ids.length === 0) continue;
    votedVoterIds.push(voterId);
    for (const id of ids) {
      if (id in tally) tally[id] += 1;
    }
  }

  const totalVoters = VOTERS.length;
  const votedCount = votedVoterIds.length;
  // Finished when everyone has voted, or the admin has closed voting.
  const complete = !votingOpen || votedCount >= totalVoters;

  let winnerIds: string[] = [];
  if (complete) {
    const max = Math.max(0, ...Object.values(tally));
    if (max > 0) {
      winnerIds = Object.entries(tally)
        .filter(([, count]) => count === max)
        .map(([id]) => id);
    }
  }

  return {
    tally,
    votedVoterIds,
    votedCount,
    totalVoters,
    complete,
    winnerIds,
  };
}

/** Admin-only: wipe all ballots (keeps the open/closed flag). */
export async function resetVotes(): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.del(KEY.ballots);
}
