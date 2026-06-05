import { allPosts } from "@content";
import { sanitizeMdx } from "@/lib/blog-markdown";
import { SITE_URL } from "@/utils/const";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

type Post = (typeof allPosts)[number];

const DEFAULT_DESCRIPTION =
  "Articles and tutorials on serverless technologies from Upstash and community";

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

/**
 * Collapses the block-level newlines that remark-html inserts between tags so
 * the serialized HTML sits on a single line. Only whitespace that contains a
 * newline AND sits directly between a closing `>` and an opening `<` is
 * removed — newlines inside `<pre>`/`<code>` blocks aren't bracketed that way,
 * so code samples keep their line breaks.
 */
function inlineHtml(html: string): string {
  return html.replace(/>\s*\n\s*</g, "><").trim();
}

async function markdownToHtml(markdown: string): Promise<string> {
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(sanitizeMdx(markdown));
  return inlineHtml(absolutizeHtmlUrls(String(file)));
}

function indent(lines: string[], spaces: number): string {
  const pad = " ".repeat(spaces);
  return lines.map((line) => `${pad}${line}`).join("\n");
}

async function renderItem(post: Post): Promise<string> {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const html = await markdownToHtml(post.content);
  const author = post.authorsData[0]?.name ?? "Upstash";
  const description = post.description ?? DEFAULT_DESCRIPTION;

  const lines = [
    `<title><![CDATA[${cdata(post.title)}]]></title>`,
    `<link>${url}</link>`,
    `<guid isPermaLink="true">${url}</guid>`,
    `<pubDate>${new Date(post.publishedAt ?? post.date).toUTCString()}</pubDate>`,
    `<description><![CDATA[${cdata(description)}]]></description>`,
    `<content:encoded><![CDATA[${cdata(html)}]]></content:encoded>`,
    `<dc:creator><![CDATA[${cdata(author)}]]></dc:creator>`,
    ...post.tags.map((tag) => `<category>${escapeXml(tag)}</category>`),
  ];

  return `    <item>\n${indent(lines, 6)}\n    </item>`;
}

export interface RssFeedOptions {
  /** Channel <title>. */
  title: string;
  /** Channel <description>. */
  description: string;
  /** Human-facing page the feed represents, e.g. `${SITE_URL}/blog`. */
  link: string;
  /** Absolute URL of the feed itself, used for the atom:self link. */
  feedUrl: string;
  /** Posts to include, already filtered/sorted/sliced by the caller. */
  posts: Post[];
}

export async function buildRssFeed({
  title,
  description,
  link,
  feedUrl,
  posts,
}: RssFeedOptions): Promise<string> {
  const items = await Promise.all(posts.map(renderItem));

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${link}</link>
    <description>${escapeXml(description)}</description>
    <language>en-US</language>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
${items.join("\n")}
  </channel>
</rss>
`;
}

export function rssResponse(xml: string): Response {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

/** Published posts, newest first. */
export function publishedPosts(): Post[] {
  return allPosts
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? b.date).getTime() -
        new Date(a.publishedAt ?? a.date).getTime(),
    );
}
