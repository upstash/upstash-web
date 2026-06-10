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
