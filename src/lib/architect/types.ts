// Shared types for the Upstash Architect advisor.
// NONE of the pricing types depend on the LLM — the deterministic engine owns them.

import type { WorkloadSpec } from "./schema";

export interface PlanOption {
  plan: string; // "Free" | "Pay-as-you-go" | "Fixed 250MB" | "Enterprise" | ...
  monthlyCost: number | null; // null = "Custom" / "Coming soon"
  limits: Record<string, string>;
  fits: boolean; // does this plan satisfy the workload's hard limits?
  note?: string;
}

export interface ProductRecommendation {
  product: string; // "Redis" | "Vector" | "QStash" | "Search" | "Workflow"
  chosenPlan: string; // cheapest plan whose hard limits fit
  reason: string; // one-line headline: which limit(s) drove the choice
  reasoning?: string[]; // supporting "why" bullets (role, cost, ruled-out tiers, crossover)
  payAsYouGo: PlanOption | null;
  cheapestFixed: PlanOption | null;
  crossoverNote?: string; // monthly volume where Fixed beats PAYG
  allPlans: PlanOption[];
}

export interface Recommendation {
  products: ProductRecommendation[];
  totalMonthlyLow: number; // sum of numeric monthly costs (custom plans excluded)
  hasCustom: boolean; // a chosen plan has custom pricing (Pro/Enterprise) — total is a floor
  assumptions: string[];
  spec: WorkloadSpec; // exactly what was parsed from the free text (auditability)
  understood: string; // human-readable summary of `spec`
}

export interface Citation {
  product: string;
  title: string;
  url: string;
}

export interface ChatResponse {
  recommendation: Recommendation;
  citations: Citation[];
  cached: boolean;
}
