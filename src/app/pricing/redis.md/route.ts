import {
  REDIS_ALL_PLANS,
  REDIS_ENTERPRISE_PLAN,
  REDIS_FAQ,
  REDIS_FIXED_PLANS,
  REDIS_FREE_PLAN,
  REDIS_PAYG_PLAN,
  REDIS_PROD_PACK,
  type FeatureAvailability,
  type RedisPlan,
} from "@/data/pricing/redis";

export const dynamic = "force-static";

function feat(value: FeatureAvailability): string {
  if (value === true) return "Yes";
  if (value === false) return "No";
  if (value === "with-prod-pack") return "Yes (Prod Pack add-on required)";
  if (value === "coming-soon") return "Coming soon";
  return String(value);
}

function planSummaryRow(plan: RedisPlan): string {
  const price =
    plan.type === "payg"
      ? "$0.20 per 100K commands"
      : plan.monthlyPrice !== null
        ? `$${plan.monthlyPrice}/month`
        : "Custom";
  const readRegion =
    plan.readRegionPrice !== null ? `+$${plan.readRegionPrice}/region` : "-";
  return `| ${plan.name} | ${price} | ${readRegion} | ${plan.dataSize} | ${plan.maxBandwidth} |`;
}

function featureRow(label: string, plans: RedisPlan[], key: keyof RedisPlan): string {
  const values = plans.map((p) => {
    const v = p[key];
    if (typeof v === "boolean" || v === "with-prod-pack" || v === "coming-soon") {
      return feat(v as FeatureAvailability);
    }
    return v !== null && v !== undefined ? String(v) : "-";
  });
  return `| ${label} | ${values.join(" | ")} |`;
}

