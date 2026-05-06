import {
  WORKFLOW_ALL_PLANS,
  WORKFLOW_ENTERPRISE_PLAN,
  WORKFLOW_FAQ,
  WORKFLOW_FIXED_PLANS,
  WORKFLOW_PAYG_PLAN,
  type WorkflowPlan,
} from "@/data/pricing/workflow";

export const dynamic = "force-static";

function feat(value: boolean | "with-prod-pack"): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "Yes (Prod Pack add-on required)";
}

function generateMarkdown(): string {
  const lines: string[] = [
    "# Upstash Workflow Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/workflow",
    "> **Format:** text/markdown — machine-readable pricing for agents and LLMs",
    "> **Contact:** sales@upstash.com (Enterprise) · support@upstash.com (Support)",
    "",
    "Upstash Workflow enables durable, serverless workflow execution built on top of QStash.",
    "A **step** is a single call from the QStash server to the Workflow URL or an external URL.",
    "Retries count as extra steps. Parallel steps count as two steps.",
    "",
    "---",
    "",
    "## Plan Overview",
    "",
    "| Plan | Price | Steps/Day | Max Message Size | Max Parallelism |",
    "|------|-------|-----------|-----------------|-----------------|",
    ...WORKFLOW_ALL_PLANS.map(
      (p: WorkflowPlan) => {
        const price =
          p.type === "payg"
            ? "$1 per 100K steps"
            : p.monthlyPrice !== null
              ? `$${p.monthlyPrice}/month`
              : "Custom";
        return `| ${p.name} | ${price} | ${p.maxStepsPerDay} | ${p.maxMessageSize} | ${p.maxParallelism} |`;
      }
    ),
    "",
    "---",
    "",
    "## Fixed Plans",
    "",
    "| Tier | Monthly | Steps/Day | Bandwidth | DLQ Retention | Max HTTP Duration |",
    "|------|---------|-----------|-----------|---------------|-----------------|",
    ...WORKFLOW_FIXED_PLANS.map(
      (p) =>
        `| ${p.name} | $${p.monthlyPrice}/month | ${p.maxStepsPerDay} | ${p.maxBandwidth} | ${p.maxDlqRetention} | ${p.maxHttpResponseDuration} |`
    ),
    "",
    "---",
    "",
    "## Pay as You Go — Pricing Details",
    "",
    `- **Step price:** ${WORKFLOW_PAYG_PLAN.stepPrice}`,
    `- **Steps per day:** ${WORKFLOW_PAYG_PLAN.maxStepsPerDay}`,
    `- **Bandwidth:** ${WORKFLOW_PAYG_PLAN.maxBandwidthNote ?? WORKFLOW_PAYG_PLAN.maxBandwidth}`,
    `- **Max message size:** ${WORKFLOW_PAYG_PLAN.maxMessageSize}`,
    `- **Max delay:** ${WORKFLOW_PAYG_PLAN.maxDelay}`,
    `- **Max HTTP response duration:** ${WORKFLOW_PAYG_PLAN.maxHttpResponseDuration}`,
    `- **DLQ retention:** ${WORKFLOW_PAYG_PLAN.maxDlqRetention}`,
    `- **Active schedules:** ${WORKFLOW_PAYG_PLAN.maxSchedules} (${WORKFLOW_PAYG_PLAN.maxSchedulesNote})`,
    `- **Parallelism:** ${WORKFLOW_PAYG_PLAN.maxParallelism}`,
    "",
    "---",
    "",
    "## Security & Observability",
    "",
    `| Feature | ${WORKFLOW_ALL_PLANS.map((p) => p.name).join(" | ")} |`,
    `|---------|${WORKFLOW_ALL_PLANS.map(() => "---").join("|")}|`,
    `| Uptime SLA | ${WORKFLOW_ALL_PLANS.map((p) => feat(p.uptimeSLA)).join(" | ")} |`,
    `| Encryption at rest | ${WORKFLOW_ALL_PLANS.map((p) => feat(p.encryptionAtRest)).join(" | ")} |`,
    `| SOC-2 compliance | ${WORKFLOW_ALL_PLANS.map((p) => feat(p.soc2)).join(" | ")} |`,
    `| Prometheus | ${WORKFLOW_ALL_PLANS.map((p) => feat(p.prometheus)).join(" | ")} |`,
    `| Datadog | ${WORKFLOW_ALL_PLANS.map((p) => feat(p.datadog)).join(" | ")} |`,
    `| Dedicated support | ${WORKFLOW_ALL_PLANS.map((p) => (p.dedicatedSupport ? "Yes" : "No")).join(" | ")} |`,
    "",
    "---",
    "",
    "## Enterprise",
    "",
    WORKFLOW_ENTERPRISE_PLAN.description,
    "",
    "**Contact:** sales@upstash.com | https://upstash.com/enterprise",
    "",
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...WORKFLOW_FAQ.flatMap((item) => [
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
