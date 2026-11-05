import { getKbArticles } from "@/lib/kb";
import { renderKbIndex } from "@/lib/kb-markdown";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  return new Response(renderKbIndex(await getKbArticles()), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "X-Robots-Tag": "noindex",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
