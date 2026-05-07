import searchFaqJson from "../../../public/faq/search.json";

export interface SearchPlan {
  id: string;
  name: string;
  type: "free" | "payg" | "pro";
  description: string;
  priceDisplay: string;
  priceSubtext: string;
  monthlyPrice: number | null;
  requestPrice: string | null;

  // Capacity
  monthlyQueryLimit: string;
  maxRecords: string;

  // Support
  communitySupport: boolean;
  emailSupport: boolean;
  dedicatedSupport: boolean;
}

export const SEARCH_NOTE =
  "Upstash Search is currently in Preview/Early Access. Uptime SLAs are not guaranteed during this period.";

export const SEARCH_FREE_PLAN: SearchPlan = {
  id: "free",
  name: "Free",
  type: "free",
  description: "Perfect for prototypes and hobby projects.",
  priceDisplay: "$0",
  priceSubtext: "-",
  monthlyPrice: 0,
  requestPrice: "Free",
  monthlyQueryLimit: "20K",
  maxRecords: "200K",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const SEARCH_PAYG_PLAN: SearchPlan = {
  id: "payg",
  name: "Pay as You Go",
  type: "payg",
  description: "For use cases with bursting traffic.",
  priceDisplay: "$0.05",
  priceSubtext: "per 1K requests",
  monthlyPrice: null,
  requestPrice: "$0.05 per 1K requests (search and upsert)",
  monthlyQueryLimit: "Unlimited",
  maxRecords: "2M",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const SEARCH_PRO_PLAN: SearchPlan = {
  id: "pro",
  name: "Pro",
  type: "pro",
  description: "For consistent loads with predictable costs.",
  priceDisplay: "Coming Soon",
  priceSubtext: "",
  monthlyPrice: null,
  requestPrice: null,
  monthlyQueryLimit: "Unlimited",
  maxRecords: "Unlimited",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const SEARCH_ALL_PLANS: SearchPlan[] = [
  SEARCH_FREE_PLAN,
  SEARCH_PAYG_PLAN,
  SEARCH_PRO_PLAN,
];

export const SEARCH_FAQ = searchFaqJson.faq;
