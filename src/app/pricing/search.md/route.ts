import {
  SEARCH_ALL_PLANS,
  SEARCH_FAQ,
  SEARCH_NOTE,
  type SearchPlan,
} from "@/data/pricing/search";

export const dynamic = "force-static";

function generateMarkdown(): string {
  const lines: string[] = [
    "# Upstash Search Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/search",
    "> **Format:** text/markdown — machine-readable pricing for agents and LLMs",
    "> **Contact:** support@upstash.com",
    "",
    `> **Note:** ${SEARCH_NOTE}`,
    "",
    "Upstash Search is a serverless full-text search service.",
    "Search and upsert requests are counted as billing requests. Reranking has separate billing.",
    "Bandwidth is included in the query-based price.",
    "",
    "---",
    "",
    "## Plan Overview",
    "",
    "| Plan | Price | Monthly Queries | Max Records |",
    "|------|-------|----------------|-------------|",
    ...SEARCH_ALL_PLANS.map(
      (p: SearchPlan) =>
        `| ${p.name} | ${p.priceDisplay}${p.priceSubtext ? " " + p.priceSubtext : ""} | ${p.monthlyQueryLimit} | ${p.maxRecords} |`
    ),
    "",
    "---",
    "",
    "## Pricing Details",
    "",
    ...SEARCH_ALL_PLANS.map((p: SearchPlan) => [
      `### ${p.name}`,
      "",
      `- **Price:** ${p.priceDisplay}${p.priceSubtext ? " " + p.priceSubtext : ""}`,
      ...(p.requestPrice ? [`- **Request price:** ${p.requestPrice}`] : []),
      `- **Monthly query limit:** ${p.monthlyQueryLimit}`,
      `- **Max records:** ${p.maxRecords}`,
      "",
    ]).flat(),
    "---",
    "",
    "## Notes",
    "",
    "- Max query limit (topk): 1,000 (default)",
    "- Max databases: 10 free, then $1 per database up to 100",
    "- Max indexes per database: 10,000",
    "- Bandwidth is included in the per-request price",
    "",
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...SEARCH_FAQ.flatMap((item) => [
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
