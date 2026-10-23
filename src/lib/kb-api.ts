import { connection } from "next/server";
import { cache } from "react";

// The knowledge base's articles are written in ByDefault and read here from
// its Publishing API (Publishing → API in the Upstash project). Pages cache
// them for an hour; ByDefault's webhook (/api/kb/revalidate) refreshes them
// the moment an article is published, changed or taken down. Kept apart
// from lib/kb so the edge image routes don't bundle the blog's posts.

const API_URL = "https://www.bydefault.so";
const API_KEY = process.env.BYDEFAULT_API_KEY;

export const KB_TAG = "kb";

export type KbAuthor = { name: string; avatarUrl: string | null };

export type KbArticle = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  content: string;
  url: string | null;
  authors: KbAuthor[];
  topic: { id: string; name: string } | null;
  publishedAt: string;
  updatedAt: string;
};

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}/api/v1/${path}`, {
    headers: { Authorization: `Bearer ${API_KEY}` },
    next: { revalidate: 3600, tags: [KB_TAG] },
    // well inside the 60 seconds a page gets at build time
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(
      `ByDefault API ${response.status} on ${path}: ${await response.text()}`,
    );
  }
  return response.json();
}

// Every article live in ByDefault, newest first. Without a key there is
// nothing to read, so the knowledge base is empty rather than broken.
export const getApiArticles = cache(async (): Promise<KbArticle[]> => {
  if (!API_KEY) {
    return [];
  }
  try {
    const articles: KbArticle[] = [];
    for (let offset = 0; ; offset += 100) {
      const page = await get<{ articles: KbArticle[]; hasMore: boolean }>(
        `articles?limit=100&offset=${offset}`,
      );
      articles.push(...page.articles);
      if (!page.hasMore) {
        return articles;
      }
    }
  } catch (error) {
    // ByDefault is down or slow. A deploy still builds: the pages that
    // needed the articles render on their first visit instead, and a page
    // already cached keeps its copy until the API answers again.
    console.error(error);
    if (process.env.NEXT_PHASE === "phase-production-build") {
      await connection();
    }
    throw error;
  }
});

export async function getApiArticle(slug: string) {
  const articles = await getApiArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
