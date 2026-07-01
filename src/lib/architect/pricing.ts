import type { WorkloadSpec } from "./schema";
import type {
  PlanOption,
  ProductRecommendation,
  Recommendation,
} from "./types";

/**
 * Deterministic pricing engine. 100% pure — no I/O, no LLM, no imports of redis/box.
 * All tables and rules are ported verbatim from upstash-architect.md §4–§5.
 *
 * Rule (doc §5): for each product, plan_cost = plan_floor + usage_overage, then pick the
 * CHEAPEST plan whose HARD limits satisfy the workload. Always surface Pay-as-you-go vs the
 * cheapest Fixed tier that fits, plus the crossover point.
 */

const DAYS = 30; // months normalized to 30 days
const round = (n: number) => Math.round(n * 100) / 100;
const gb = (mb: number) => mb / 1024;

/** Pick the cheapest plan among those that fit (nulls = custom, ranked last). */
function chooseCheapest(plans: PlanOption[]): PlanOption {
  const fitting = plans.filter((p) => p.fits);
  const pool = fitting.length ? fitting : plans;
  return [...pool].sort((a, b) => {
    if (a.monthlyCost == null) { return 1; }
    if (b.monthlyCost == null) { return -1; }
    return a.monthlyCost - b.monthlyCost;
  })[0];
}

// ─────────────────────────────────────────── Redis ───────────────────────────────────────────

const REDIS_FIXED = [
  { plan: "Fixed 250MB", price: 10, maxGB: gb(250), perRegion: 5 },
  { plan: "Fixed 1GB", price: 20, maxGB: 1, perRegion: 10 },
  { plan: "Fixed 5GB", price: 100, maxGB: 5, perRegion: 50 },
  { plan: "Fixed 10GB", price: 200, maxGB: 10, perRegion: 100 },
  { plan: "Fixed 50GB", price: 400, maxGB: 50, perRegion: 200 },
  { plan: "Fixed 100GB", price: 800, maxGB: 100, perRegion: 400 },
  { plan: "Fixed 500GB", price: 1500, maxGB: 500, perRegion: 750 },
];
const PROD_PACK = 200; // per DB: SLA, Multi-Zone HA, encryption at rest, SOC-2, monitoring

