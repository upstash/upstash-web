import { allPosts, Post } from "contentlayer/generated";
import { DateTime } from "luxon";

export default async function getData(count?: number): Promise<Post[]> {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return DateTime.fromISO(a.date) > DateTime.fromISO(b.date) ? -1 : 1;
    });

  if (count) {
    return posts.slice(0, count);
  }

  return posts;
}
