import { allPosts } from "@content";
import { cache } from "react";
import { getApiArticles, type KbArticle } from "./kb-api";

export type { KbArticle, KbAuthor } from "./kb-api";

export const KB_DESCRIPTION =
  "Guides, comparisons and how-tos from the Upstash team.";

export type KbTopic = { id: string; name: string; slug: string };

// Some articles are blog posts too (published to data/blog through GitHub),
// under the same slug or, where the blog renamed the file, the same title.
// The blog is their home: the knowledge base leaves them out and sends
// their addresses there, so no page here is a copy of one on the blog.
const titleKey = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const blogPosts = allPosts.filter((post) => !post.draft);
const blogSlugs = new Set(blogPosts.map((post) => post.slug));
const blogSlugsByTitle = new Map(
  blogPosts.map((post) => [titleKey(post.title), post.slug]),
);

const blogSlugOf = (article: KbArticle) =>
  blogSlugs.has(article.slug)
    ? article.slug
    : (blogSlugsByTitle.get(titleKey(article.title)) ?? null);

// Newest first.
export const getKbArticles = cache(async () =>
  (await getApiArticles()).filter((article) => !blogSlugOf(article)),
);

export async function getKbArticle(slug: string) {
  const articles = await getKbArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

// The blog post /kb/<slug> stands for, when the article is on the blog.
export async function kbBlogSlug(slug: string) {
  const article = (await getApiArticles()).find(
    (article) => article.slug === slug,
  );
  return article ? blogSlugOf(article) : null;
}

// Topics are Upstash products in ByDefault ("Upstash Blob"); here the
// product name is enough.
export const topicName = (name: string) => name.replace(/^Upstash\s+/i, "");

export const topicSlug = (name: string) =>
  topicName(name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Every topic that has an article, the one with the most first.
export function kbTopics(articles: KbArticle[]): KbTopic[] {
  const counts = new Map<string, { topic: KbTopic; count: number }>();
  for (const { topic } of articles) {
    if (!topic) {
      continue;
    }
    const entry = counts.get(topic.id) ?? {
      topic: {
        id: topic.id,
        name: topicName(topic.name),
        slug: topicSlug(topic.name),
      },
      count: 0,
    };
    entry.count += 1;
    counts.set(topic.id, entry);
  }
  return Array.from(counts.values())
    .sort(
      (a, b) => b.count - a.count || a.topic.name.localeCompare(b.topic.name),
    )
    .map(({ topic }) => topic);
}

// The card's line under the title: the description, else the article's
// first paragraph as plain text.
export function kbExcerpt(article: KbArticle) {
  if (article.description) {
    return article.description;
  }
  const paragraph = article.content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .find((block) => block && !/^(#|!\[|\||```|<|>|[-*+] |\d+\. )/.test(block));
  if (!paragraph) {
    return "";
  }
  return paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]+/g, "")
    .replace(/\\([\\<>{}[\]()*_`#+\-.!|])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export function kbReadingMinutes(article: KbArticle) {
  const words = article.content
    .replace(/```[\s\S]*?```/g, " ")
    .match(/[A-Za-z0-9][A-Za-z0-9'-]*/g);
  return Math.max(1, Math.ceil((words?.length ?? 0) / 220));
}
