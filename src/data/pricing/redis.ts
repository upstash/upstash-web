import redisFaqJson from "../../../public/faq/redis.json";

export type FeatureAvailability = boolean | "with-prod-pack" | "coming-soon";

export interface RedisPlan {
  id: string;
  name: string;
  type: "free" | "payg" | "fixed" | "enterprise";
  description: string;

  // Card display
  priceDisplay: string;
  priceSubtext: string;

  // Detailed pricing
  monthlyPrice: number | null;
  readRegionPrice: number | null;
  requestPrice: string | null;
  storagePrice: string | null;
  bandwidthPrice: string | null;

  // Capacity
  dataSize: string;
  monthlyCommands: string | null;
  maxBandwidth: string;
  maxBandwidthNote: string | null;
  maxCommandsPerSec: number | "custom";
  maxRequestSize: string;
  maxRequestSizeUpgrades: string | null;
  maxRecordSize: string;
  maxRecordSizeUpgrades: string | null;
  maxIndexCount: number | "custom";
  maxIndexCountNote: string | null;
  maxDocumentsPerIndex: string;
  maxDocumentsPerIndexNote: string | null;
  maxDatabases: number | "custom";
  maxDatabasesNote: string | null;

  // Platforms & features
  platforms: string[];
  persistence: boolean;
  restApi: boolean;
  globalReplication: boolean;
  globalReplicationNote: string | null;
  strongConsistency: FeatureAvailability;
  highAvailability: string;
  multiZoneHA: FeatureAvailability;
  uptimeSLA: FeatureAvailability;

  // Security
  tlsEncryption: boolean;
  ipAllowlist: boolean;
  acl: boolean;
  encryptionAtRest: FeatureAvailability;
  soc2: FeatureAvailability;
  privateLink: boolean;
  sso: boolean;
  hipaa: boolean;

  // Observability
  grafana: FeatureAvailability;
  datadog: FeatureAvailability;
  newRelic: FeatureAvailability;
  accessLogging: boolean;

  // Support
  communitySupport: boolean;
  emailSupport: boolean;
  dedicatedSupport: boolean;
}

const PAID_FIXED_BASE: Omit<
  RedisPlan,
  | "id"
  | "name"
  | "type"
  | "description"
  | "priceDisplay"
  | "priceSubtext"
  | "monthlyPrice"
  | "readRegionPrice"
  | "dataSize"
  | "maxBandwidth"
  | "maxCommandsPerSec"
  | "maxRequestSize"
  | "maxRecordSize"
  | "maxIndexCount"
  | "maxDocumentsPerIndex"
