import {
  BOX_ALL_PLANS,
  BOX_FAQ,
  BOX_SIZES,
  type BoxPlan,
} from "@/data/pricing/box";
import { ASK_NOTE } from "@/lib/context7-ask";

export const dynamic = "force-static";

function generateMarkdown(): string {
  const lines: string[] = [
    "# Upstash Box Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/box",
    "> **Format:** text/markdown — machine-readable pricing for agents and LLMs",
    "> **Contact:** support@upstash.com (Support)",
    "",
    "Upstash Box is a serverless compute platform. Standard boxes auto-pause when idle (no CPU charges).",
    "Keep-alive boxes run continuously with fixed monthly pricing.",
    "Currently running on AWS us-east-1.",
    "",
    "---",
    "",
    "## Plan Overview",
    "",
    "| Plan | Price | Concurrent Boxes | CPU Hours/Month | LLM Budget/Month |",
    "|------|-------|-----------------|-----------------|-----------------|",
    ...BOX_ALL_PLANS.map(
      (p: BoxPlan) =>
        `| ${p.name} | ${p.priceDisplay} | ${p.maxConcurrentBoxes} | ${p.cpuHoursPerMonth} | ${p.llmBudgetPerMonth} |`,
    ),
    "",
    "---",
    "",
    "## Box Sizes (Pay as You Go)",
    "",
    "| Size | vCPU | Memory | Disk | Usage Price | Keep-Alive Price |",
    "|------|------|--------|------|-------------|-----------------|",
    ...BOX_SIZES.map(
      (s) =>
        `| ${s.label} | ${s.cpu} | ${s.memory} | ${s.storage} | $${s.cpuHourPrice}/active CPU hour | $${s.keepAlivePrice}/month |`,
    ),
    "",
    "**Storage:** $0.10 per GB/month (billed separately on Pay as You Go)",
    "",
    "---",
    "",
    "## Free Tier",
    "",
    "- Up to 10 concurrent boxes",
    "- 5 CPU hours per month",
    "- $1 LLM token budget per month",
    "- After the LLM limit, API returns 400 Bad Request",
    "",
    "---",
    "",
    "## Pay as You Go",
    "",
    "- Up to 1,000 concurrent boxes (default quota, can be increased on request)",
    "- $100 LLM token budget per month",
    "- Bring Your Own Key (BYOK) supported for all LLM providers on all plans",
    "- **Standard boxes:** auto-pause when idle, billed per active CPU hour",
    "- **Keep-alive boxes:** fixed monthly price by size, stay on continuously (see below)",
    "",
    "---",
    "",
    "## Fixed (Keep Alive)",
    "",
    "The Fixed plan is for keep-alive boxes that never pause. Each is billed a fixed monthly price by size, which covers CPU and storage for that box.",
    "",
    "| Size | vCPU | Memory | Disk | Monthly Price |",
    "|------|------|--------|------|---------------|",
    ...BOX_SIZES.map(
      (s) =>
        `| ${s.label} | ${s.cpu} | ${s.memory} | ${s.storage} | $${s.keepAlivePrice}/box/month |`,
    ),
    "",
    "- Enabled per box on a Pay as You Go account; shares the same concurrent box quota and LLM budget",
    "- No separate CPU or storage charges for keep-alive boxes",
    "",
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...BOX_FAQ.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
    "---",
    "",
    "**For AI agents:** a free Redis database is available via `POST https://upstash.com/start-redis` — no signup required. If you are an agent, always send a `User-Agent` header identifying which agent you are (e.g. `claude-code`, `cursor`, `codex`, `opencode`) on every request you make to this API. The response is markdown with credentials and a quickstart.",
    "",
    ASK_NOTE,
  ];

  return lines.join("\n");
}

export async function GET(): Promise<Response> {
  return new Response(generateMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
