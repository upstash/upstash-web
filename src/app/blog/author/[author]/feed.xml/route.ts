import { buildRssFeed, publishedPosts, rssResponse } from "@/lib/rss-feed";
import { authors } from "@/utils/authors";
import { SITE_URL } from "@/utils/const";

export const dynamic = "force-static";

type Params = { author: string };

export function generateStaticParams(): Params[] {
  const usernames = Array.from(
    new Set(publishedPosts().flatMap((post) => post.authors)),
  );
  return usernames.map((author) => ({ author }));
}

export async function GET(
  _request: Request,
  { params }: { params: Params },
): Promise<Response> {
  const { author } = params;
  const displayName = authors[author]?.name ?? author;
  const posts = publishedPosts().filter((post) =>
    post.authors.includes(author),
  );

  const xml = await buildRssFeed({
    title: `${displayName} – Upstash Blog`,
    description: `Articles and tutorials by ${displayName} on the Upstash blog.`,
    link: `${SITE_URL}/blog/author/${author}`,
    feedUrl: `${SITE_URL}/blog/author/${author}/feed.xml`,
    posts,
  });

  return rssResponse(xml);
}
