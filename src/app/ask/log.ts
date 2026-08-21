import { Redis } from "@upstash/redis";
import { waitUntil } from "@vercel/functions";

// Counts every question /ask receives in one sorted set, member = normalized
// question, score = times asked. Write-only from the app: read it in the
// Upstash console.
const KEY = "ask:questions";
const MEMBER_LIMIT = 200;

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

export function normalizeQuestion(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, " ").slice(0, MEMBER_LIMIT);
}

/** Fire-and-forget: never delays or fails the request it logs. */
export function logQuestion(q: string) {
  if (!redis) return;
  waitUntil(
    redis.zincrby(KEY, 1, normalizeQuestion(q)).catch((error) => {
      console.error("Failed to log /ask question:", error);
    }),
  );
}
