import qstashFaqJson from "../../../public/faq/qstash.json";

export interface QStashPlan {
  id: string;
  name: string;
  type: "free" | "payg" | "fixed" | "enterprise";
  description: string;
  priceDisplay: string;
  priceSubtext: string;
  monthlyPrice: number | null;
  messagePrice: string | null;
  bandwidthPrice: string | null;

  // Capacity
  maxMessagesPerDay: string;
  maxBandwidth: string;
  maxBandwidthNote: string | null;
  maxMessageSize: string;
  maxUrlGroups: number | string;
  maxEndpointsPerGroup: number | string;
  maxDelay: string;
  maxHttpResponseDuration: string;
  maxDlqRetention: string;
  maxLogsRetention: string;
  maxSchedules: number | string;
  maxSchedulesNote: string | null;
  maxQueueCount: number | string;
  maxQueueParallelism: number | string;
  maxParallelism: number | string;

  // Features
  uptimeSLA: boolean | "with-prod-pack";
  encryptionAtRest: boolean | "with-prod-pack";
  soc2: boolean | "with-prod-pack";
  sso: boolean;
  prometheus: boolean | "with-prod-pack";
  datadog: boolean | "with-prod-pack";
  communitySupport: boolean;
  emailSupport: boolean;
  dedicatedSupport: boolean;
}

