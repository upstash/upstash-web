import { renderHome } from "@/lib/home-markdown";

export const dynamic = "force-static";

export function GET() {
  return new Response(renderHome(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