function priceRedis(spec: WorkloadSpec): ProductRecommendation {
  const cmdsPerMonth = spec.requestsPerDay * DAYS;
  const regionCount = Math.max(1, spec.regions.length);
  const readRegions = regionCount - 1;
  // Prod Pack covers SOC-2 + Multi-Zone HA + uptime SLA. Enterprise-only: HIPAA, VPC, SSO.
  const needsProdPack =
    spec.features.includes("soc2") || spec.features.includes("ha");
  const needsEnterprise =
    spec.features.includes("hipaa") ||
    spec.features.includes("vpc") ||
    spec.features.includes("sso") ||
    spec.dataSizeGB > 500;
  const plans: PlanOption[] = [];

  // Free — 256 MB, 500K cmd/mo, 1 DB, single region, no compliance.
  plans.push({
    plan: "Free",
    monthlyCost: 0,
    fits:
      spec.dataSizeGB <= gb(256) &&
      cmdsPerMonth <= 500_000 &&
      regionCount === 1 &&
      !needsProdPack &&
      !needsEnterprise,
    limits: {
      "Max data": "256 MB",
      "Commands/mo": "500K",
      Bandwidth: "10 GB/mo",
      Databases: "1",
    },
  });

  // Pay-as-you-go — $0.20/100K cmd + $0.25/GB storage (first 1 GB free), 100 GB cap.
  // Writes to read regions count as commands (doc §4).
  const paygStorage = Math.max(0, spec.dataSizeGB - 1) * 0.25;
  const paygCommands = (cmdsPerMonth / 100_000) * 0.2 * regionCount;
  const payg: PlanOption = {
    plan: "Pay-as-you-go",
    monthlyCost: round(paygStorage + paygCommands),
    fits: spec.dataSizeGB <= 100 && !needsProdPack && !needsEnterprise,
    limits: {
      "Max data": "100 GB",
      Commands: "$0.20 / 100K",
      Storage: "$0.25/GB (1 GB free)",
      Databases: "up to 100",
    },
  };
  plans.push(payg);

  // Fixed tiers — smallest that holds the data. + per-read-region + optional Prod Pack.
  let cheapestFixed: PlanOption | null = null;
  for (const t of REDIS_FIXED) {
    const base = t.price + readRegions * t.perRegion + (needsProdPack ? PROD_PACK : 0);
    const opt: PlanOption = {
      plan: t.plan,
      monthlyCost: base,
      fits: spec.dataSizeGB <= t.maxGB && !needsEnterprise,
      limits: {
        "Max data": t.plan.replace("Fixed ", ""),
        Commands: "Unlimited",
        "Read region": `+$${t.perRegion}/mo each`,
        ...(needsProdPack ? { "Prod Pack": "+$200/mo (SOC-2, HA, SLA)" } : {}),
      },
    };
    plans.push(opt);
    if (opt.fits && (!cheapestFixed || base < (cheapestFixed.monthlyCost ?? Number.POSITIVE_INFINITY))) {
      cheapestFixed = opt;
    }
  }

  // Enterprise — up to 10 TB, HIPAA/VPC/SSO.
  plans.push({
    plan: "Enterprise",
    monthlyCost: null,
    fits: true,
    limits: { "Max data": "up to 10 TB", Compliance: "HIPAA, VPC, SSO" },
  });

  const chosen = chooseCheapest(plans);
  const reason = needsEnterprise
    ? "HIPAA / VPC / SSO or >500 GB requires Enterprise."
    : needsProdPack
      ? "SOC-2 / HA / uptime SLA needs a Fixed plan + Prod Pack (not on Free/PAYG)."
      : chosen.plan === "Free"
        ? "Workload fits the Free tier."
        : chosen.plan === "Pay-as-you-go"
          ? "Variable/low volume — cheaper on pay-as-you-go."
          : "Data size / steady traffic favors a Fixed tier.";

  // Crossover: PAYG command cost equals the cheapest Fixed base.
  let crossoverNote: string | undefined;
  if (cheapestFixed?.monthlyCost) {
    const cmds = (cheapestFixed.monthlyCost / 0.2) * 100_000;
    crossoverNote = `${cheapestFixed.plan} ($${cheapestFixed.monthlyCost}/mo) beats pay-as-you-go above ~${(cmds / 1_000_000).toFixed(1)}M commands/mo.`;
  }

  return {
    product: "Redis",
    chosenPlan: chosen.plan,
    reason,
    payAsYouGo: payg,
    cheapestFixed,
    crossoverNote,
    allPlans: plans,
  };
}

// ─────────────────────────────────────────── Vector ──────────────────────────────────────────

