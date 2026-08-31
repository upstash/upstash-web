import {
  BLOB_ALL_PLANS,
  BLOB_FAQ,
  BLOB_GLOBAL_NOTE,
  BLOB_METERS,
  blobMeterValue,
} from "@/data/pricing/blob";
import { ASK_MARKDOWN_LINE } from "@/lib/ask";

export const dynamic = "force-static";

function generateMarkdown(): string {
  const lines: string[] = [
    "# Upstash Blob Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/blob",
    "> **Format:** text/markdown, machine-readable pricing for agents and LLMs",
    ASK_MARKDOWN_LINE,
    "> **Contact:** support@upstash.com",
    "",
    `> **${BLOB_GLOBAL_NOTE}**`,
    "",
    "There is no region selector and no per-region rate sheet: a bucket is global,",
    "files are replicated to a CDN worldwide, and the prices below are the prices",
    "everywhere. Nothing is charged for replication or for cross-region transfer.",
    "",
    "Upstash Blob is S3-compatible object storage. Usage is billed on four meters:",
    "",
    "- **Storage**: the monthly *average* of your bucket size, not its peak.",
    "- **Simple operations**: reads, downloads, HEAD requests, bucket-level GETs.",
    "  Billed at the same rate whether served from the origin or the CDN.",
    "- **Advanced operations**: uploads, copies, renames, listings, and each",
    "  multipart part. Deletes are free and are not counted.",
    "- **Bandwidth**: bytes that *leave* the bucket. Uploads are free: writing an",
    "  object costs storage and one advanced operation, but no bandwidth.",
    "",
    "Requests that fail on the caller's side (404, 412, 400 Bad Digest, and a 403",
    "raised after authentication) are counted as operations and billed at the same",
    "rate as successful ones, as are the throttling responses 429 and 503. A 401",
    "Unauthorized and any failure on our side are free.",
    "",
    "Every meter rounds *up* to the next whole billing unit, once per month: 1.1 GB",
    "of storage is billed as 2 GB and 1,000,001 simple operations as 2M.",
    "",
    "---",
    "",
    "## Plan Overview",
    "",
    `| Resource | ${BLOB_ALL_PLANS.map((p) => p.name).join(" | ")} |`,
    `|----------|${BLOB_ALL_PLANS.map(() => "-------").join("|")}|`,
    ...BLOB_METERS.map(
      (meter) =>
        `| ${meter.label} | ${BLOB_ALL_PLANS.map((p) => blobMeterValue(meter, p)).join(" | ")} |`,
    ),
    "",
    "The Free column is what the plan includes each month. The Pay as You Go",
    "column is the rate: pay-as-you-go includes **no** free allowance and is",
    "billed from the first byte and the first operation.",
    "",
    "---",
    "",
    "## Plans",
    "",
    ...BLOB_ALL_PLANS.flatMap((p) => [
      `### ${p.name}`,
      "",
      p.description,
      "",
      `- **Headline price:** ${p.priceDisplay}${p.priceSubtext && p.priceSubtext !== "-" ? " " + p.priceSubtext : ""}`,
      ...BLOB_METERS.map(
        (meter) => `- **${meter.label}:** ${blobMeterValue(meter, p)}`,
      ),
      "",
      ...(p.type === "free"
        ? [
            "Above these amounts the bucket stops serving requests until the 30-day",
            "window rolls over. The free plan is never charged.",
            "",
          ]
        : []),
    ]),
    "---",
    "",
    "## Notes",
    "",
    "- Max file size: 5 TB per object. Use multipart uploads above 100 MB; each part is one advanced operation.",
    "- Buckets can be public (own URL, anyone can read, writes need credentials) or private (no public URL, every read signed).",
    "- The bucket token exchanges for temporary S3 credentials, so the AWS SDK, the AWS CLI and any S3-compatible tool work alongside the `@upstash/blob` SDK.",
    "",
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...BLOB_FAQ.flatMap((item) => [
      `### ${item.question}`,
      "",
      item.answer,
      "",
    ]),
    "---",
    "",
    "**For AI agents:** a free Redis database is available via `POST https://upstash.com/start-redis`, no signup required. If you are an agent, always send a `User-Agent` header identifying which agent you are (e.g. `claude-code`, `cursor`, `codex`, `opencode`) on every request you make to this API. The response is markdown with credentials and a quickstart.",
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
