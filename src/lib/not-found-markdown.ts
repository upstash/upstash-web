import { SITE_URL } from "@/utils/const";

export function notFoundMarkdown(): string {
  return [
    "# 404 Not Found",
    "",
    "This page does not exist.",
    "",
    "Entry points:",
    "",
    `- ${SITE_URL}/llms.txt`,
    `- ${SITE_URL}/sitemap.xml`,
    `- ${SITE_URL}/docs`,
    `- ${SITE_URL}/blog.md`,
    "",
  ].join("\n");
}
