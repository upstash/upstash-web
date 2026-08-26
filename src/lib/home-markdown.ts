import { ASK_MARKDOWN_LINE } from "@/lib/ask";
import { SITE_URL } from "@/utils/const";

/**
 * Markdown representation of the homepage, served when a client asks for
 * `text/markdown` on `/` (or fetches `/index.md`).
 */
export function renderHome(): string {
  return [
    "# Upstash — Serverless Data Platform",
    "",
    `> **Source:** ${SITE_URL}/`,
    "> **Format:** text/markdown — machine-readable homepage for agents and LLMs",
    ASK_MARKDOWN_LINE,
    "",
    "Upstash is a serverless data platform: fully managed Redis, Vector, Search, QStash (messaging), Workflow and Box (sandboxed compute), all with per-request pricing, a free tier and no servers to provision. Every product is reachable over HTTP from serverless and edge runtimes (Vercel, Cloudflare Workers, AWS Lambda, Deno, Bun) as well as from traditional servers.",
    "",
    `Want to try it right now? \`POST ${SITE_URL}/start-redis\` creates a free Redis database with no signup and returns the credentials as markdown (see "For AI agents" below).`,
    "",
    "## Products",
    "",
    `- **Redis** — Serverless Redis-compatible database for caching, sessions, rate limiting, leaderboards, pub/sub and queues. REST and TCP access. Docs: ${SITE_URL}/docs/redis/overall/getstarted · Pricing: ${SITE_URL}/pricing/redis`,
    `- **Vector** — Vector database for embeddings, similarity search and RAG, with optional built-in embedding models. Docs: ${SITE_URL}/docs/vector/overall/getstarted · Pricing: ${SITE_URL}/pricing/vector`,
    `- **Search** — Full-text and hybrid search over your documents. Pricing: ${SITE_URL}/pricing/search`,
    `- **QStash** — HTTP message queue and scheduler: deliver to webhooks with retries, delays, cron schedules and fan-out. Docs: ${SITE_URL}/docs/qstash/overall/getstarted · Pricing: ${SITE_URL}/pricing/qstash`,
    `- **Workflow** — Durable, multi-step serverless functions with retries, waits and parallel steps. Docs: ${SITE_URL}/docs/workflow/getstarted · Pricing: ${SITE_URL}/pricing/workflow`,
    `- **Box** — Sandboxed cloud containers for running AI agents and untrusted code. Docs: ${SITE_URL}/docs/box/overall/quickstart · Pricing: ${SITE_URL}/pricing/box`,
    "",
    "## Pricing",
    "",
    "Every product has a free tier. Beyond that, pay-as-you-go pricing is billed per request/command/message, and fixed monthly plans are available for predictable costs. Each pricing page is also available as markdown by appending `.md` (for example `/pricing/redis.md`).",
    "",
    "## For AI agents",
    "",
    `- Ask a question about Upstash (JSON): ${SITE_URL}/ask?q=your+question`,
    `- Create a free, temporary Redis database without signup: \`POST ${SITE_URL}/start-redis\` (send \`Idempotency-Key: <uuidv4>\` and a \`User-Agent\` naming your agent). \`GET\` the same URL for instructions.`,
    `- OpenAPI spec for the Upstash Developer API (authenticated; manage databases, teams and billing): ${SITE_URL}/docs/devops/developer-api/openapi.yaml`,
    `- LLM-friendly site index: ${SITE_URL}/llms.txt (full version: ${SITE_URL}/llms-full.txt)`,
    `- MCP server for managing Upstash resources: \`npx @upstash/mcp-server\` — https://github.com/upstash/mcp-server`,
    `- Account and database management API: ${SITE_URL}/docs/devops/developer-api`,
    "",
    "## Links",
    "",
    `- Documentation: ${SITE_URL}/docs`,
    `- Blog: ${SITE_URL}/blog (markdown: ${SITE_URL}/blog.md)`,
    `- Enterprise: ${SITE_URL}/enterprise`,
    `- About: ${SITE_URL}/about`,
    `- Contact: ${SITE_URL}/contact · support@upstash.com`,
    `- Console: https://console.upstash.com`,
    `- Status: https://status.upstash.com`,
    "",
  ].join("\n");
}
