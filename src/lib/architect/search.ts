import type { Citation, ProductRecommendation } from "./types";

/**
 * "How to wire it up" citations for each recommended product.
 *
 * Read-only by design (doc §3 stage 5, §6.6). Currently returns curated Upstash doc links so
 * the feature works with zero extra configuration; swap `citationsFor` for an Upstash Search
 * query over indexed docs when a Search index is provisioned — the return shape is unchanged.
 */

const DOCS: Record<string, Citation> = {
  Redis: {
    product: "Redis",
    title: "Get started with Upstash Redis",
    url: "https://upstash.com/docs/redis/overall/getstarted",
  },
  Vector: {
    product: "Vector",
    title: "Get started with Upstash Vector",
    url: "https://upstash.com/docs/vector/overall/getstarted",
  },
  QStash: {
    product: "QStash",
    title: "Get started with Upstash QStash",
    url: "https://upstash.com/docs/qstash/overall/getstarted",
  },
  Search: {
    product: "Search",
    title: "What is Upstash Search?",
    url: "https://upstash.com/docs/search/overall/whatisupstashsearch",
  },
  Workflow: {
    product: "Workflow",
    title: "Get started with Upstash Workflow",
    url: "https://upstash.com/docs/workflow/getstarted",
  },
};

export function citationsFor(products: ProductRecommendation[]): Citation[] {
  return products
    .map((p) => DOCS[p.product])
    .filter((c): c is Citation => Boolean(c));
}
