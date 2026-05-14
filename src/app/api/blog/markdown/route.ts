import { renderIndex } from "@/lib/blog-markdown";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  return new Response(renderIndex(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
