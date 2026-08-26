import { notFoundJson } from "@/lib/api-error";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

// Optional catch-all for /api itself and unknown /api/* paths: agents get a
// structured JSON 404 instead of the HTML not-found page.
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
