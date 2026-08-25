import { notFoundJson } from "@/lib/api-error";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Target of the JSON fallback rewrite in next.config.js: reached only for
// paths nothing else matched, when the client asked for application/json.
// The rewrite preserves the request method, so every method is handled.
function handler(request: NextRequest) {
  return notFoundJson(request.nextUrl.pathname);
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as HEAD,
  handler as OPTIONS,
};
