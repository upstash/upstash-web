import { Redis } from "@upstash/redis";
import { waitUntil } from "@vercel/functions";

const KEY = "ask:questions";

const url = process.env.UPSTASH_REDIS_SEARCH_DATA_URL;
const token = process.env.UPSTASH_REDIS_SEARCH_DATA_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export function normalizeQuestion(q: string): string {
  return q.trim().toLowerCase().replace(/\s+/g, " ");
}

export function logQuestion(q: string) {
  if (!redis) return;
  waitUntil(
    redis.zincrby(KEY, 1, normalizeQuestion(q)).catch((error) => {
      console.error("Failed to log ask question:", error);
    }),
  );
}
