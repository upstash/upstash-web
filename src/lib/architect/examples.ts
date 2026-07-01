/**
 * Canonical list of Upstash Architect example workloads — real use cases from the blog.
 * Shared by the web UI (as clickable templates) and the API (returned on an empty request,
 * so agents can discover what kinds of prompts work). One source of truth.
 */

export type ExampleProduct =
  | "Redis"
  | "Vector"
  | "QStash"
  | "Search"
  | "Workflow";

export interface ArchitectExample {
  text: string;
  product: ExampleProduct;
  blog: string; // blog slug under https://upstash.com/blog/
}

export const BLOG_BASE = "https://upstash.com/blog/";

export const EXAMPLES: ArchitectExample[] = [
  { text: "AI chatbot for a Next.js app, ~30k messages/day, chat history stored in Redis.", product: "Redis", blog: "ai-chatbot-nextjs" },
  { text: "RAG assistant over 100k support docs with semantic search and a daily re-index cron.", product: "Search", blog: "add-ai-assistant-to-docs" },
  { text: "Agent memory store in Redis for a coding agent, ~200k reads/day, low latency.", product: "Redis", blog: "agent-memory-with-redis" },
  { text: "Edge rate limiting for a public API on Cloudflare Workers, 2M requests/day, sliding window.", product: "Redis", blog: "cloudflare-workers-rate-limiting" },
  { text: "Semantic cache for LLM responses to cut costs, ~100k queries/day.", product: "Vector", blog: "caching-ai-sdk-v6-tool-results-with-redis" },
  { text: "Cache Prisma query results in Redis for a SaaS app, ~1M requests/day.", product: "Redis", blog: "caching-prisma-redis" },
  { text: "Session store for Auth.js in a Next.js app, 200k sessions, EU + US regions.", product: "Redis", blog: "better-auth-with-redis" },
  { text: "Virtual waiting room for a ticket drop, spikes to 100k concurrent users.", product: "Redis", blog: "cloudflare-workers-waiting-room" },
  { text: "Realtime game leaderboard in Redis, ~20k score updates per minute.", product: "Redis", blog: "building-analytics-with-redis" },
  { text: "Blog with page-view counters and comments in Redis, ~1M views/month.", product: "Redis", blog: "blog-comments-nextjs13" },
  { text: "Vector search over 2M image embeddings at 1536 dims for similarity search.", product: "Vector", blog: "image-similarity-search" },
  { text: "Schedule and deliver reminder emails with QStash, ~10k messages/day.", product: "QStash", blog: "email-scheduler-qstash" },
  { text: "Background job to summarize new articles via QStash, ~2k jobs/day.", product: "QStash", blog: "article-summarizer-qstash-python" },
  { text: "Rate limit outbound emails per user, ~500k messages/month.", product: "Redis", blog: "email-ratelimiting" },
  { text: "Article recommendation engine using vector similarity over 500k articles.", product: "Vector", blog: "article-recommendation-system" },
  { text: "Feature flags served from Redis at the edge, ~5M reads/day.", product: "Redis", blog: "feature-flags-with-vercel-and-upstash" },
  { text: "Distributed lock for a serverless job runner, ~50k lock ops/day.", product: "Redis", blog: "distributed-lock" },
  { text: "Index and vector-search 6M Wikipedia articles with unlimited queries.", product: "Vector", blog: "indexing-wikipedia" },
  { text: "Full-text + semantic product search over 1M docs, ~40k queries/day.", product: "Search", blog: "first-look-at-upstash-redis-search" },
  { text: "Durable incident-response workflow with retries, ~5k runs/day.", product: "Workflow", blog: "how-does-workflow-orchestration-work" },
  { text: "Trending Hacker News search over 1M posts, refreshed by an hourly cron.", product: "Search", blog: "hacker-news-trends-redis-search" },
  { text: "AI companion app storing conversation memory for 50k daily active users.", product: "Redis", blog: "ai-companion-app" },
  { text: "API key storage and authentication for a public API, ~300k requests/day.", product: "Redis", blog: "api-key-generator-upstash-redis" },
  { text: "Run AI data-analysis tasks in isolated sandboxes, ~1k jobs/day.", product: "QStash", blog: "box-ai-data-analyst" },
];
