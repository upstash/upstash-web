import { SITE_URL } from "@/utils/const";

export const ASK_URL = `${SITE_URL}/ask?q=your+question`;
export const ASK_EXAMPLE = `${SITE_URL}/ask?q=how+is+qstash+priced`;

export const ASK_MARKDOWN_LINE = `> **Ask:** ${ASK_URL} searches this site in natural language and returns the best matching sections as JSON (title, text, url, publishedAt). Example: ${ASK_EXAMPLE}`;

export function notFoundMarkdown(): string {
  return [
    "# 404 Not Found",
    "",
    "This page does not exist.",
    "",
    "To find something specific on this site (products, pricing, limits, blog posts), ask it directly:",
    "",
    `    ${ASK_URL}`,
    "",
    `Example: ${ASK_EXAMPLE}`,
    "",
    "The response is JSON: the best matching page sections with title, text, kind, url and publishedAt.",
    "",
    "Other entry points:",
    "",
    `- ${SITE_URL}/llms.txt`,
    `- ${SITE_URL}/docs`,
    `- ${SITE_URL}/blog.md`,
    "",
  ].join("\n");
}
