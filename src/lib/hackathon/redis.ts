import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
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
 *   - `hackathon:pw`       hash    voterId -> "saltHex:sha256Hex" (per-voter password)
 *
 * Tally is computed on read from the ballots hash. With ~19 voters this is a
 * single HGETALL, so there's no need for a separately maintained counter that
 * we'd have to keep in sync when someone changes their vote.
 */

const KEY = {
  open: "hackathon:open",
  ballots: "hackathon:ballots",
  passwords: "hackathon:pw",
} as const;

/** Minimum length for a voter's self-chosen password. */
export const MIN_PASSWORD_LENGTH = 4;

const isRedisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

const redis = isRedisConfigured ? Redis.fromEnv() : null;

export function isConfigured(): boolean {
  return isRedisConfigured;
}

export async function isVotingOpen(): Promise<boolean> {
  if (!redis) return false;
  // The Upstash client auto-deserializes, so a stored "1" comes back as the
  // NUMBER 1 (JSON.parse("1") === 1). Compare type-robustly, never `=== "1"`.
  const v = await redis.get(KEY.open);
  return v === 1 || v === "1" || v === true;
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

/* ------------------------------------------------------------------ *
 * Per-voter passwords
 *
 * The first time a person picks their name they set a password; after that
 * they log in with it. Only a salted SHA-256 hash is ever stored, as
 * "saltHex:hashHex". Passwords gate voting so nobody can cast a ballot as
 * someone else.
 * ------------------------------------------------------------------ */

function hashPassword(password: string, saltHex: string): string {
  return createHash("sha256").update(`${saltHex}:${password}`).digest("hex");
}

function verifyStored(stored: unknown, password: string): boolean {
  if (typeof stored !== "string" || !stored.includes(":")) return false;
  const [saltHex, hashHex] = stored.split(":");
  const expected = Buffer.from(hashHex, "hex");
  const candidate = Buffer.from(hashPassword(password, saltHex), "hex");
  return (
    expected.length === candidate.length && timingSafeEqual(candidate, expected)
  );
}

/** Voter ids that have already set a password. */
export async function getRegisteredIds(): Promise<string[]> {
  if (!redis) return [];
  const raw = (await redis.hgetall<Record<string, unknown>>(KEY.passwords)) ?? {};
  return Object.keys(raw).filter(isValidVoter);
}

export interface AuthResult {
  ok: boolean;
  /** True when this call just created the account (first-time password set). */
  created?: boolean;
  error?: string;
  ballot?: string[];
}

/**
 * Log in — or, on the very first time for a voter, register by setting the
 * password. Returns the voter's current ballot on success so the UI can
 * pre-select their picks.
 */
export async function authenticate(
  voterId: string,
  password: string,
): Promise<AuthResult> {
  if (!redis) return { ok: false, error: "Voting storage is not configured." };
  if (!isValidVoter(voterId)) return { ok: false, error: "Unknown voter." };

  const stored = await redis.hget<unknown>(KEY.passwords, voterId);

  if (stored == null) {
    // First time: this becomes their password.
    if (password.length < MIN_PASSWORD_LENGTH) {
      return {
        ok: false,
        error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
      };
    }
    const saltHex = randomBytes(16).toString("hex");
    const value = `${saltHex}:${hashPassword(password, saltHex)}`;
    // HSETNX guards against two "first" registrations racing.
    const created = await redis.hsetnx(KEY.passwords, voterId, value);
    if (created === 1) {
      return { ok: true, created: true, ballot: [] };
    }
    // Lost the race — fall through to verifying against what got stored.
    const now = await redis.hget<unknown>(KEY.passwords, voterId);
    if (verifyStored(now, password)) {
      return { ok: true, ballot: await getBallot(voterId) };
    }
    return { ok: false, error: "Wrong password." };
  }

  if (!verifyStored(stored, password)) {
    return { ok: false, error: "Wrong password." };
  }
  return { ok: true, ballot: await getBallot(voterId) };
}

/** Strict check: true only when the voter is registered and the password matches. */
export async function verifyPassword(
  voterId: string,
  password: string,
): Promise<boolean> {
  if (!redis) return false;
  const stored = await redis.hget<unknown>(KEY.passwords, voterId);
  return verifyStored(stored, password);
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

/**
 * Admin-only: wipe all ballots AND all voter passwords (keeps the open/closed
 * flag). After a reset everyone re-registers a password the next time they pick
 * their name.
 */
export async function resetVotes(): Promise<void> {
  if (!redis) throw new Error("Redis not configured");
  await redis.del(KEY.ballots, KEY.passwords);
}
