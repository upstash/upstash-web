import { ASK_NOTE } from "@/lib/context7-ask";
import { KB_DESCRIPTION, kbExcerpt, topicName, type KbArticle } from "@/lib/kb";
import { SITE_URL } from "@/utils/const";

const day = (iso: string) => iso.slice(0, 10);

export function renderKbIndex(articles: KbArticle[]): string {
  return [
    "# Upstash Knowledge Base",
    "",
    `> **Source:** ${SITE_URL}/kb`,
    "> **Format:** text/markdown, machine-readable index for agents and LLMs",
    "",
    "---",
    "",
    `${KB_DESCRIPTION} ${articles.length} articles. Every article is also available as markdown at its URL plus \`.md\`.`,
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
