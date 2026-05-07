import vectorFaqJson from "../../../public/faq/vector.json";

export type VectorFeatureAvailability = boolean | "coming-soon";

export interface VectorPlan {
  id: string;
  name: string;
  type: "free" | "payg" | "fixed" | "pro";
  description: string;
  priceDisplay: string;
  priceSubtext: string;
  monthlyPrice: number | null;
  requestPrice: string | null;
  storagePrice: string | null;
  bandwidthPrice: string | null;

  // Capacity
  maxVectorsDimensions: string;
  maxDimensions: number | string;
  maxNamespaces: number | string;
  dailyQueryLimit: string;
  maxMetadataPerVector: string;
  maxDataPerVector: string;
  maxTotalDataSize: string;

  // Features
  regions: string[];
  sdks: string[];
  liveIndexUpdates: boolean;
  scaleToZero: boolean;
  sparseVectors: VectorFeatureAvailability;
  namespaces: boolean;
  metadataFiltering: boolean;
  uptimeSLA: string;

  // Support
  communitySupport: boolean;
  emailSupport: boolean;
  dedicatedSupport: boolean;
}

export const VECTOR_FREE_PLAN: VectorPlan = {
  id: "free",
  name: "Free",
  type: "free",
  description: "Perfect for prototypes and hobby projects.",
  priceDisplay: "$0",
  priceSubtext: "-",
  monthlyPrice: 0,
  requestPrice: "Free",
  storagePrice: "Free",
  bandwidthPrice: "Free",
  maxVectorsDimensions: "200M",
  maxDimensions: 1536,
  maxNamespaces: 100,
  dailyQueryLimit: "10K",
  maxMetadataPerVector: "48 KB",
  maxDataPerVector: "1 MB",
  maxTotalDataSize: "1 GB",
  regions: ["N. Virginia (AWS)", "Ireland (AWS)", "Iowa (GCP)"],
  sdks: ["REST", "Python", "TypeScript", "Go"],
  liveIndexUpdates: true,
  scaleToZero: true,
  sparseVectors: "coming-soon",
  namespaces: true,
  metadataFiltering: true,
  uptimeSLA: "None",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const VECTOR_PAYG_PLAN: VectorPlan = {
  id: "payg",
  name: "Pay as You Go",
  type: "payg",
  description: "For use cases with bursting traffic.",
  priceDisplay: "$0.4",
  priceSubtext: "per 100K requests",
  monthlyPrice: null,
  requestPrice: "$0.40 per 100K requests",
  storagePrice: "$0.25 per GB",
  bandwidthPrice: "Free up to 200 GB/month, then $0.03/GB",
  maxVectorsDimensions: "2B",
  maxDimensions: 3072,
  maxNamespaces: 10_000,
  dailyQueryLimit: "Unlimited",
  maxMetadataPerVector: "48 KB",
  maxDataPerVector: "1 MB",
  maxTotalDataSize: "50 GB",
  regions: ["N. Virginia (AWS)", "Ireland (AWS)", "Iowa (GCP)"],
  sdks: ["REST", "Python", "TypeScript", "Go"],
  liveIndexUpdates: true,
  scaleToZero: true,
  sparseVectors: "coming-soon",
  namespaces: true,
  metadataFiltering: true,
  uptimeSLA: "99.9%",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const VECTOR_FIXED_PLAN: VectorPlan = {
  id: "fixed",
  name: "Fixed",
  type: "fixed",
  description: "For consistent loads with predictable costs.",
  priceDisplay: "$60",
  priceSubtext: "/ month",
  monthlyPrice: 60,
  requestPrice: "Included",
  storagePrice: "$0.25 per GB",
  bandwidthPrice: "Free up to 200 GB/month, then $0.03/GB",
  maxVectorsDimensions: "2B",
  maxDimensions: 3072,
  maxNamespaces: 10_000,
  dailyQueryLimit: "1M",
  maxMetadataPerVector: "48 KB",
  maxDataPerVector: "1 MB",
  maxTotalDataSize: "50 GB",
  regions: ["N. Virginia (AWS)", "Ireland (AWS)"],
  sdks: ["REST", "Python", "TypeScript", "Go"],
  liveIndexUpdates: true,
  scaleToZero: false,
  sparseVectors: "coming-soon",
  namespaces: true,
  metadataFiltering: true,
  uptimeSLA: "99.9%",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const VECTOR_PRO_PLAN: VectorPlan = {
  id: "pro",
  name: "Pro",
  type: "pro",
  description:
    "For high-volume production workloads with dedicated support and a 99.99% SLA.",
  priceDisplay: "Contact Us",
  priceSubtext: "",
  monthlyPrice: null,
  requestPrice: null,
  storagePrice: "$0.25 per GB",
  bandwidthPrice: "$0.03 per GB",
  maxVectorsDimensions: "100B",
  maxDimensions: 5000,
  maxNamespaces: "Unlimited",
  dailyQueryLimit: "Unlimited",
  maxMetadataPerVector: "48 KB",
  maxDataPerVector: "1 MB",
  maxTotalDataSize: "1 TB",
  regions: ["N. Virginia (AWS)", "Ireland (AWS)"],
  sdks: ["REST", "Python", "TypeScript", "Go"],
  liveIndexUpdates: true,
  scaleToZero: false,
  sparseVectors: "coming-soon",
  namespaces: true,
  metadataFiltering: true,
  uptimeSLA: "99.99%",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: true,
};

export const VECTOR_ALL_PLANS: VectorPlan[] = [
  VECTOR_FREE_PLAN,
  VECTOR_PAYG_PLAN,
  VECTOR_FIXED_PLAN,
  VECTOR_PRO_PLAN,
];

export const VECTOR_FAQ = vectorFaqJson.faq;
