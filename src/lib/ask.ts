import { SITE_URL } from "@/utils/const";

const ASK_EXAMPLES = [
  "how is redis priced",
  "how is upstash box priced",
  "what is the redis free tier",
  "compare upstash redis to elasticache",
  "does upstash support hipaa",
  "what regions does upstash support",
  "how to use upstash with vercel",
  "how to use upstash from cloudflare workers",
];

function askUrl(question: string): string {
  return `${SITE_URL}/ask?q=${question.replace(/ /g, "+")}`;
}

export const ASK_MARKDOWN_LINE = [
  `> **Ask:** Use ${SITE_URL}/ask?q=your+question to search the Upstash answer index (docs, pricing, blog, product pages). Returns relevant pages with title, text, url, and publishedAt.`,
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