function priceVector(spec: WorkloadSpec): ProductRecommendation {
  const reqPerMonth = spec.requestsPerDay * DAYS;
  const storage = Math.max(0, spec.dataSizeGB) * 0.25;

  // Upstash Vector meters capacity as vectors × dimensions, not raw vector count.
  // Fall back to recordCount when the count landed in the wrong field.
  const count = spec.vectorCount || spec.recordCount;
  const dims = spec.dimensions || 1536;
  const capacity = count * dims;
  const needsPro = capacity > 2_000_000_000 || dims > 3072 || spec.dataSizeGB > 50;
  const plans: PlanOption[] = [];

  plans.push({
    plan: "Free",
    monthlyCost: 0,
    fits:
      capacity <= 200_000_000 &&
      dims <= 1536 &&
      spec.requestsPerDay <= 10_000 &&
      spec.dataSizeGB <= 1,
    limits: {
      "Max vectors×dims": "200M",
      "Max dims": "1,536",
      "Daily queries": "10K",
      "Max data": "1 GB",
    },
  });

  const payg: PlanOption = {
    plan: "Pay-as-you-go",
    monthlyCost: round((reqPerMonth / 100_000) * 0.4 + storage),
    fits: !needsPro,
    limits: {
      Requests: "$0.40 / 100K",
      "Max vectors×dims": "2B",
      "Max dims": "3,072",
      "Max data": "50 GB",
    },
  };
  plans.push(payg);

  const fixed: PlanOption = {
    plan: "Fixed",
    monthlyCost: round(60 + storage),
    fits: !needsPro && spec.requestsPerDay <= Math.ceil(1_000_000 / DAYS),
    limits: {
      Price: "$60/mo",
      "Daily queries": "1M",
      "Max vectors×dims": "2B",
      SLA: "99.9%",
    },
  };
  plans.push(fixed);

  plans.push({
    plan: "Pro",
    monthlyCost: null,
    fits: true,
    limits: { "Max vectors×dims": "100B", "Max dims": "5,000", "Max data": "1 TB" },
  });

  const chosen = chooseCheapest(plans);
  let crossoverNote: string | undefined;
  if (fixed.fits) {
    const reqs = (60 / 0.4) * 100_000;
    crossoverNote = `Fixed ($60/mo) beats pay-as-you-go above ~${(reqs / 1_000_000).toFixed(1)}M requests/mo.`;
  }

  return {
    product: "Vector",
    chosenPlan: chosen.plan,
    reason: needsPro
      ? `Capacity ${(capacity / 1_000_000_000).toFixed(1)}B vectors×dims exceeds 2B (or >3,072 dims / >50 GB) → Pro.`
      : chosen.plan === "Free"
        ? "Workload fits the Free tier."
        : "Selected the cheapest plan that fits the vectors×dims capacity.",
    payAsYouGo: payg,
    cheapestFixed: fixed.fits ? fixed : null,
    crossoverNote,
    allPlans: plans,
  };
}

// ─────────────────────────────────────────── QStash ──────────────────────────────────────────

function priceQStash(spec: WorkloadSpec): ProductRecommendation {
  const msgsPerMonth = spec.messagesPerDay * DAYS;
  const plans: PlanOption[] = [];

  plans.push({
    plan: "Free",
    monthlyCost: 0,
    fits: spec.messagesPerDay <= 1_000 && spec.schedules <= 10,
    limits: {
      "Messages/day": "1,000",
      Schedules: "10",
      Parallelism: "10",
      "Msg size": "1 MB",
    },
  });

  const payg: PlanOption = {
    plan: "Pay-as-you-go",
    monthlyCost: round((msgsPerMonth / 100_000) * 1),
    fits: true,
    limits: {
      "Messages/day": "Unlimited",
      Price: "$1 / 100K msgs",
      Schedules: "1,000 free",
      Parallelism: "100",
    },
  };
  plans.push(payg);

  const fixed1m: PlanOption = {
    plan: "Fixed 1M",
    monthlyCost: 180,
    fits: spec.messagesPerDay <= 1_000_000,
    limits: { "Messages/day": "1M", Parallelism: "200", DLQ: "30-day" },
  };
  const fixed10m: PlanOption = {
    plan: "Fixed 10M",
    monthlyCost: 420,
    fits: spec.messagesPerDay <= 10_000_000,
    limits: { "Messages/day": "10M", Parallelism: "1,000", DLQ: "3-month" },
  };
  plans.push(fixed1m, fixed10m);

  plans.push({
    plan: "Enterprise",
    monthlyCost: null,
    fits: true,
    limits: { "Messages/day": "100M+", Bandwidth: "Unlimited", SSO: "Yes" },
  });

  const chosen = chooseCheapest(plans);
  const cheapestFixed = [fixed1m, fixed10m].find((f) => f.fits) ?? null;
  let crossoverNote: string | undefined;
  if (cheapestFixed?.monthlyCost) {
    const msgs = (cheapestFixed.monthlyCost / 1) * 100_000;
    crossoverNote = `${cheapestFixed.plan} ($${cheapestFixed.monthlyCost}/mo) beats pay-as-you-go above ~${(msgs / 1_000_000).toFixed(1)}M messages/mo.`;
  }

  return {
    product: "QStash",
    chosenPlan: chosen.plan,
    reason:
      chosen.plan === "Free"
        ? "Schedules and volume fit the Free tier."
        : "Selected the cheapest plan that fits the message volume.",
    payAsYouGo: payg,
    cheapestFixed,
    crossoverNote,
    allPlans: plans,
  };
}

