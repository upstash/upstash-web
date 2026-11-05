import { getKbArticles } from "@/lib/kb";
import {
  KB_MARKDOWN_CACHE,
  kbUnavailable,
  renderKbIndex,
} from "@/lib/kb-markdown";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const articles = await getKbArticles().catch(() => null);
  if (!articles) {
    return kbUnavailable();
  }
  return new Response(renderKbIndex(articles), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "X-Robots-Tag": "noindex",
      "Cache-Control": KB_MARKDOWN_CACHE,
    },
  });
}
