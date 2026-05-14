import { allPosts } from "@content";
import { renderPost } from "@/lib/blog-markdown";

export const dynamic = "force-static";

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

  return new Response(renderPost(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
