import boxFaqJson from "../../../public/faq/box.json";

export interface BoxSize {
  id: "small" | "medium" | "large";
  label: string;
  cpu: string;
  memory: string;
  storage: string;
  storageLimit: string;
  cpuHourPrice: number;
  keepAlivePrice: number;
}

export interface BoxPlan {
  id: string;
  name: string;
  type: "free" | "payg" | "enterprise";
  description: string;
  priceDisplay: string;
  priceSubtext: string;

  // Capacity
  maxConcurrentBoxes: number | string;
  cpuHoursPerMonth: number | string;
  llmBudgetPerMonth: string;

  // Pricing
  storagePrice: string | null;
  cpuHourPricing: string | null;
  keepAlivePricing: string | null;

  // Support
  communitySupport: boolean;
  emailSupport: boolean;
  dedicatedSupport: boolean;
}

export const BOX_SIZES: BoxSize[] = [
  {
    id: "small",
    label: "Small",
    cpu: "2 vCPU",
    memory: "4 GB RAM",
    storage: "5 GB",
    storageLimit: "5 GB",
    cpuHourPrice: 0.10,
    keepAlivePrice: 8,
  },
  {
    id: "medium",
    label: "Medium",
    cpu: "4 vCPU",
    memory: "8 GB RAM",
    storage: "10 GB",
    storageLimit: "10 GB",
    cpuHourPrice: 0.20,
    keepAlivePrice: 16,
  },
  {
    id: "large",
    label: "Large",
    cpu: "8 vCPU",
    memory: "16 GB RAM",
    storage: "20 GB",
    storageLimit: "20 GB",
    cpuHourPrice: 0.40,
    keepAlivePrice: 32,
  },
];

export const BOX_FREE_PLAN: BoxPlan = {
  id: "free",
  name: "Free",
  type: "free",
  description: "Perfect for prototypes and hobby projects.",
  priceDisplay: "$0",
  priceSubtext: "-",
  maxConcurrentBoxes: 10,
  cpuHoursPerMonth: 5,
  llmBudgetPerMonth: "$1",
  storagePrice: null,
  cpuHourPricing: null,
  keepAlivePricing: null,
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const BOX_PAYG_PLAN: BoxPlan = {
  id: "payg",
  name: "Pay as You Go",
  type: "payg",
  description: "Pay only when your box is active. Choose the size that matches your workload.",
  priceDisplay: "$0.10–$0.40",
  priceSubtext: "per active CPU hour",
  maxConcurrentBoxes: 100,
  cpuHoursPerMonth: "Unlimited",
  llmBudgetPerMonth: "$100",
  storagePrice: "$0.10 per GB/month",
  cpuHourPricing: "Small: $0.10, Medium: $0.20, Large: $0.40 per active CPU hour",
  keepAlivePricing: "Small: $8, Medium: $16, Large: $32 per month (fixed, replaces usage billing)",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const BOX_ENTERPRISE_PLAN: BoxPlan = {
  id: "enterprise",
  name: "Enterprise",
  type: "enterprise",
  description: "For teams that need custom limits, regional requirements, or dedicated support.",
  priceDisplay: "Custom",
  priceSubtext: "contact us",
  maxConcurrentBoxes: "Custom",
  cpuHoursPerMonth: "Custom",
  llmBudgetPerMonth: "Custom",
  storagePrice: "Custom",
  cpuHourPricing: "Custom",
  keepAlivePricing: "Custom",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: true,
};

export const BOX_ALL_PLANS: BoxPlan[] = [
  BOX_FREE_PLAN,
  BOX_PAYG_PLAN,
  BOX_ENTERPRISE_PLAN,
];

export const BOX_FAQ = boxFaqJson.faq;