// ─────────────────────────────────────────── Search ──────────────────────────────────────────

function priceSearch(spec: WorkloadSpec): ProductRecommendation {
  const queriesPerMonth = spec.requestsPerDay * DAYS;
  const plans: PlanOption[] = [];

  plans.push({
    plan: "Free",
    monthlyCost: 0,
    fits: spec.recordCount <= 200_000 && queriesPerMonth <= 20_000,
    limits: {
      "Queries/mo": "20K",
      "Max records": "200K",
      Databases: "10",
      "Indexes/DB": "10,000",
    },
  });

  const payg: PlanOption = {
    plan: "Pay-as-you-go",
    monthlyCost: round((queriesPerMonth / 1_000) * 0.05),
    fits: spec.recordCount <= 2_000_000,
    limits: {
      "Queries/mo": "Unlimited",
      "Max records": "2M",
      Price: "$0.05 / 1K requests",
      Storage: "50 GB",
    },
  };
  plans.push(payg);

  plans.push({
    plan: "Pro",
    monthlyCost: null,
    fits: true,
    limits: { "Queries/mo": "Unlimited", "Max records": "Unlimited" },
  });

  const chosen = chooseCheapest(plans);
  return {
    product: "Search",
    chosenPlan: chosen.plan,
    reason:
      spec.recordCount > 2_000_000
        ? ">2M records requires Pro (coming soon)."
        : spec.recordCount > 200_000 || queriesPerMonth > 20_000
          ? "Exceeds Free caps (200K records / 20K queries) → pay-as-you-go."
          : "Workload fits the Free tier.",
    payAsYouGo: payg,
    cheapestFixed: null, // Search has no Fixed tier
    allPlans: plans,
  };
}

// ─────────────────────────────────────────── Workflow ────────────────────────────────────────

function priceWorkflow(): ProductRecommendation {
  return {
    product: "Workflow",
    chosenPlan: "Included",
    reason:
      "Workflow is billed through QStash message volume — no separate plan. Adds durability/retries.",
    payAsYouGo: null,
    cheapestFixed: null,
    allPlans: [],
  };
}

const PRICERS: Record<string, (s: WorkloadSpec) => ProductRecommendation> = {
  redis: priceRedis,
  vector: priceVector,
  qstash: priceQStash,
  search: priceSearch,
  workflow: () => priceWorkflow(),
};

/** Why each product is in the stack — its role for the workload. */
const PRODUCT_ROLE: Record<string, string> = {
  Redis: "In-memory cache, session/state store, counters, and rate-limit backend.",
  Vector: "Vector similarity search over embeddings.",
  QStash: "Scheduled jobs and reliable background/message delivery.",
  Search: "Keyword + semantic search with a built-in embedding model.",
  Workflow: "Durable, retryable orchestration of multi-step flows.",
};

