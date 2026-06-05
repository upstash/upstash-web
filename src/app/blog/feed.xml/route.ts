import { buildRssFeed, publishedPosts, rssResponse } from "@/lib/rss-feed";
import { SITE_URL } from "@/utils/const";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const posts = publishedPosts().slice(0, 30);

  const xml = await buildRssFeed({
    title: "Upstash Blog",
    description:
      "Articles and tutorials on serverless technologies from Upstash and community.",
    link: `${SITE_URL}/blog`,
    feedUrl: `${SITE_URL}/blog/feed.xml`,
    posts,
  });

  return rssResponse(xml);
}
