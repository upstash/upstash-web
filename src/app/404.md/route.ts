import { notFoundMarkdown } from "@/lib/ask";

export const dynamic = "force-dynamic";

// Also the target of the markdown fallback rewrite in next.config.js, which
// preserves the request method, so every method is handled.
function handler() {
  return new Response(notFoundMarkdown(), {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
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
