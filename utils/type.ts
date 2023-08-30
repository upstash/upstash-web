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
