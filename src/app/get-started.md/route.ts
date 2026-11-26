import { trackEvent } from "@/app/start-redis/analytics";
import { GET_STARTED_MARKDOWN } from "@/lib/get-started-markdown";
import type { NextRequest } from "next/server";

// Every read is counted (GA4 `get_started_md`, with the reader's User-Agent),
// so the page is rendered per request rather than served from the cache.
export const dynamic = "force-dynamic";

export function GET(req: NextRequest) {
  trackEvent("get_started_md", req);

  return new Response(GET_STARTED_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
