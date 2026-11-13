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
  keepAliveMonthlyApprox: number;
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
    storage: "10 GB",
    storageLimit: "10 GB",
    cpuHourPrice: 0.1,
    keepAlivePrice: 0.0111,
    keepAliveMonthlyApprox: 8,
  },
  {
    id: "medium",
    label: "Medium",
    cpu: "4 vCPU",
    memory: "8 GB RAM",
    storage: "30 GB",
    storageLimit: "30 GB",
    cpuHourPrice: 0.2,
    keepAlivePrice: 0.0222,
    keepAliveMonthlyApprox: 16,
  },
  {
    id: "large",
    label: "Large",
    cpu: "8 vCPU",
    memory: "16 GB RAM",
    storage: "30 GB",
    storageLimit: "30 GB",
    cpuHourPrice: 0.4,
    keepAlivePrice: 0.0444,
    keepAliveMonthlyApprox: 32,
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
  storagePrice: "$0.10 per GB/month",
  cpuHourPricing:
    "Small: $0.10, Medium: $0.20, Large: $0.40 per active CPU hour",
  keepAlivePricing:
    "Available per box at a fixed rate per hour. See the Fixed plan.",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const BOX_KEEPALIVE_PLAN: BoxPlan = {
  id: "keepalive",
  name: "Fixed",
  type: "keepalive",
  description:
    "Always-on boxes. One rate per hour, no usage charges.",
  priceDisplay: "$0.0111–$0.0444",
  priceSubtext: "per box / hour",
  maxConcurrentBoxes: 1000,
  cpuHoursPerMonth: "Unlimited",
  storagePrice: "Included",
  cpuHourPricing: "Included in the fixed rate",
  keepAlivePricing: "Small: $0.0111, Medium: $0.0222, Large: $0.0444 per box / hour (about $8, $16, $32 per month)",
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
