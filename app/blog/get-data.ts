import { allPosts, Post } from "contentlayer/generated";
import { DateTime } from "luxon";

export default async function getData(): Promise<Post[]> {
  return allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return DateTime.fromISO(a.date) > DateTime.fromISO(b.date) ? -1 : 1;
    });
}
