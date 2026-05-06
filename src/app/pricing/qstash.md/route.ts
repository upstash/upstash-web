import {
  QSTASH_ALL_PLANS,
  QSTASH_ENTERPRISE_PLAN,
  QSTASH_FAQ,
  QSTASH_FIXED_PLANS,
  QSTASH_FREE_PLAN,
  QSTASH_PAYG_PLAN,
  type QStashPlan,
} from "@/data/pricing/qstash";

export const dynamic = "force-static";

function feat(value: boolean | "with-prod-pack"): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Yes (Prod Pack add-on required)";
}

function planSummaryRow(p: QStashPlan): string {
  const price =
    p.type === "payg"
      ? "$1 per 100K messages"
      : p.monthlyPrice !== null
        ? `$${p.monthlyPrice}/month`
        : "Custom";
  return `| ${p.name} | ${price} | ${p.maxMessagesPerDay} | ${p.maxBandwidth} | ${p.maxMessageSize} |`;
}

function generateMarkdown(): string {
  const lines: string[] = [
    "# Upstash QStash Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/qstash",
    "> **Format:** text/markdown — machine-readable pricing for agents and LLMs",
    "> **Contact:** sales@upstash.com (Enterprise) · support@upstash.com (Support)",
    "",
    "QStash is a serverless message queue and scheduler. You are only charged for messages — retries are free.",
    "",
    "---",
    "",
    "## Plan Overview",
    "",
    "| Plan | Price | Max Messages/Day | Max Bandwidth | Max Message Size |",
    "|------|-------|-----------------|---------------|-----------------|",
    ...QSTASH_ALL_PLANS.map(planSummaryRow),
    "",
    "---",
    "",
    "## Fixed Plans — All Tiers",
    "",
    "| Tier | Monthly Price | Messages/Day | Bandwidth | Max Message Size | Max Delay | DLQ Retention | Parallelism |",
    "|------|--------------|-------------|-----------|-----------------|-----------|---------------|-------------|",
    ...QSTASH_FIXED_PLANS.map(
      (p) =>
        `| ${p.name} | $${p.monthlyPrice}/month | ${p.maxMessagesPerDay} | ${p.maxBandwidth} | ${p.maxMessageSize} | ${p.maxDelay} | ${p.maxDlqRetention} | ${p.maxParallelism} |`
    ),
    "",
    "---",
    "",
    "## Pay as You Go — Pricing Details",
    "",
    `- **Message price:** ${QSTASH_PAYG_PLAN.messagePrice}`,
    `- **Bandwidth:** ${QSTASH_PAYG_PLAN.bandwidthPrice}`,
    `- **Retries:** Free (only published messages count)`,
    `- **Max messages/day:** ${QSTASH_PAYG_PLAN.maxMessagesPerDay}`,
    `- **Max message size:** ${QSTASH_PAYG_PLAN.maxMessageSize}`,
    `- **Max delay:** ${QSTASH_PAYG_PLAN.maxDelay}`,
    `- **Max HTTP response duration:** ${QSTASH_PAYG_PLAN.maxHttpResponseDuration}`,
    `- **DLQ retention:** ${QSTASH_PAYG_PLAN.maxDlqRetention}`,
    `- **Active schedules:** ${QSTASH_PAYG_PLAN.maxSchedules} (${QSTASH_PAYG_PLAN.maxSchedulesNote})`,
    `- **URL groups:** ${QSTASH_PAYG_PLAN.maxUrlGroups}`,
    `- **Queue count:** ${QSTASH_PAYG_PLAN.maxQueueCount}`,
    `- **Parallelism:** ${QSTASH_PAYG_PLAN.maxParallelism}`,
    "",
    "---",
    "",
    "## Full Capacity Comparison",
    "",
    `| Feature | ${QSTASH_ALL_PLANS.map((p) => p.name).join(" | ")} |`,
    `|---------|${QSTASH_ALL_PLANS.map(() => "---").join("|")}|`,
    `| Messages/day | ${QSTASH_ALL_PLANS.map((p) => p.maxMessagesPerDay).join(" | ")} |`,
    `| Max bandwidth | ${QSTASH_ALL_PLANS.map((p) => p.maxBandwidth).join(" | ")} |`,
    `| Max message size | ${QSTASH_ALL_PLANS.map((p) => p.maxMessageSize).join(" | ")} |`,
    `| Max URL groups | ${QSTASH_ALL_PLANS.map((p) => p.maxUrlGroups).join(" | ")} |`,
    `| Max endpoints/group | ${QSTASH_ALL_PLANS.map((p) => p.maxEndpointsPerGroup).join(" | ")} |`,
    `| Max delay | ${QSTASH_ALL_PLANS.map((p) => p.maxDelay).join(" | ")} |`,
    `| HTTP response duration | ${QSTASH_ALL_PLANS.map((p) => p.maxHttpResponseDuration).join(" | ")} |`,
    `| DLQ retention | ${QSTASH_ALL_PLANS.map((p) => p.maxDlqRetention).join(" | ")} |`,
    `| Logs retention | ${QSTASH_ALL_PLANS.map((p) => p.maxLogsRetention).join(" | ")} |`,
    `| Active schedules | ${QSTASH_ALL_PLANS.map((p) => p.maxSchedules).join(" | ")} |`,
    `| Queue count | ${QSTASH_ALL_PLANS.map((p) => p.maxQueueCount).join(" | ")} |`,
    `| Queue parallelism | ${QSTASH_ALL_PLANS.map((p) => p.maxQueueParallelism).join(" | ")} |`,
    `| Max parallelism | ${QSTASH_ALL_PLANS.map((p) => p.maxParallelism).join(" | ")} |`,
    "",
    "**Security & Observability**",
    "",
    `| Feature | ${QSTASH_ALL_PLANS.map((p) => p.name).join(" | ")} |`,
    `|---------|${QSTASH_ALL_PLANS.map(() => "---").join("|")}|`,
    `| Uptime SLA | ${QSTASH_ALL_PLANS.map((p) => feat(p.uptimeSLA)).join(" | ")} |`,
    `| Encryption at rest | ${QSTASH_ALL_PLANS.map((p) => feat(p.encryptionAtRest)).join(" | ")} |`,
    `| SOC-2 compliance | ${QSTASH_ALL_PLANS.map((p) => feat(p.soc2)).join(" | ")} |`,
    `| SAML SSO | ${QSTASH_ALL_PLANS.map((p) => (p.sso ? "Yes" : "No")).join(" | ")} |`,
    `| Prometheus | ${QSTASH_ALL_PLANS.map((p) => feat(p.prometheus)).join(" | ")} |`,
    `| Datadog | ${QSTASH_ALL_PLANS.map((p) => feat(p.datadog)).join(" | ")} |`,
    `| Email support | ${QSTASH_ALL_PLANS.map((p) => (p.emailSupport ? "Yes" : "No")).join(" | ")} |`,
    `| Dedicated support | ${QSTASH_ALL_PLANS.map((p) => (p.dedicatedSupport ? "Yes" : "No")).join(" | ")} |`,
    "",
    "---",
    "",
    "## Enterprise",
    "",
    QSTASH_ENTERPRISE_PLAN.description,
    "",
    "**Contact:** sales@upstash.com | https://upstash.com/enterprise",
    "",
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...QSTASH_FAQ.flatMap((item) => [
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
