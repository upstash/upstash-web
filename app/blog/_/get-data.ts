import { allPosts, Post } from "contentlayer/generated";
import { DateTime } from "luxon";
import { countBy, flatten, omit } from "lodash";
import { BANNED_TAGS } from "@/utils/const";
// import { Redis } from "@upstash/redis";

// const redis = Redis.fromEnv();

export default async function getData(): Promise<{
  posts: Post[];
  tags: [string, number][];
  views: Record<string, number>;
}> {
  const posts: Post[] = allPosts.sort((a, b) => {
    return DateTime.fromISO(a.date) > DateTime.fromISO(b.date) ? -1 : 1;
  });

  const _tags = omit(
    countBy(flatten(posts.map((post) => post.tags))),
    BANNED_TAGS
  );

  const tags = Object.entries(_tags).sort((a, b) => b[1] - a[1]);

  // const views = (
  //   await redis.mget<number[]>(
  //     ...posts.map((p) => ["pageviews", "blog", p.slug].join(":"))
  //   )
  // ).reduce((acc, v, i) => {
  //   acc[posts[i].slug] = v ?? 0;
  //   return acc;
  // }, {} as Record<string, number>);

  return {
    posts,
    views: {},
    tags,
  };
}