function generateMarkdown(): string {
  const representativePlans: RedisPlan[] = [
    REDIS_FREE_PLAN,
    REDIS_PAYG_PLAN,
    REDIS_FIXED_PLANS[0], // 250MB
    REDIS_FIXED_PLANS[3], // 10GB
    REDIS_FIXED_PLANS[6], // 500GB
    REDIS_ENTERPRISE_PLAN,
  ];

  const lines: string[] = [
    "# Upstash Redis Pricing",
    "",
    "> **Source:** https://upstash.com/pricing/redis",
    "> **Format:** text/markdown — machine-readable pricing for agents and LLMs",
    "> **Contact:** sales@upstash.com (Enterprise) · support@upstash.com (Support)",
    "",
    "---",
    "",
    "## Plan Overview",
    "",
    "| Plan | Price | Read Region | Max Data | Max Bandwidth |",
    "|------|-------|-------------|----------|---------------|",
    ...REDIS_ALL_PLANS.map(planSummaryRow),
    "",
    "---",
    "",
    "## Fixed Plans — All Tiers",
    "",
    "Fixed plans have no per-command pricing. You pay a flat monthly fee based on the tier.",
    "",
    "| Tier | Monthly Price | Per Read Region | Max Data | Max Bandwidth | Max Cmd/sec | Max Request Size | Max Record Size | Max Indexes | Max Docs/Index |",
    "|------|--------------|-----------------|----------|---------------|-------------|------------------|-----------------|-------------|----------------|",
    ...REDIS_FIXED_PLANS.map(
      (p) =>
        `| ${p.name} | $${p.monthlyPrice} | +$${p.readRegionPrice} | ${p.dataSize} | ${p.maxBandwidth} | ${typeof p.maxCommandsPerSec === "number" ? p.maxCommandsPerSec.toLocaleString() : p.maxCommandsPerSec} | ${p.maxRequestSize} | ${p.maxRecordSize} | ${p.maxIndexCount} | ${p.maxDocumentsPerIndex} |`
    ),
    "",
    "---",
    "",
    "## Pay as You Go — Pricing Details",
    "",
    `- **Commands:** ${REDIS_PAYG_PLAN.requestPrice}`,
    `- **Storage:** ${REDIS_PAYG_PLAN.storagePrice}`,
    `- **Bandwidth:** ${REDIS_PAYG_PLAN.bandwidthPrice}`,
    `- **Max data size:** ${REDIS_PAYG_PLAN.dataSize}`,
    `- **Max request size:** ${REDIS_PAYG_PLAN.maxRequestSize} (upgradeable: ${REDIS_PAYG_PLAN.maxRequestSizeUpgrades})`,
    `- **Max record size:** ${REDIS_PAYG_PLAN.maxRecordSize} (upgradeable: ${REDIS_PAYG_PLAN.maxRecordSizeUpgrades})`,
    `- **Max indexes:** ${REDIS_PAYG_PLAN.maxIndexCount} (${REDIS_PAYG_PLAN.maxIndexCountNote})`,
    `- **Max databases:** ${REDIS_PAYG_PLAN.maxDatabases} (${REDIS_PAYG_PLAN.maxDatabasesNote})`,
    `- **Platforms:** ${REDIS_PAYG_PLAN.platforms.join(", ")}`,
    "",
    "---",
    "",
    "## Feature Comparison",
    "",
    "Table shows a representative subset of plans. See https://upstash.com/pricing/redis for the full interactive comparison.",
    "",
    `| Feature | ${representativePlans.map((p) => p.name).join(" | ")} |`,
    `|---------|${representativePlans.map(() => "---").join("|")}|`,
    "",
    "**Capacity**",
    "",
    featureRow("Max data size", representativePlans, "dataSize"),
    featureRow("Max bandwidth", representativePlans, "maxBandwidth"),
    featureRow("Max cmd/sec", representativePlans, "maxCommandsPerSec"),
    featureRow("Max request size", representativePlans, "maxRequestSize"),
    featureRow("Max record size", representativePlans, "maxRecordSize"),
    featureRow("Max index count", representativePlans, "maxIndexCount"),
    featureRow("Max docs/index", representativePlans, "maxDocumentsPerIndex"),
    featureRow("Max databases", representativePlans, "maxDatabases"),
    "",
    "**Features**",
    "",
    featureRow("Platforms", representativePlans, "platforms"),
    featureRow("Persistence", representativePlans, "persistence"),
    featureRow("REST API", representativePlans, "restApi"),
    featureRow("Global replication", representativePlans, "globalReplication"),
    featureRow("Strong consistency", representativePlans, "strongConsistency"),
    featureRow("High availability", representativePlans, "highAvailability"),
    featureRow("Multi-Zone HA", representativePlans, "multiZoneHA"),
    featureRow("Uptime SLA", representativePlans, "uptimeSLA"),
    "",
    "**Security**",
    "",
    featureRow("TLS encryption", representativePlans, "tlsEncryption"),
    featureRow("IP allowlist", representativePlans, "ipAllowlist"),
    featureRow("ACL", representativePlans, "acl"),
    featureRow("Encryption at rest", representativePlans, "encryptionAtRest"),
    featureRow("SOC-2 compliance", representativePlans, "soc2"),
    featureRow("Private Link", representativePlans, "privateLink"),
    featureRow("SAML SSO", representativePlans, "sso"),
    featureRow("HIPAA compliance", representativePlans, "hipaa"),
    "",
    "**Observability**",
    "",
    featureRow("Grafana", representativePlans, "grafana"),
    featureRow("Datadog", representativePlans, "datadog"),
    featureRow("New Relic", representativePlans, "newRelic"),
    featureRow("Access logging", representativePlans, "accessLogging"),
    "",
    "**Support**",
    "",
    featureRow("Community support", representativePlans, "communitySupport"),
    featureRow("Email support", representativePlans, "emailSupport"),
    featureRow(
      "Dedicated support + Slack",
      representativePlans,
      "dedicatedSupport"
    ),
    "",
    "---",
    "",
    "## Prod Pack Add-on",
    "",
    REDIS_PROD_PACK.description,
    "",
    "**Included features:**",
    "",
    ...REDIS_PROD_PACK.features.map((f) => `- ${f}`),
    "",
    "---",
    "",
    "## Enterprise",
    "",
    REDIS_ENTERPRISE_PLAN.description,
    "",
    "**Includes everything in Prod Pack, plus:**",
    "",
    "- Dedicated professional support and technical account manager",
    "- Unlimited databases",
    "- HIPAA compliance",
    "- VPC peering / Private Link",
    "- SAML SSO integration",
    "- Custom monthly or annual contracts",
    "",
    "**Contact:** sales@upstash.com",
    "",
    "---",
    "",
    "## Frequently Asked Questions",
    "",
    ...REDIS_FAQ.flatMap((item) => [
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
