/**
 * Product landing pages (`/<slug>`) that also have a markdown version at
 * `/<slug>.md`. Kept free of page content so the proxy can import it cheaply.
 */
export const PRODUCT_PAGE_SLUGS = [
  "redis",
  "vector",
  "qstash",
  "workflow",
  "box",
  "blob",
] as const;

export type ProductPage = (typeof PRODUCT_PAGE_SLUGS)[number];