> = {
  monthlyCommands: null,
  maxBandwidthNote:
    "Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.",
  maxRequestSizeUpgrades: null,
  maxRecordSizeUpgrades: null,
  maxIndexCountNote: null,
  maxDocumentsPerIndexNote: null,
  maxDatabases: 100,
  maxDatabasesNote: "First 10 free, $0.5 per database after.",
  requestPrice: null,
  storagePrice: null,
  bandwidthPrice: null,
  platforms: ["AWS", "GCP", "Vercel"],
  persistence: true,
  restApi: true,
  globalReplication: true,
  globalReplicationNote: null,
  strongConsistency: false,
  highAvailability: "Primary Replicas (Read Replicas available with Prod Pack)",
  multiZoneHA: "with-prod-pack",
  uptimeSLA: "with-prod-pack",
  tlsEncryption: true,
  ipAllowlist: true,
  acl: true,
  encryptionAtRest: "with-prod-pack",
  soc2: "with-prod-pack",
  privateLink: false,
  sso: false,
  hipaa: false,
  grafana: "with-prod-pack",
  datadog: "with-prod-pack",
  newRelic: "with-prod-pack",
  accessLogging: false,
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const REDIS_FREE_PLAN: RedisPlan = {
  id: "free",
  name: "Free",
  type: "free",
  description: "Perfect for prototypes and hobby projects.",
  priceDisplay: "$0",
  priceSubtext: "-",
  monthlyPrice: 0,
  readRegionPrice: null,
  requestPrice: "Free",
  storagePrice: "Free",
  bandwidthPrice: "Free",
  dataSize: "256 MB",
  monthlyCommands: "500K",
  maxBandwidth: "10 GB",
  maxBandwidthNote: null,
  maxCommandsPerSec: 10_000,
  maxRequestSize: "10 MB",
  maxRequestSizeUpgrades: null,
  maxRecordSize: "100 MB",
  maxRecordSizeUpgrades: null,
  maxIndexCount: 1,
  maxIndexCountNote: null,
  maxDocumentsPerIndex: "10K",
  maxDocumentsPerIndexNote: null,
  maxDatabases: 1,
  maxDatabasesNote: null,
  platforms: ["AWS", "GCP", "Vercel"],
  persistence: true,
  restApi: true,
  globalReplication: true,
  globalReplicationNote: "Free tier allows max one read replica.",
  strongConsistency: false,
  highAvailability: "Primary Replicas",
  multiZoneHA: false,
  uptimeSLA: false,
  tlsEncryption: true,
  ipAllowlist: false,
  acl: false,
  encryptionAtRest: false,
  soc2: false,
  privateLink: false,
  sso: false,
  hipaa: false,
  grafana: false,
  datadog: false,
  newRelic: false,
  accessLogging: false,
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const REDIS_PAYG_PLAN: RedisPlan = {
  id: "payg",
  name: "Pay as You Go",
  type: "payg",
  description: "Flexible pricing for variable traffic.",
  priceDisplay: "$0.2",
  priceSubtext: "per 100K commands",
  monthlyPrice: null,
  readRegionPrice: null,
  requestPrice: "$0.20 per 100K commands",
  storagePrice: "$0.25 per GB (first 1 GB free)",
  bandwidthPrice: "Free up to 200 GB/month, then $0.03/GB",
  dataSize: "100 GB",
  monthlyCommands: null,
  maxBandwidth: "Unlimited",
  maxBandwidthNote: "Free up to 200 GB/month. Beyond that, $0.03 per GB.",
  maxCommandsPerSec: 10_000,
  maxRequestSize: "10 MB",
  maxRequestSizeUpgrades: "50 MB for $80/month, 100 MB for $120/month",
  maxRecordSize: "100 MB",
  maxRecordSizeUpgrades:
    "250 MB for $60/month, 500 MB for $100/month, 1 GB for $180/month",
  maxIndexCount: 10,
  maxIndexCountNote: "Default quota. Request an increase anytime.",
  maxDocumentsPerIndex: "1M",
  maxDocumentsPerIndexNote: "Default quota. Request an increase anytime.",
  maxDatabases: 100,
  maxDatabasesNote: "First 10 free, $0.5 per database after.",
  platforms: ["AWS", "GCP", "FLY", "Vercel"],
  persistence: true,
  restApi: true,
  globalReplication: true,
  globalReplicationNote: null,
  strongConsistency: false,
  highAvailability: "Primary Replicas (Read Replicas available with Prod Pack)",
  multiZoneHA: "with-prod-pack",
  uptimeSLA: "with-prod-pack",
  tlsEncryption: true,
  ipAllowlist: true,
  acl: true,
  encryptionAtRest: "with-prod-pack",
  soc2: "with-prod-pack",
  privateLink: false,
  sso: false,
  hipaa: false,
  grafana: "with-prod-pack",
  datadog: "with-prod-pack",
  newRelic: "with-prod-pack",
  accessLogging: false,
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: false,
};

export const REDIS_FIXED_PLANS: RedisPlan[] = [
  {
    ...PAID_FIXED_BASE,
    id: "fixed-250mb",
    name: "Fixed 250MB",
    type: "fixed",
    description: "For consistent loads with predictable costs.",
    priceDisplay: "$10",
    priceSubtext: "/ month",
    monthlyPrice: 10,
    readRegionPrice: 5,
    dataSize: "250 MB",
    maxBandwidth: "50 GB",
    maxCommandsPerSec: 10_000,
    maxRequestSize: "10 MB",
    maxRecordSize: "100 MB",
    maxIndexCount: 2,
    maxDocumentsPerIndex: "100K",
  },
  {
    ...PAID_FIXED_BASE,
    id: "fixed-1gb",
    name: "Fixed 1GB",
    type: "fixed",
    description: "For consistent loads with predictable costs.",
    priceDisplay: "$20",
    priceSubtext: "/ month",
    monthlyPrice: 20,
    readRegionPrice: 10,
    dataSize: "1 GB",
    maxBandwidth: "100 GB",
    maxCommandsPerSec: 10_000,
    maxRequestSize: "10 MB",
    maxRecordSize: "200 MB",
    maxIndexCount: 3,
    maxDocumentsPerIndex: "250K",
  },
  {
    ...PAID_FIXED_BASE,
    id: "fixed-5gb",
    name: "Fixed 5GB",
    type: "fixed",
    description: "For consistent loads with predictable costs.",
    priceDisplay: "$100",
    priceSubtext: "/ month",
    monthlyPrice: 100,
    readRegionPrice: 50,
    dataSize: "5 GB",
    maxBandwidth: "500 GB",
    maxCommandsPerSec: 10_000,
    maxRequestSize: "20 MB",
    maxRecordSize: "300 MB",
    maxIndexCount: 5,
    maxDocumentsPerIndex: "500K",
  },
  {
    ...PAID_FIXED_BASE,
    id: "fixed-10gb",
    name: "Fixed 10GB",
    type: "fixed",
    description: "For consistent loads with predictable costs.",
    priceDisplay: "$200",
    priceSubtext: "/ month",
    monthlyPrice: 200,
    readRegionPrice: 100,
    dataSize: "10 GB",
    maxBandwidth: "1 TB",
    maxCommandsPerSec: 10_000,
    maxRequestSize: "30 MB",
    maxRecordSize: "400 MB",
    maxIndexCount: 10,
    maxDocumentsPerIndex: "1M",
  },
  {
    ...PAID_FIXED_BASE,
    id: "fixed-50gb",
    name: "Fixed 50GB",
    type: "fixed",
    description: "For consistent loads with predictable costs.",
    priceDisplay: "$400",
    priceSubtext: "/ month",
    monthlyPrice: 400,
    readRegionPrice: 200,
    dataSize: "50 GB",
    maxBandwidth: "5 TB",
    maxCommandsPerSec: 10_000,
    maxRequestSize: "50 MB",
    maxRecordSize: "500 MB",
    maxIndexCount: 50,
    maxDocumentsPerIndex: "5M",
  },
  {
    ...PAID_FIXED_BASE,
    id: "fixed-100gb",
    name: "Fixed 100GB",
    type: "fixed",
    description: "For consistent loads with predictable costs.",
    priceDisplay: "$800",
    priceSubtext: "/ month",
    monthlyPrice: 800,
    readRegionPrice: 400,
    dataSize: "100 GB",
    maxBandwidth: "10 TB",
    maxCommandsPerSec: 16_000,
    maxRequestSize: "75 MB",
    maxRecordSize: "1 GB",
    maxIndexCount: 100,
    maxDocumentsPerIndex: "10M",
  },
  {
    ...PAID_FIXED_BASE,
    id: "fixed-500gb",
    name: "Fixed 500GB",
    type: "fixed",
    description: "For consistent loads with predictable costs.",
    priceDisplay: "$1500",
    priceSubtext: "/ month",
    monthlyPrice: 1500,
    readRegionPrice: 750,
    dataSize: "500 GB",
    maxBandwidth: "20 TB",
    maxCommandsPerSec: 16_000,
    maxRequestSize: "100 MB",
    maxRecordSize: "5 GB",
    maxIndexCount: 500,
    maxDocumentsPerIndex: "50M",
  },
];

export const REDIS_ENTERPRISE_PLAN: RedisPlan = {
  id: "enterprise",
  name: "Enterprise",
  type: "enterprise",
  description: "Custom plans for high-volume and compliance-sensitive workloads.",
  priceDisplay: "Custom",
  priceSubtext: "",
  monthlyPrice: null,
  readRegionPrice: null,
  requestPrice: "Custom",
  storagePrice: "Custom",
  bandwidthPrice: "Custom",
  dataSize: "10 TB",
  monthlyCommands: null,
  maxBandwidth: "Unlimited",
  maxBandwidthNote: null,
  maxCommandsPerSec: "custom",
  maxRequestSize: "500 MB",
  maxRequestSizeUpgrades: null,
  maxRecordSize: "5 GB",
  maxRecordSizeUpgrades: null,
  maxIndexCount: "custom",
  maxIndexCountNote: null,
  maxDocumentsPerIndex: "Custom",
  maxDocumentsPerIndexNote: null,
  maxDatabases: "custom",
  maxDatabasesNote: "Unlimited databases included.",
  platforms: ["AWS", "GCP", "FLY", "Vercel"],
  persistence: true,
  restApi: true,
  globalReplication: true,
  globalReplicationNote: null,
  strongConsistency: "coming-soon",
  highAvailability: "Primary and Read Replicas",
  multiZoneHA: true,
  uptimeSLA: true,
  tlsEncryption: true,
  ipAllowlist: true,
  acl: true,
  encryptionAtRest: true,
  soc2: true,
  privateLink: true,
  sso: true,
  hipaa: true,
  grafana: true,
  datadog: true,
  newRelic: true,
  accessLogging: true,
  communitySupport: true,
  emailSupport: true,
  dedicatedSupport: true,
};

export const REDIS_ALL_PLANS: RedisPlan[] = [
  REDIS_FREE_PLAN,
  REDIS_PAYG_PLAN,
  ...REDIS_FIXED_PLANS,
  REDIS_ENTERPRISE_PLAN,
];

export const REDIS_PROD_PACK = {
  description:
    "Prod Pack is an add-on available for any paid plan (Pay as You Go or Fixed). Enable it from your database details page in the Upstash console.",
  features: [
    "Uptime SLA",
    "Multi-Zone High Availability (regions deployed across multiple availability zones, with automatic same-region failover if a zone or replica fails)",
    "SOC 2 Type 2 report",
    "Advanced monitoring (Prometheus, Grafana, Datadog, New Relic)",
    "Role-based access control",
    "Encryption at rest",
  ],
};

export const REDIS_FAQ = redisFaqJson.faq;
