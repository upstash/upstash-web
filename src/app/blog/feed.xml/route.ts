import { allPosts } from "@content";
import { sanitizeMdx } from "@/lib/blog-markdown";
import { SITE_URL } from "@/utils/const";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function cdata(value: string): string {
  return value.replaceAll("]]>", "]]]]><![CDATA[>");
}

function absolutizeHtmlUrls(html: string): string {
  return html.replace(
    /\b(href|src)="\/([^"]*)"/g,
    (_match, attribute: string, path: string) =>
      `${attribute}="${SITE_URL}/${path}"`,
  );
}

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(sanitizeMdx(markdown));
  return absolutizeHtmlUrls(String(file));
}

export async function GET(): Promise<Response> {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
    .slice(0, 30);

  const items = await Promise.all(
    posts.map(async (post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const html = await markdownToHtml(post.content);
      const author = post.authorsData[0]?.name ?? "Upstash";
      const description =
        post.description ??
        "Articles and tutorials on serverless technologies from Upstash and community";
      return `
    <item>
      <title><![CDATA[${cdata(post.title)}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${cdata(description)}]]></description>
      <content:encoded><![CDATA[${cdata(html)}]]></content:encoded>
      <dc:creator><![CDATA[${cdata(author)}]]></dc:creator>
      ${post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`).join("")}
    </item>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Upstash Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Articles and tutorials on serverless technologies from Upstash and community.</description>
    <language>en-US</language>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    ${items.join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
