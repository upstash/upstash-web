export enum Product {
  REDIS = "Redis",
  KAFKA = "Kafka",
  QSTASH = "QStash",
}

export enum CodeExample {
  lib = "@upstash/redis",
  fetch = "JavaScript (Fetch)",
}

export type Example = {
  id: string;
  githubUrl: string;
  title: string;
  products: ("redis" | "kafka" | "qstash")[];
  stack: string[];
  useCases: string[];
  author: string;
  body: string;
  blogUrl: string;
  previewUrl: string;
};

export enum PricingPlans {
  Free = "free",
  PayAsYouGo = "payAsYouGo",
  Pro2K = "pro2k",
  Pro10K = "pro10k",
  Enterprise = "enterprise",
}
