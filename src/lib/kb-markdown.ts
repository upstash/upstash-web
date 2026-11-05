import { ASK_NOTE } from "@/lib/context7-ask";
import { KB_DESCRIPTION, kbExcerpt, topicName, type KbArticle } from "@/lib/kb";
import { SITE_URL } from "@/utils/const";

const day = (iso: string) => iso.slice(0, 10);

// ByDefault is down and nothing is cached: tell agents to come back.
export function kbUnavailable(): Response {
  return new Response(
    `# Knowledge base unavailable\n\nTry again in a minute, or read the blog: ${SITE_URL}/blog.md\n`,
    {
      status: 503,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
        "Retry-After": "60",
      },
    },
  );
}

export function renderKbIndex(articles: KbArticle[]): string {
  return [
    "# Upstash Knowledge Base",
    "",
    `> **Source:** ${SITE_URL}/kb`,
    "> **Format:** text/markdown, machine-readable index for agents and LLMs",
    "",
    "---",
    "",
    articles.length > 0
      ? `${KB_DESCRIPTION} Every article is also available as markdown at its URL plus \`.md\`.`
      : `${KB_DESCRIPTION} Nothing here yet; the blog has everything we've written so far: ${SITE_URL}/blog.md`,
    "",
    ASK_NOTE,
    "",
    "## Articles",
    "",
    ...articles.flatMap((article) => {
      const excerpt = kbExcerpt(article);
      return [
        `### [${article.title}](${SITE_URL}/kb/${article.slug})`,
        "",
        `**Date:** ${day(article.publishedAt)}  `,
        ...(article.topic ? [`**Topic:** ${topicName(article.topic.name)}`] : []),
        "",
        ...(excerpt ? [excerpt, ""] : []),
      ];
    }),
  ].join("\n");
}

export function renderKbArticle(article: KbArticle): string {
  const authors = article.authors.map((author) => author.name).join(", ");
  const updated = day(article.updatedAt);
  return [
    `# ${article.title}`,
    "",
    `> **Source:** ${SITE_URL}/kb/${article.slug}`,
    `> **Date:** ${day(article.publishedAt)}`,
    ...(updated !== day(article.publishedAt)
      ? [`> **Updated:** ${updated}`]
      : []),
    ...(authors ? [`> **Author(s):** ${authors}`] : []),
    ...(article.topic
      ? [`> **Topic:** ${topicName(article.topic.name)}`]
      : []),
    "> **Format:** text/markdown, machine-readable content for agents and LLMs",
    "",
    ...(article.description ? [article.description, ""] : []),
    "---",
    "",
    article.content.trim(),
    "",
    "---",
    "",
    ASK_NOTE,
    "",
  ].join("\n");
}
