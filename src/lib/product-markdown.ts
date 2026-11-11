import * as blob from "@/app/blob/content";
import { BLOB_FAQ } from "@/app/blob/faq";
import * as box from "@/app/box/content";
import { BOX_FAQ } from "@/app/box/faq";
import * as qstash from "@/app/qstash/content";
import { QSTASH_FAQ } from "@/app/qstash/faq";
import * as redis from "@/app/redis/content";
import { REDIS_FAQ } from "@/app/redis/faq";
import * as vector from "@/app/vector/content";
import { VECTOR_FAQ } from "@/app/vector/faq";
import * as workflow from "@/app/workflow/content";
import { WORKFLOW_FAQ } from "@/app/workflow/faq";
import { ASK_NOTE } from "@/lib/context7-ask";
import type { ProductPage } from "@/lib/product-pages";
import { SITE_URL } from "@/utils/const";
import { isValidElement, type ReactNode } from "react";

type ProductContent = typeof redis;

const PRODUCT_PAGES = {
  redis: { name: "Redis", content: redis, faq: REDIS_FAQ },
  vector: { name: "Vector", content: vector, faq: VECTOR_FAQ },
  qstash: { name: "QStash", content: qstash, faq: QSTASH_FAQ },
  workflow: { name: "Workflow", content: workflow, faq: WORKFLOW_FAQ },
  box: { name: "Box", content: box, faq: BOX_FAQ },
  blob: { name: "Blob", content: blob, faq: BLOB_FAQ },
} satisfies Record<
  ProductPage,
  {
    name: string;
    content: ProductContent;
    faq: { question: string; answer: string }[];
  }
>;

/**
 * Flattens the JSX copy in a product's content.tsx to markdown. Only the
 * elements the copy uses are mapped: <strong>, <code>, <p> and layout spans.
 */
function toMarkdown(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(toMarkdown).join("");
  }
  if (!isValidElement<{ children?: ReactNode; className?: string }>(node)) {
    return "";
  }

  const inner = toMarkdown(node.props.children);
  switch (node.type) {
    case "strong":
      return `**${inner}**`;
    case "code":
      return `\`${inner}\``;
    case "p":
      return `${inner}\n\n`;
    case "span":
      // Block spans are separate heading lines with no space between them.
      return node.props.className?.includes("block") ? ` ${inner} ` : inner;
    default:
      return inner;
  }
}

/** Collapses JSX source whitespace while keeping paragraph breaks. */
function text(node: ReactNode): string {
  return toMarkdown(node)
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Markdown representation of a product landing page, served when a client asks
 * for `text/markdown` on `/<product>` (or fetches `/<product>.md`).
 */
export function renderProductPage(slug: ProductPage): string {
  const { name, content, faq } = PRODUCT_PAGES[slug];
  const { HERO, FEATURES, USE_CASES, WHAT_IS, CTA } = content;
  const pricingUrl = `${SITE_URL}${HERO.pricingHref}`;

  return [
    `# Upstash ${name}: ${text(HERO.title)}`,
    "",
    `> **Source:** ${SITE_URL}/${slug}`,
    "> **Format:** text/markdown — machine-readable product page for agents and LLMs",
    "",
    text(HERO.description),
    "",
    `- ${HERO.primaryAction.label}: ${HERO.primaryAction.href}`,
    `- Documentation: ${HERO.docsHref}`,
    `- Pricing: ${pricingUrl} (markdown: ${pricingUrl}.md)`,
    "",
    `## ${text(FEATURES.title)}`,
    "",
    text(FEATURES.description),
    "",
    ...FEATURES.items.map(({ title, desc }) => `- **${title}:** ${desc}`),
    "",
    `## ${text(USE_CASES.title)}`,
    "",
    text(USE_CASES.description),
    "",
    ...USE_CASES.items.map(
      ({ title, desc, href }) => `- [${title}](${href}): ${desc}`,
    ),
    "",
    `## ${text(WHAT_IS.title)}`,
    "",
    `_${text(WHAT_IS.description)}_`,
    "",
    text(WHAT_IS.children),
    "",
    "## Frequently asked questions",
    "",
    ...faq.flatMap(({ question, answer }) => [
      `### ${question}`,
      "",
      answer,
      "",
    ]),
    `## ${text(CTA.title)}`,
    "",
    text(CTA.description),
    "",
    `- ${CTA.primaryAction.label}: ${CTA.primaryAction.href}`,
    `- View pricing: ${SITE_URL}${CTA.pricingHref}`,
    "",
    "---",
    "",
    ASK_NOTE,
    "",
  ].join("\n");
}

export function productMarkdownResponse(slug: ProductPage): Response {
  return new Response(renderProductPage(slug), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
