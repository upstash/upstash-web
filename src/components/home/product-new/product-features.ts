import { Product } from "@/utils/type";

export interface ProductTagline {
  title: string;
  docsLink: string;
  consoleLink: string;
}

/**
 * Taglines shown above the active product tab. Shared source of truth for the
 * visible tab header and the crawlable sr-only mirror (product-seo-data.tsx).
 */
export const PRODUCT_TAGLINES: Record<Product, ProductTagline> = {
  [Product.REDIS]: {
    title: "Serverless Redis in the cloud with low latency and durable storage",
    docsLink: "https://upstash.com/docs/redis",
    consoleLink: "https://console.upstash.com/redis",
  },
  [Product.VECTOR]: {
    title: "Serverless Vector database for high-performance search at scale",
    docsLink: "https://upstash.com/docs/vector",
    consoleLink: "https://console.upstash.com/vector",
  },
  [Product.QSTASH]: {
    title: "Serverless messaging and scheduling via HTTP",
    docsLink: "https://upstash.com/docs/qstash",
    consoleLink: "https://console.upstash.com/qstash",
  },
  [Product.WORKFLOW]: {
    title: "Durable, reliable and performant serverless functions",
    docsLink: "https://upstash.com/docs/workflow",
    consoleLink: "https://console.upstash.com/workflow",
  },
  [Product.SEARCH]: {
    title: "Serverless AI search at scale",
    docsLink: "https://upstash.com/docs/search",
    consoleLink: "https://console.upstash.com/search",
  },
  [Product.BOX]: {
    title: "Secure cloud containers for AI agents",
    docsLink: "https://upstash.com/docs/box",
    consoleLink: "https://console.upstash.com/box",
  },
  [Product.BLOB]: {
    title: "Serverless object storage with direct browser uploads and a global CDN",
    docsLink: "https://upstash.com/docs/blob",
    consoleLink: "https://console.upstash.com/blob",
  },
};

export interface ProductFeatureGroup {
  /**
   * Title split into lines. The visible tab joins them with a responsive
   * `<br>`; the sr-only mirror joins them with a space.
   */
  title: string[];
  bullets: string[];
}

/**
 * Feature copy for each product tab. Both the visible interactive tab
 * (hero-tab-*.tsx) and the crawlable sr-only mirror (product-seo-data.tsx)
 * render from this single source, so search engines and AI crawlers see every
 * product's content even though the UI only renders the active tab.
 *
 * Keep the product order aligned with the tabs in hero-products.tsx.
 */
export const PRODUCT_FEATURES: Record<
  | Product.REDIS
  | Product.VECTOR
  | Product.QSTASH
  | Product.WORKFLOW
  | Product.BOX
  | Product.BLOB,
  ProductFeatureGroup[]
> = {
  [Product.REDIS]: [
    {
      title: ["Highly Available,", "Infinitely Scalable"],
      bullets: [
        "99.99% uptime guarantee",
        "Automatic scaling to meet your demands",
        "No server management required",
      ],
    },
    {
      title: ["Global", "Low Latency"],
      bullets: [
        "Lightning-fast response times worldwide",
        "Multi-region replication options",
        "Optimize for your users, wherever they are",
      ],
    },
    {
      title: ["Persistent Redis,", "In-Memory Speed"],
      bullets: [
        "In-memory speed with disk-like persistence",
        "Data safety without sacrificing performance",
        "Automatic backups",
      ],
    },
  ],
  [Product.VECTOR]: [
    {
      title: ["Massive", "Scalability"],
      bullets: [
        "Handle hundreds of millions of vectors",
        "Seamless scaling as your data grows",
        "Maintain performance at any scale",
      ],
    },
    {
      title: ["Disk-Based", "Algorithm for Efficiency"],
      bullets: [
        "Optimize storage and performance",
        "Cost-effective solution for large datasets",
        "Balance between speed and resource usage",
      ],
    },
    {
      title: ["Powerful Metadata", "Store with SQL Support"],
      bullets: [
        "Rich querying capabilities with familiar SQL syntax",
        "Easily combine vector similarity search with metadata filtering",
        "Flexible data organization and retrieval",
      ],
    },
  ],
  [Product.QSTASH]: [
    {
      title: ["Serverless", "Messaging"],
      bullets: [
        "Effortless communication between serverless functions",
        "Decouple your microservices architecture",
        "Scale your messaging infrastructure without limits",
      ],
    },
    {
      title: ["Scheduled Tasks", "with CRON"],
      bullets: [
        "Easily set up recurring tasks and jobs",
        "Flexible scheduling with CRON syntax",
        "Automate your workflows with precision",
      ],
    },
    {
      title: ["Intelligent", "Retry Mechanism"],
      bullets: [
        "Automatically retry failed tasks",
        "Ensure task completion in unreliable environments",
        "Configurable retry policies to suit your needs",
      ],
    },
  ],
  [Product.WORKFLOW]: [
    {
      title: ["Serverless", "Function Orchestration"],
      bullets: [
        "Coordinate complex serverless workflows",
        "Integrate and manage multiple functions with ease",
        "Streamline your serverless architecture",
      ],
    },
    {
      title: ["Eliminate", "Function Timeouts"],
      bullets: [
        "Execute long-running processes without constraints",
        "No more arbitrary time limits on your operations",
        "Focus on your logic, not on timing workarounds",
      ],
    },
    {
      title: ["Automatic", "Error Recovery"],
      bullets: [
        "Built-in resilience for your workflows",
        "Automatically retry failed steps",
        "Ensure robust execution even in unpredictable environments",
      ],
    },
  ],
  [Product.BOX]: [
    {
      title: ["Built for AI Agents"],
      bullets: [
        "Secure, isolated cloud containers",
        "Built-in Claude Code and Codex agents",
        "Full shell, filesystem, and git access",
      ],
    },
    {
      title: ["Durable & Persistent"],
      bullets: [
        "Infinite lifespan with auto freeze/resume",
        "Persistent storage across sessions",
        "Usage-based pricing, pay only when active",
      ],
    },
    {
      title: ["Scales Seamlessly"],
      bullets: [
        "Serverless, no infrastructure to manage",
        "Scale to hundreds of boxes instantly",
        "Multi-agent orchestration support",
      ],
    },
  ],
  [Product.BLOB]: [
    {
      title: ["Global CDN,", "No Regions"],
      bullets: [
        "Every file replicated to a CDN worldwide",
        "Public buckets get a URL out of the box",
        "One rate sheet, no cross-region fees",
      ],
    },
    {
      title: ["Direct Browser", "Uploads"],
      bullets: [
        "Bytes go straight to storage, never through your server",
        "Multipart uploads with pause, resume and retry",
        "Typed React hooks and server-enforced limits",
      ],
    },
    {
      title: ["S3 Compatible,", "Simple Billing"],
      bullets: [
        "Works with the AWS SDK and any S3 tool",
        "Public or private buckets with signed URLs",
        "Pay for storage, operations and egress only",
      ],
    },
  ],
};
