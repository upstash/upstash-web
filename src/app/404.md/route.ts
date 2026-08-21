import { notFoundMarkdown } from "@/lib/ask";

export const dynamic = "force-dynamic";

export function GET() {
  return new Response(notFoundMarkdown(), {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
