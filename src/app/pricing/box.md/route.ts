import {
  BOX_ALL_PLANS,
  BOX_FAQ,
  BOX_SIZES,
  type BoxPlan,
} from "@/data/pricing/box";

export const dynamic = "force-static";

function generateMarkdown(): string {
  const lines: string[] = [
    "# Upstash Box Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/box",
    "> **Format:** text/markdown — machine-readable pricing for agents and LLMs",
    "> **Contact:** sales@upstash.com (Enterprise) · support@upstash.com (Support)",
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
        `| ${p.name} | ${p.priceDisplay} | ${p.maxConcurrentBoxes} | ${p.cpuHoursPerMonth} | ${p.llmBudgetPerMonth} |`
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
        `| ${s.label} | ${s.cpu} | ${s.memory} | ${s.storage} | $${s.cpuHourPrice}/active CPU hour | $${s.keepAlivePrice}/month |`
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
    "- **Keep-alive boxes:** fixed monthly price by size, stay on continuously",
    "",
    "---",
    "",
    "## Enterprise",
    "",
    "For teams that need custom limits, regional requirements, or dedicated support.",
    "",
    "**Contact:** sales@upstash.com | https://upstash.com/enterprise",
    "",
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...BOX_FAQ.flatMap((item) => [
      `### ${item.question}`,
      "",
      item.answer,
      "",
    ]),
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
