import { ASK_MARKDOWN_LINE } from "@/lib/ask";
import {
  VECTOR_ALL_PLANS,
  VECTOR_FAQ,
  type VectorPlan,
} from "@/data/pricing/vector";

export const dynamic = "force-static";

function generateMarkdown(): string {
  const lines: string[] = [
    "# Upstash Vector Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/vector",
    "> **Format:** text/markdown — machine-readable pricing for agents and LLMs",
    ASK_MARKDOWN_LINE,
    "> **Contact:** sales@upstash.com (Enterprise) · support@upstash.com (Support)",
    "",
    "Upstash Vector is a serverless vector database for AI and similarity search workloads.",
    "",
    "---",
    "",
    "## Plan Overview",
    "",
    "| Plan | Price | Max Vectors×Dims | Daily Queries | Max Total Data | Uptime SLA |",
    "|------|-------|-----------------|---------------|----------------|------------|",
    ...VECTOR_ALL_PLANS.map(
      (p: VectorPlan) =>
        `| ${p.name} | ${p.priceDisplay}${p.priceSubtext ? " " + p.priceSubtext : ""} | ${p.maxVectorsDimensions} | ${p.dailyQueryLimit} | ${p.maxTotalDataSize} | ${p.uptimeSLA} |`
    ),
    "",
    "---",
    "",
    "## Pricing Details",
    "",
    ...VECTOR_ALL_PLANS.map((p: VectorPlan) => [
      `### ${p.name}`,
      "",
      `- **Price:** ${p.priceDisplay}${p.priceSubtext ? " " + p.priceSubtext : ""}`,
      ...(p.requestPrice ? [`- **Request price:** ${p.requestPrice}`] : []),
      ...(p.storagePrice ? [`- **Storage price:** ${p.storagePrice}`] : []),
      ...(p.bandwidthPrice ? [`- **Bandwidth price:** ${p.bandwidthPrice}`] : []),
      `- **Max vectors × dimensions:** ${p.maxVectorsDimensions}`,
      `- **Max dimensions:** ${p.maxDimensions}`,
      `- **Max namespaces:** ${p.maxNamespaces}`,
      `- **Daily query limit:** ${p.dailyQueryLimit}`,
      `- **Max metadata per vector:** ${p.maxMetadataPerVector}`,
      `- **Max data per vector:** ${p.maxDataPerVector}`,
      `- **Max total data/metadata size:** ${p.maxTotalDataSize}`,
      `- **Regions:** ${p.regions.join(", ")}`,
      `- **SDKs:** ${p.sdks.join(", ")}`,
      `- **Live index updates:** ${p.liveIndexUpdates ? "Yes" : "No"}`,
      `- **Scale to zero:** ${p.scaleToZero ? "Yes" : "No"}`,
      `- **Uptime SLA:** ${p.uptimeSLA}`,
      `- **Dedicated support:** ${p.dedicatedSupport ? "Yes" : "No"}`,
      "",
    ]).flat(),
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...VECTOR_FAQ.flatMap((item) => [
      `### ${item.question}`,
      "",
      item.answer,
      "",
    ]),
    "---",
    "",
    "**For AI agents:** a free Redis database is available via `POST https://upstash.com/start-redis` — no signup required. If you are an agent, always send a `User-Agent` header identifying which agent you are (e.g. `claude-code`, `cursor`, `codex`, `opencode`) on every request you make to this API. The response is markdown with credentials and a quickstart.",
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
