import blobFaqJson from "../../../public/faq/blob.json";

/**
 * Blob is billed on four meters, matching what the backend rolls up hourly and
 * the console renders per bucket:
 *
 * - Storage, on the *monthly average* of the bucket's size, not a peak or a sum.
 * - Simple operations: reads. `GetObject`, `HeadObject`, and the bucket-level
 *   GETs. Same rate whether the byte came from the origin or the CDN.
 * - Advanced operations: everything else. Uploads, copies, lists, multipart.
 *   Deletes are free.
 * - Bandwidth, on bytes in both directions: an upload is billed like a
 *   download, so writing an object costs storage, an advanced operation and
 *   bandwidth.
 *
 * A request that fails on the caller's side (404, 412, 416, 429) is still an
 * operation and is still billed, which is the one part of this a customer does
 * not expect and the FAQ says out loud.
 */

/** The unit rates, kept apart from their labels so the two cannot drift. */
export const BLOB_RATES = {
  storagePerGb: 0.02,
  bandwidthPerGb: 0.02,
  simpleOpsPerMillion: 0.3,
  advancedOpsPerMillion: 4.5,
} as const;

/**
 * The one thing about Blob that belongs on a *pricing* page rather than a
 * product page: every other object store makes you pick a region, and prices
 * the same byte differently depending on which one you picked. There is no
 * region here, so there is one rate sheet and it applies everywhere.
 */
export const BLOB_GLOBAL_NOTE =
  "No region to pick. Every file is replicated to a global CDN, and the rates below apply worldwide.";

export interface BlobMeter {
  key: string;
  label: string;
  /**
   * What the free plan includes each month. A hard cap, not an allowance that
   * carries: past it the bucket stops serving until the window rolls over.
   */
  freeIncluded: string;
  /**
   * The pay-as-you-go rate. Pay-as-you-go includes nothing, so this is billed
   * from the first byte and the first operation — there is deliberately no
   * `paygIncluded` counterpart to `freeIncluded`.
   */
  rate: string;
  tooltip: string;
  /**
   * Whether the plan cards show this meter. The compare table always shows all
   * four; the cards are a headline, so they carry what a reader sizes a bucket
   * by and leave the operation meters to the table.
   */
  showOnCard: boolean;
}

/**
 * Row order follows the meters as the backend reports them: what you store,
 * what you do to it, and what leaves.
 */
export const BLOB_METERS: BlobMeter[] = [
  {
    key: "storage",
    label: "Storage",
    freeIncluded: "1 GB / month",
    rate: `$${BLOB_RATES.storagePerGb.toFixed(2)} per GB`,
    tooltip:
      "Measured on the monthly average of your bucket size, not its peak.",
    showOnCard: true,
  },
  {
    key: "simple-ops",
    label: "Simple Operations",
    freeIncluded: "First 10,000",
    rate: `$${BLOB_RATES.simpleOpsPerMillion.toFixed(2)} per 1M`,
    tooltip:
      "Reads: downloads, HEAD requests and bucket-level GETs. Same rate from origin or CDN.",
    showOnCard: false,
  },
  {
    key: "advanced-ops",
    label: "Advanced Operations",
    freeIncluded: "First 2,000",
    rate: `$${BLOB_RATES.advancedOpsPerMillion.toFixed(2)} per 1M`,
    tooltip:
      "Uploads, copies, renames, listings and each multipart part. Deletes are free.",
    showOnCard: false,
  },
  {
    key: "bandwidth",
    label: "Bandwidth",
    freeIncluded: "First 10 GB",
    rate: `$${BLOB_RATES.bandwidthPerGb.toFixed(2)} per GB`,
    tooltip:
      "Bytes moved in or out of the bucket. Uploads and downloads are billed alike.",
    showOnCard: true,
  },
];

export interface BlobPlan {
  id: string;
  name: string;
  type: "free" | "payg";
  description: string;
  priceDisplay: string;
  priceSubtext: string;
}

export const BLOB_FREE_PLAN: BlobPlan = {
  id: "free",
  name: "Free",
  type: "free",
  description: "Perfect for prototypes and hobby projects.",
  priceDisplay: "$0",
  priceSubtext: "-",
};

export const BLOB_PAYG_PLAN: BlobPlan = {
  id: "payg",
  name: "Pay as You Go",
  type: "payg",
  description: "For production workloads that scale with your traffic.",
  priceDisplay: `$${BLOB_RATES.storagePerGb.toFixed(2)}`,
  priceSubtext: "per GB stored / month",
};

export const BLOB_ALL_PLANS: BlobPlan[] = [BLOB_FREE_PLAN, BLOB_PAYG_PLAN];

/** The subset the plan cards render; see `showOnCard`. */
export const BLOB_CARD_METERS = BLOB_METERS.filter((meter) => meter.showOnCard);

/** What a meter shows for a given plan: a cap on free, a rate on payg. */
export const blobMeterValue = (meter: BlobMeter, plan: BlobPlan) =>
  plan.type === "free" ? meter.freeIncluded : meter.rate;

export const BLOB_FAQ = blobFaqJson.faq;
