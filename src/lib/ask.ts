import { SITE_URL } from "@/utils/const";
import ASK_EXAMPLES from "./ask-examples.json";

/** "How is Redis priced?" -> "how-is-redis-priced" */
export function questionToSlug(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "does-upstash-redis-have-a-rust-sdk" -> "does upstash redis have a rust sdk" */
export function slugToQuestion(slug: string): string {
  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    // malformed escape sequence: fall back to the raw slug
  }
  return decoded.replace(/[-_+/\s]+/g, " ").trim();
}

export function askUrl(question: string): string {
  return `${SITE_URL}/ask/${questionToSlug(question)}`;
}

export const ASK_MARKDOWN_LINE = [
  `> **Ask:** Use ${SITE_URL}/ask/your-question (any words, hyphen-separated) to search the Upstash answer index (docs, pricing, blog, product pages). Returns relevant pages with title, text, url, and publishedAt.`,
  `>`,
  `> Examples:`,
  ...ASK_EXAMPLES.map((question) => `> ${askUrl(question)}`),
].join("\n");

export function notFoundMarkdown(): string {
  return [
    "# 404 Not Found",
    "",
    "This page does not exist.",
    "",
    "To find something specific on this site (products, pricing, limits, blog posts), ask it directly:",
    `${ASK_MARKDOWN_LINE}`,
    "",
    "Other entry points:",
    "",
    `- ${SITE_URL}/llms.txt`,
    `- ${SITE_URL}/docs`,
    `- ${SITE_URL}/blog.md`,
    "",
  ].join("\n");
}
