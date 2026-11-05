import { getKbArticle, kbBlogSlug } from "@/lib/kb";
import { renderKbArticle } from "@/lib/kb-markdown";
import { notFoundMarkdown } from "@/lib/not-found-markdown";
import { SITE_URL } from "@/utils/const";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  props: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await props.params;

  // Same as the HTML page: an article that is on the blog lives there.
  const blogSlug = await kbBlogSlug(slug);
  if (blogSlug) {
    return Response.redirect(`${SITE_URL}/blog/${blogSlug}.md`, 308);
  }

  const article = await getKbArticle(slug);
  if (!article) {
    return new Response(notFoundMarkdown(), {
      status: 404,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        Vary: "Accept",
      },
    });
  }

  const body = renderKbArticle(article);
  const canonicalUrl = `${SITE_URL}/kb/${article.slug}`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "X-Robots-Tag": "noindex",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      Link: `<${canonicalUrl}.md>; rel="alternate"; type="text/markdown", <${canonicalUrl}>; rel="canonical"`,
      "X-Markdown-Tokens": String(Math.max(1, Math.ceil(body.length / 4))),
    },
  });
}
