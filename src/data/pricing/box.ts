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
  type: "free" | "payg" | "keepalive";
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
    cpuHourPrice: 0.1,
    keepAlivePrice: 8,
  },
  {
    id: "medium",
    label: "Medium",
    cpu: "4 vCPU",
    memory: "8 GB RAM",
    storage: "10 GB",
    storageLimit: "10 GB",
    cpuHourPrice: 0.2,
    keepAlivePrice: 16,
  },
  {
    id: "large",
    label: "Large",
    cpu: "8 vCPU",
    memory: "16 GB RAM",
    storage: "20 GB",
    storageLimit: "20 GB",
    cpuHourPrice: 0.4,
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
  description:
    "Pay for active time only. Boxes pause when idle.",
  priceDisplay: "$0.10–$0.40",
  priceSubtext: "per active CPU hour",
  maxConcurrentBoxes: 1000,
  cpuHoursPerMonth: "Unlimited",
  llmBudgetPerMonth: "$100",
  storagePrice: "$0.10 per GB/month",
  cpuHourPricing:
    "Small: $0.10, Medium: $0.20, Large: $0.40 per active CPU hour",
  keepAlivePricing:
    "Available per box at a fixed monthly price. See the Fixed plan.",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const BOX_KEEPALIVE_PLAN: BoxPlan = {
  id: "keepalive",
  name: "Fixed",
  type: "keepalive",
  description:
    "Always-on boxes. One monthly price, no usage charges.",
  priceDisplay: "$8–$32",
  priceSubtext: "per box / month",
  maxConcurrentBoxes: 1000,
  cpuHoursPerMonth: "Unlimited",
  llmBudgetPerMonth: "$100",
  storagePrice: "Included",
  cpuHourPricing: "Included in the fixed monthly price",
  keepAlivePricing: "Small: $8, Medium: $16, Large: $32 per box / month",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const BOX_ALL_PLANS: BoxPlan[] = [
  BOX_FREE_PLAN,
  BOX_PAYG_PLAN,
  BOX_KEEPALIVE_PLAN,
];

export const BOX_FAQ = boxFaqJson.faq;
