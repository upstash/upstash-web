/**
 * Cheap, deterministic input gate — the SHARED first filter for every caller (web UI and
 * anonymous agents alike). It runs before Box, so junk/off-topic/too-vague input fails fast
 * without spending an LLM run. The authoritative rejection message lives here so both front
 * doors return the exact same guidance.
 *
 * This is intentionally a heuristic, not a classifier: it catches the common bad cases (empty,
 * greetings, off-topic prose, "build me an app") cheaply. Anything that slips through is still
 * caught downstream by WorkloadSpec validation.
 */

export const MIN_CHARS = 10;
export const MIN_WORDS = 3;
export const MAX_CHARS = 2000;

/** Concrete data-infra / workload signals — a strong sign this is an Upstash workload. */
const STRONG = [
  "redis",
  "vector",
  "vectors",
  "qstash",
  "upstash",
  "search",
  "cache",
  "caching",
  "queue",
  "queuing",
  "queues",
  "message",
  "messages",
  "messaging",
  "pubsub",
  "ratelimit",
  "database",
  "db",
  "kv",
  "session",
  "sessions",
  "cron",
  "schedule",
  "scheduled",
  "job",
  "jobs",
  "embedding",
  "embeddings",
  "semantic",
  "rag",
  "leaderboard",
  "counter",
  "throttle",
  "throttling",
  "workflow",
  "index",
  "similarity",
  "fulltext",
  "store",
  "storage",
  "document",
  "documents",
  "docs",
  "chatbot",
];

/** Multi-word strong phrases (checked as substrings). */
const STRONG_PHRASES = [
  "rate limit",
  "rate-limit",
  "key value",
  "key-value",
  "pub/sub",
  "pub sub",
  "full text",
  "full-text",
  "message queue",
  "requests per",
  "req/day",
  "requests/day",
];

/** Generic "I'm building something" words — present but not enough on their own. */
const WEAK = [
  "app",
  "application",
  "build",
  "building",
  "project",
  "backend",
  "frontend",
  "service",
  "api",
  "website",
  "web",
  "platform",
  "saas",
  "product",
  "system",
  "data",
  "users",
  "traffic",
  "scale",
  "serverless",
];

export type GuardResult =
  | { ok: true }
  | { ok: false; code: "too_long" | "too_short" | "too_vague" | "off_topic"; message: string };

const NEED_DETAIL =
  "Add a bit more detail — what you're building, expected traffic/volume or data size, and which capabilities you need (cache, queue, vector search, rate limiting, etc.).";

const OFF_TOPIC =
  "This doesn't look like an Upstash workload. Describe a backend/data project — e.g. traffic, data size, and features like caching, queues, vector search, or rate limiting.";

/** Screen a free-text description before any expensive processing. */
export function screenInput(raw: string): GuardResult {
  const message = raw.trim();

  if (message.length > MAX_CHARS) {
    return {
      ok: false,
      code: "too_long",
      message: `Please keep the description under ${MAX_CHARS} characters.`,
    };
  }

  const words = message.split(/\s+/).filter(Boolean);
  if (message.length < MIN_CHARS || words.length < MIN_WORDS) {
    return { ok: false, code: "too_short", message: NEED_DETAIL };
  }

  const lower = message.toLowerCase();
  const tokens = new Set(lower.split(/[^a-z0-9]+/).filter(Boolean));

  const hasNumber = /\d/.test(lower);
  const strongHit =
    STRONG.some((k) => tokens.has(k)) ||
    STRONG_PHRASES.some((p) => lower.includes(p));
  const weakHit = WEAK.some((k) => tokens.has(k));

  // A number OR a concrete infra term is enough to proceed.
  if (hasNumber || strongHit) { return { ok: true }; }

  // Some generic build words but nothing concrete → ask for specifics.
  if (weakHit) { return { ok: false, code: "too_vague", message: NEED_DETAIL }; }

  // No signal at all → almost certainly off-topic.
  return { ok: false, code: "off_topic", message: OFF_TOPIC };
}
