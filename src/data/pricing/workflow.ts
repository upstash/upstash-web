import workflowFaqJson from "../../../public/faq/workflow.json";

export interface WorkflowPlan {
  id: string;
  name: string;
  type: "free" | "payg" | "fixed" | "enterprise";
  description: string;
  priceDisplay: string;
  priceSubtext: string;
  monthlyPrice: number | null;
  stepPrice: string | null;

  // Capacity (Workflow is built on QStash; limits mirror QStash)
  maxStepsPerDay: string;
  maxBandwidth: string;
  maxBandwidthNote: string | null;
  maxMessageSize: string;
  maxDelay: string;
  maxHttpResponseDuration: string;
  maxDlqRetention: string;
  maxSchedules: number | string;
  maxSchedulesNote: string | null;
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

export const WORKFLOW_FREE_PLAN: WorkflowPlan = {
  id: "free",
  name: "Free",
  type: "free",
  description: "Perfect for prototypes and hobby projects.",
  priceDisplay: "$0",
  priceSubtext: "-",
  monthlyPrice: 0,
  stepPrice: "Free",
  maxStepsPerDay: "1,000",
  maxBandwidth: "50 GB",
  maxBandwidthNote: null,
  maxMessageSize: "1 MB",
  maxDelay: "7 days",
  maxHttpResponseDuration: "15 minutes",
  maxDlqRetention: "3 days",
  maxSchedules: 10,
  maxSchedulesNote: null,
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

export const WORKFLOW_PAYG_PLAN: WorkflowPlan = {
  id: "payg",
  name: "Pay as You Go",
  type: "payg",
  description: "For use cases with bursting traffic.",
  priceDisplay: "$1",
  priceSubtext: "per 100K steps",
  monthlyPrice: null,
  stepPrice: "$1 per 100K steps",
  maxStepsPerDay: "Unlimited",
  maxBandwidth: "50 GB",
  maxBandwidthNote: "Free up to 50 GB/month. Beyond that, $0.05 per GB.",
  maxMessageSize: "10 MB",
  maxDelay: "1 year",
  maxHttpResponseDuration: "2 hours",
  maxDlqRetention: "7 days",
  maxSchedules: 1000,
  maxSchedulesNote: "Free up to 1,000. Beyond that, $0.01 per active schedule.",
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

export const WORKFLOW_FIXED_PLANS: WorkflowPlan[] = [
  {
    id: "fixed-1m",
    name: "Fixed 1M",
    type: "fixed",
    description: "For businesses with consistent high-capacity loads and predictable costs.",
    priceDisplay: "$180",
    priceSubtext: "/ month",
    monthlyPrice: 180,
    stepPrice: "Included",
    maxStepsPerDay: "1M",
    maxBandwidth: "1 TB",
    maxBandwidthNote: "We'll reach out for an upgrade if quota is exceeded consistently.",
    maxMessageSize: "50 MB",
    maxDelay: "Unlimited",
    maxHttpResponseDuration: "6 hours",
    maxDlqRetention: "30 days",
    maxSchedules: 10_000,
    maxSchedulesNote: "Free up to 10K. Beyond that, $0.01 per active schedule.",
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
    stepPrice: "Included",
    maxStepsPerDay: "10M",
    maxBandwidth: "5 TB",
    maxBandwidthNote: "We'll reach out for an upgrade if quota is exceeded consistently.",
    maxMessageSize: "50 MB",
    maxDelay: "Unlimited",
    maxHttpResponseDuration: "12 hours",
    maxDlqRetention: "3 months",
    maxSchedules: 50_000,
    maxSchedulesNote: "Free up to 50K. Beyond that, $0.01 per active schedule.",
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

export const WORKFLOW_ENTERPRISE_PLAN: WorkflowPlan = {
  id: "enterprise",
  name: "Enterprise",
  type: "enterprise",
  description: "Custom plans for high-volume and compliance-sensitive workloads.",
  priceDisplay: "Custom",
  priceSubtext: "",
  monthlyPrice: null,
  stepPrice: "Custom",
  maxStepsPerDay: "Unlimited",
  maxBandwidth: "Unlimited",
  maxBandwidthNote: null,
  maxMessageSize: "Custom",
  maxDelay: "Unlimited",
  maxHttpResponseDuration: "Custom",
  maxDlqRetention: "Custom",
  maxSchedules: "Custom",
  maxSchedulesNote: null,
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

export const WORKFLOW_ALL_PLANS: WorkflowPlan[] = [
  WORKFLOW_FREE_PLAN,
  WORKFLOW_PAYG_PLAN,
  ...WORKFLOW_FIXED_PLANS,
  WORKFLOW_ENTERPRISE_PLAN,
];

export const WORKFLOW_FAQ = workflowFaqJson.faq;
