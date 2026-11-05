import { getKbArticles, type KbArticle, kbTopics } from "@/lib/kb";
import { SITE_URL } from "@/utils/const";

// The knowledge base's own sitemap, listed in /sitemap.xml and robots.txt.
// The deploy-time sitemap only learns of articles published since the last
// deploy at the next one; this one is cached like the articles themselves
// (an hour, and ByDefault's webhook refreshes it on publish).
//
// When ByDefault is down nothing is lost: a failed hourly refresh throws,
// so the last good copy keeps being served; a failed build leaves this route
// to render on request instead; and the deploy-time sitemap still lists
// every article it was built with, so crawlers keep those URLs even when
// this one errors.

export const revalidate = 3600;

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
  const articles = await getKbArticles();

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
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    },
  );
}