/** Deterministic "why" bullets for one product — no LLM, fully auditable. */
function buildReasoning(p: ProductRecommendation): string[] {
  const out: string[] = [];
  const role = PRODUCT_ROLE[p.product];
  if (role) {
    out.push(role);
  }

  const chosen = p.allPlans.find((pl) => pl.plan === p.chosenPlan);
  if (chosen) {
    const c = chosen.monthlyCost;
    out.push(
      c == null
        ? `${p.chosenPlan}: custom / Enterprise pricing.`
        : c === 0
          ? `${p.chosenPlan}: no cost ($0/mo) — the workload fits its limits.`
          : `${p.chosenPlan}: ~$${c}/mo at this workload — the cheapest plan whose hard limits fit.`,
    );

    // Name the cheapest tier we ruled out (transparency on "why not cheaper").
    const cheaperRuledOut = p.allPlans.find(
      (pl) =>
        !pl.fits &&
        pl.monthlyCost != null &&
        (c == null || pl.monthlyCost < c),
    );
    if (cheaperRuledOut) {
      out.push(
        `${cheaperRuledOut.plan} ruled out: it doesn't satisfy the workload's hard limits.`,
      );
    }
  }

  if (p.crossoverNote) {
    out.push(p.crossoverNote);
  }
  return out;
}

/** Human-readable summary of exactly what was parsed from the free text. */
function summarizeSpec(spec: WorkloadSpec): string {
  const parts: string[] = [
    `${spec.products.length} product${spec.products.length > 1 ? "s" : ""} (${spec.products.join(", ")})`,
  ];
  const n = (v: number) => v.toLocaleString("en-US");
  if (spec.requestsPerDay) { parts.push(`~${n(spec.requestsPerDay)} requests/day`); }
  if (spec.recordCount) { parts.push(`${n(spec.recordCount)} records`); }
  if (spec.vectorCount) { parts.push(`${n(spec.vectorCount)} vectors`); }
  if (spec.dataSizeGB) { parts.push(`${spec.dataSizeGB} GB data`); }
  if (spec.messagesPerDay) { parts.push(`~${n(spec.messagesPerDay)} messages/day`); }
  if (spec.regions.length) { parts.push(`regions: ${spec.regions.join(", ")}`); }
  if (spec.features.length) { parts.push(`features: ${spec.features.join(", ")}`); }
  if (spec.schedules) {
    parts.push(`${spec.schedules} scheduled job${spec.schedules > 1 ? "s" : ""}`);
  }
  return parts.join(" · ");
}

/** Map a validated workload spec to per-product plan/limit/cost recommendations. */
export function priceEngine(spec: WorkloadSpec): Recommendation {
  const products = spec.products.map((p) => {
    const rec = PRICERS[p](spec);
    return { ...rec, reasoning: buildReasoning(rec) };
  });

  // Upstash Workflow has no separate billing — it runs on QStash. Price QStash from the run
  // volume (runs may land in requestsPerDay), replacing any under-priced QStash entry, so a
  // workflow is never shown as $0.
  if (spec.products.includes("workflow")) {
    const runs = Math.max(spec.messagesPerDay, spec.requestsPerDay);
    const q = priceQStash({ ...spec, messagesPerDay: runs });
    q.reason =
      "QStash backs Upstash Workflow — the delivery cost of your workflow runs.";
    const entry = { ...q, reasoning: buildReasoning(q) };
    const idx = products.findIndex((p) => p.product === "QStash");
    if (idx >= 0) {
      products[idx] = entry;
    } else {
      products.push(entry);
    }
  }

  let hasCustom = false;
  const totalMonthlyLow = round(
    products.reduce((sum, p) => {
      const chosen = p.allPlans.find((pl) => pl.plan === p.chosenPlan);
      // A chosen plan with no numeric price (Pro / Enterprise) → custom; total is a floor.
      if (chosen && chosen.monthlyCost == null) {
        hasCustom = true;
      }
      return sum + (chosen?.monthlyCost ?? 0);
    }, 0),
  );

  const assumptions = [
    "Months normalized to 30 days.",
    "Figures are indicative; refresh from the live pricing feeds (see upstash-architect.md).",
  ];
  if (spec.regions.length > 1) {
    assumptions.push(
      `${spec.regions.length} regions: writes to read regions are billed as commands (Redis).`,
    );
  }

  return {
    products,
    totalMonthlyLow,
    hasCustom,
    assumptions,
    spec,
    understood: summarizeSpec(spec),
  };
}
