import { getKbArticles, type KbArticle, kbTopics } from "@/lib/kb";
import { SITE_URL } from "@/utils/const";

// The knowledge base's own sitemap, listed in /sitemap.xml and robots.txt.
// The deploy-time sitemap only learns of articles published since the last
// deploy at the next one; this one reads ByDefault on request, so a new
// article is listed within a minute of its webhook. The deploy-time sitemap
// keeps listing the articles it was built with, so when ByDefault is down
// search engines lose nothing they knew.

export const dynamic = "force-dynamic";

const xml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const newest = (articles: KbArticle[]) =>
  articles.reduce<string | null>(
    (latest, article) =>
      latest && latest > article.updatedAt ? latest : article.updatedAt,
    null,
  );

const entry = (path: string, lastmod: string | null) =>
  `<url><loc>${xml(`${SITE_URL}${path}`)}</loc>${
    lastmod ? `<lastmod>${xml(lastmod)}</lastmod>` : ""
  }</url>`;

export async function GET(): Promise<Response> {
  const articles = await getKbArticles().catch(() => null);
  if (!articles) {
    // Crawlers retry a failed sitemap and keep the URLs they already have;
    // an empty one would tell them nothing is here.
    return new Response("Knowledge base unavailable, try again later.\n", {
      status: 503,
      headers: { "Content-Type": "text/plain", "Retry-After": "600" },
    });
  }

  const urls = [
    entry("/kb", newest(articles)),
    ...kbTopics(articles).map((topic) =>
      entry(
        `/kb/topics/${topic.slug}`,
        newest(articles.filter((article) => article.topic?.id === topic.id)),
      ),
    ),
    ...articles.map((article) =>
      entry(`/kb/${article.slug}`, article.updatedAt),
    ),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=60",
      },
    },
  );
}
