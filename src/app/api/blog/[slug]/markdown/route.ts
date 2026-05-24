import { allPosts } from "@content";
import { renderPost } from "@/lib/blog-markdown";
import { SITE_URL } from "@/utils/const";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return allPosts
    .filter((post) => !post.draft)
    .map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
): Promise<Response> {
  const post = allPosts.find((p) => p.slug === params.slug && !p.draft);

  if (!post) {
    return new Response("Not Found", { status: 404 });
  }

  const body = renderPost(post);
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const markdownUrl = `${canonicalUrl}.md`;
  const publishedIso = new Date(post.date).toISOString();
  const updatedIso = post.updated
    ? new Date(post.updated).toISOString()
    : undefined;

  const headers: Record<string, string> = {
    "Content-Type": "text/markdown; charset=utf-8",
    Vary: "Accept",
    "X-Robots-Tag": "noindex",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    Link: `<${markdownUrl}>; rel="alternate"; type="text/markdown", <${canonicalUrl}>; rel="canonical"`,
    "X-Post-Word-Count": String(post.wordCount),
    "X-Post-Reading-Time-Minutes": String(post.readingTimeMinutes),
    "X-Post-Published": publishedIso,
    "X-Markdown-Tokens": String(Math.max(1, Math.ceil(body.length / 4))),
  };
  if (updatedIso) headers["X-Post-Updated"] = updatedIso;

  return new Response(body, { headers });
}
