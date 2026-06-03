import { allPosts } from "@content";
import type { Post } from "@content";
import { DateTime } from "luxon";

export async function getData(count?: number): Promise<Post[]> {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      const aTime = DateTime.fromISO(a.publishedAt ?? a.date).toMillis();
      const bTime = DateTime.fromISO(b.publishedAt ?? b.date).toMillis();
      return bTime - aTime;
    });

  if (count) {
    return posts.slice(0, count);
  }

  return posts;
}

export function extractExcerpt(content: string, maxLen = 200): string {
  const text = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]+`/g, "")
    .replace(/^import\s+.*$/gm, "")
    .replace(/^export\s+.*$/gm, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/\{[^}]*\}/g, "")
    .replace(/^#{1,6}\s+.*$/gm, "")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~]+/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}
