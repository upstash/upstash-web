import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { Redis } from "@upstash/redis";

import {
  MAX_POINTS,
  PROJECTS,
  VOTERS,
  isValidProject,
  isValidVoter,
  ownProjectId,
} from "./data";

/** A ballot: projectId -> points allocated (each >= 1, total <= MAX_POINTS). */
export type Ballot = Record<string, number>;

/**
 * Redis-backed storage for hackathon voting. Uses the existing
 * UPSTASH_REDIS_REST_* env vars.
 *
 * Data model (all under the `hackathon:*` namespace):
 *   - `hackathon:open`     string  "1" when voting is open, else "0"/absent
 *   - `hackathon:ballots`  hash    voterId -> JSON object { projectId: points }
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

/** Raw ballots: voterId -> { projectId: points }. */
export async function getBallots(): Promise<Record<string, Ballot>> {
  if (!redis) return {};
  const raw = (await redis.hgetall<Record<string, unknown>>(KEY.ballots)) ?? {};
  const out: Record<string, Ballot> = {};
  for (const [voterId, value] of Object.entries(raw)) {
    out[voterId] = normalizeBallotValue(value);
  }
  return out;
}

export async function getBallot(voterId: string): Promise<Ballot> {
  if (!redis) return {};
  const value = await redis.hget<unknown>(KEY.ballots, voterId);
  return normalizeBallotValue(value);
}

/**
 * The Upstash Redis client auto-deserializes JSON, so a stored ballot may come
 * back as a real object (or, in edge cases, a JSON string). Handle both, keep
 * only valid projects with positive integer points, and also accept the legacy
 * `string[]` shape (each id counted as 1 point) so old data doesn't blow up.
 */
function normalizeBallotValue(value: unknown): Ballot {
  let parsed: unknown = value;
  if (typeof value === "string") {
    try {
      parsed = JSON.parse(value);
    } catch {
      parsed = {};
    }
  }
  const out: Ballot = {};
  if (Array.isArray(parsed)) {
    for (const id of parsed) {
      if (typeof id === "string" && isValidProject(id)) out[id] = 1;
    }
    return out;
  }
  if (parsed && typeof parsed === "object") {
    for (const [id, pts] of Object.entries(parsed as Record<string, unknown>)) {
      const n = typeof pts === "number" ? pts : Number(pts);
      if (isValidProject(id) && Number.isInteger(n) && n > 0) out[id] = n;
    }
  }
  return out;
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
  ballot?: Ballot;
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
      return { ok: true, created: true, ballot: {} };
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
  ballot?: Ballot;
}

/**
 * Cast or replace a voter's ballot. Enforces every rule server-side so the API
 * is the single source of truth:
 *   - voting must be open (closing locks everyone's decision)
 *   - voter must be on the eligible list
 *   - each allocation is a positive integer for a real project
 *   - total points across projects is at most MAX_POINTS
 *   - cannot allocate points to your own project
 */
export async function castVote(
  voterId: string,
  points: Ballot,
): Promise<VoteResult> {
  if (!redis) return { ok: false, error: "Voting storage is not configured." };

  if (!isValidVoter(voterId)) {
    return { ok: false, error: "Unknown voter." };
  }
  if (!(await isVotingOpen())) {
    return { ok: false, error: "Voting is not open." };
  }

  const own = ownProjectId(voterId);
  const clean: Ballot = {};
  let total = 0;

  for (const [id, rawPts] of Object.entries(points)) {
    if (!isValidProject(id)) {
      return { ok: false, error: `Unknown project: ${id}` };
    }
    if (!Number.isInteger(rawPts) || rawPts < 0) {
      return { ok: false, error: "Points must be whole numbers." };
    }
    if (rawPts === 0) continue; // dropping a project
    if (id === own) {
      return { ok: false, error: "You can't vote for your own project." };
    }
    clean[id] = rawPts;
    total += rawPts;
  }

  if (total > MAX_POINTS) {
    return { ok: false, error: `You can spend at most ${MAX_POINTS} points.` };
  }

  await redis.hset(KEY.ballots, { [voterId]: JSON.stringify(clean) });
  return { ok: true, ballot: clean };
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
  ballots: Record<string, Ballot>,
  votingOpen: boolean,
): Results {
  const tally: Record<string, number> = {};
  for (const p of PROJECTS) tally[p.id] = 0;

  const votedVoterIds: string[] = [];
  for (const [voterId, ballot] of Object.entries(ballots)) {
    const entries = Object.entries(ballot);
    if (!isValidVoter(voterId) || entries.length === 0) continue;
    votedVoterIds.push(voterId);
    for (const [id, pts] of entries) {
      if (id in tally) tally[id] += pts;
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
