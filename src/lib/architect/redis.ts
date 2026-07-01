import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { ChatResponse } from "./types";

/**
 * Redis-backed helpers for the Architect: rate limiting, response cache, session
 * history, and an audit stream. Uses the existing UPSTASH_REDIS_REST_* env vars.
 *
 * Everything degrades gracefully when Redis is not configured (local dev / preview):
 * the route still works, just without limiting/caching/history.
 */

const KEY = {
  cache: (k: string) => `architect:cache:${k}`,
  audit: "architect:audit",
} as const;

const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24h

export const isRedisConfigured = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

export const redis = isRedisConfigured ? Redis.fromEnv() : null;

/** Sliding-window limiter: 10 requests / minute per identifier (IP or API key). */
export const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, "1 m"),
      prefix: "architect:rl",
      analytics: true,
    })
  : null;

/** Returns `{ success }`. Allows the request when Redis/ratelimit is unconfigured. */
export async function checkRateLimit(identifier: string): Promise<{ success: boolean }> {
  if (!ratelimit) { return { success: true }; }
  const { success } = await ratelimit.limit(identifier);
  return { success };
}

/** Stable cache key: lowercase, trim, collapse whitespace. */
export function cacheKey(message: string): string {
  return message.toLowerCase().trim().replace(/\s+/g, " ");
}

export async function cacheGet(message: string): Promise<ChatResponse | null> {
  if (!redis) { return null; }
  const hit = await redis.get<ChatResponse>(KEY.cache(cacheKey(message)));
  return hit ? { ...hit, cached: true } : null;
}

export async function cacheSet(message: string, value: ChatResponse): Promise<void> {
  if (!redis) { return; }
  await redis.set(KEY.cache(cacheKey(message)), value, { ex: CACHE_TTL_SECONDS });
}

/** Append prompt/spec/outcome to a Redis stream for detection & audit (doc §6.8). */
export async function auditAppend(entry: Record<string, unknown>): Promise<void> {
  if (!redis) { return; }
  try {
    await redis.xadd(KEY.audit, "*", { data: JSON.stringify(entry) });
  } catch {
    // Never let audit logging break a request.
  }
}
