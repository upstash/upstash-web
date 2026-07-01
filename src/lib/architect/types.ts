// Shared types for the Upstash Architect advisor.
// NONE of the pricing types depend on the LLM — the deterministic engine owns them.

export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
  at: number; // epoch ms
}

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
  reason: string; // which limit(s) drove the choice
  payAsYouGo: PlanOption | null;
  cheapestFixed: PlanOption | null;
  crossoverNote?: string; // monthly volume where Fixed beats PAYG
  allPlans: PlanOption[];
}

export interface Recommendation {
  products: ProductRecommendation[];
  totalMonthlyLow: number; // cheapest coherent combination (nulls treated as 0 / "custom")
  assumptions: string[];
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