export const QSTASH_FREE_PLAN: QStashPlan = {
  id: "free",
  name: "Free",
  type: "free",
  description: "Perfect for prototypes and hobby projects.",
  priceDisplay: "$0",
  priceSubtext: "-",
  monthlyPrice: 0,
  messagePrice: "Free",
  bandwidthPrice: "Free",
  maxMessagesPerDay: "1,000",
  maxBandwidth: "50 GB",
  maxBandwidthNote: null,
  maxMessageSize: "1 MB",
  maxUrlGroups: 1,
  maxEndpointsPerGroup: 100,
  maxDelay: "7 days",
  maxHttpResponseDuration: "15 minutes",
  maxDlqRetention: "3 days",
  maxLogsRetention: "3 days",
  maxSchedules: 10,
  maxSchedulesNote: null,
  maxQueueCount: 10,
  maxQueueParallelism: 2,
  maxParallelism: 10,
  uptimeSLA: false,
  encryptionAtRest: false,
  soc2: false,
  sso: false,
  prometheus: false,
  datadog: false,
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const QSTASH_PAYG_PLAN: QStashPlan = {
  id: "payg",
  name: "Pay as You Go",
  type: "payg",
  description: "For use cases with bursting traffic.",
  priceDisplay: "$1",
  priceSubtext: "per 100K messages",
  monthlyPrice: null,
  messagePrice: "$1 per 100K messages",
  bandwidthPrice: "Free up to 50 GB/month, then $0.05/GB",
  maxMessagesPerDay: "Unlimited",
  maxBandwidth: "50 GB",
  maxBandwidthNote: "Free up to 50 GB/month. Beyond that, $0.05 per GB.",
  maxMessageSize: "10 MB",
  maxUrlGroups: 100,
  maxEndpointsPerGroup: 100,
  maxDelay: "1 year",
  maxHttpResponseDuration: "2 hours",
  maxDlqRetention: "7 days",
  maxLogsRetention: "7 days",
  maxSchedules: 1000,
  maxSchedulesNote: "Free up to 1,000. Beyond that, $0.01 per active schedule.",
  maxQueueCount: 100,
  maxQueueParallelism: 10,
  maxParallelism: 100,
  uptimeSLA: "with-prod-pack",
  encryptionAtRest: "with-prod-pack",
  soc2: "with-prod-pack",
  sso: false,
  prometheus: "with-prod-pack",
  datadog: "with-prod-pack",
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const QSTASH_FIXED_PLANS: QStashPlan[] = [
  {
    id: "fixed-1m",
    name: "Fixed 1M",
    type: "fixed",
    description: "For businesses with consistent high-capacity loads and predictable costs.",
    priceDisplay: "$180",
    priceSubtext: "/ month",
    monthlyPrice: 180,
    messagePrice: "Included",
    bandwidthPrice: "Included (up to 1 TB/month)",
    maxMessagesPerDay: "1M",
    maxBandwidth: "1 TB",
    maxBandwidthNote: "We'll reach out for an upgrade if quota is exceeded consistently.",
    maxMessageSize: "50 MB",
    maxUrlGroups: 1000,
    maxEndpointsPerGroup: 1000,
    maxDelay: "Unlimited",
    maxHttpResponseDuration: "6 hours",
    maxDlqRetention: "30 days",
    maxLogsRetention: "14 days",
    maxSchedules: 10_000,
    maxSchedulesNote: "Free up to 10K. Beyond that, $0.01 per active schedule.",
    maxQueueCount: 1000,
    maxQueueParallelism: 10,
    maxParallelism: 200,
    uptimeSLA: "with-prod-pack",
    encryptionAtRest: "with-prod-pack",
    soc2: "with-prod-pack",
    sso: false,
    prometheus: "with-prod-pack",
    datadog: "with-prod-pack",
    communitySupport: true,
    emailSupport: true,
    dedicatedSupport: false,
  },
  {
    id: "fixed-10m",
    name: "Fixed 10M",
    type: "fixed",
    description: "For businesses with consistent high-capacity loads and predictable costs.",
    priceDisplay: "$420",
    priceSubtext: "/ month",
    monthlyPrice: 420,
    messagePrice: "Included",
    bandwidthPrice: "Included (up to 5 TB/month)",
    maxMessagesPerDay: "10M",
    maxBandwidth: "5 TB",
    maxBandwidthNote: "We'll reach out for an upgrade if quota is exceeded consistently.",
    maxMessageSize: "50 MB",
    maxUrlGroups: 2000,
    maxEndpointsPerGroup: 2000,
    maxDelay: "Unlimited",
    maxHttpResponseDuration: "12 hours",
    maxDlqRetention: "3 months",
    maxLogsRetention: "14 days",
    maxSchedules: 50_000,
    maxSchedulesNote: "Free up to 50K. Beyond that, $0.01 per active schedule.",
    maxQueueCount: 1000,
    maxQueueParallelism: 10,
    maxParallelism: 1000,
    uptimeSLA: "with-prod-pack",
    encryptionAtRest: "with-prod-pack",
    soc2: "with-prod-pack",
    sso: false,
    prometheus: "with-prod-pack",
    datadog: "with-prod-pack",
    communitySupport: true,
    emailSupport: true,
    dedicatedSupport: false,
  },
];

export const QSTASH_ENTERPRISE_PLAN: QStashPlan = {
  id: "enterprise",
  name: "Enterprise",
  type: "enterprise",
  description: "Custom plans for high-volume and compliance-sensitive workloads.",
  priceDisplay: "Custom",
  priceSubtext: "",
  monthlyPrice: null,
  messagePrice: "Custom",
  bandwidthPrice: "Custom",
  maxMessagesPerDay: "100M+",
  maxBandwidth: "Unlimited",
  maxBandwidthNote: null,
  maxMessageSize: "Custom",
  maxUrlGroups: "Custom",
  maxEndpointsPerGroup: "Custom",
  maxDelay: "Custom",
  maxHttpResponseDuration: "Custom",
  maxDlqRetention: "Custom",
  maxLogsRetention: "Custom",
  maxSchedules: "Custom",
  maxSchedulesNote: null,
  maxQueueCount: "Custom",
  maxQueueParallelism: "Custom",
  maxParallelism: "Custom",
  uptimeSLA: true,
  encryptionAtRest: true,
  soc2: true,
  sso: true,
  prometheus: true,
  datadog: true,
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: true,
};

export const QSTASH_ALL_PLANS: QStashPlan[] = [
  QSTASH_FREE_PLAN,
  QSTASH_PAYG_PLAN,
  ...QSTASH_FIXED_PLANS,
  QSTASH_ENTERPRISE_PLAN,
];

export const QSTASH_FAQ = qstashFaqJson.faq;
