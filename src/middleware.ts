import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AFFILIATE_CODE } from "./constants";
import { negotiate } from "@/lib/accept";

function isBlogPath(pathname: string): boolean {
  return pathname === "/blog" || /^\/blog\/[^/.]+$/.test(pathname);
}

const BLOG_MD_POST = /^\/blog\/([^/]+)\.md$/;

const AI_BOT_REGEX =
  /GPTBot|OAI-SearchBot|ChatGPT-User|ClaudeBot|Claude-User|Claude-SearchBot|claude-code|PerplexityBot|Perplexity-User|Google-Extended|GoogleOther|Google-CloudVertexBot|Google-NotebookLM|Amazonbot|CCBot|Applebot|Applebot-Extended|meta-externalagent|Meta-ExternalAgent|DuckAssistBot|MistralAI-User|Bytespider|cohere-ai|Diffbot|AI2Bot/i;

function markdownAlternateLink(pathname: string): string {
  return `<${pathname}.md>; rel="alternate"; type="text/markdown", <${pathname}>; rel="canonical"`;
}

function applyBlogHtmlHeaders(
  response: NextResponse,
  pathname: string,
  aiAgent: string | null,
): NextResponse {
  response.headers.append("Vary", "Accept");
  response.headers.set("x-content-bucket", "html");
  if (pathname !== "/blog") {
    response.headers.set("Link", markdownAlternateLink(pathname));
  }
  if (aiAgent) response.headers.set("x-ai-agent", aiAgent);
  return response;
}

const PRICING_MD_PRODUCTS = [
  "redis",
  "qstash",
  "vector",
  "workflow",
  "search",
  "box",
] as const;

const PRICING_DEFAULT_PRODUCT = "redis";

const PRICING_PATH = new RegExp(
  `^/pricing(?:/(${PRICING_MD_PRODUCTS.join("|")}))?$`,
);

function unacceptableResponse(): NextResponse {
  return new NextResponse(
    "Not Acceptable\n\nAvailable representations:\n- text/html\n- text/markdown\n",
    {
      status: 406,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        Vary: "Accept",
      },
    },
  );
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === "developer.upstash.com") {
    return NextResponse.redirect(
      "https://upstash.com/docs/devops/developer-api",
      301,
    );
  }

  const pathname = request.nextUrl.pathname;
  const userAgent = request.headers.get("user-agent") ?? "";
  const aiAgentMatch = userAgent.match(AI_BOT_REGEX);
  const aiAgent = aiAgentMatch ? aiAgentMatch[0] : null;

  // Explicit `.md` URLs (e.g. /blog.md, /blog/foo.md) always serve Markdown,
  // regardless of Accept header. This is the conventional pattern (GitHub,
  // llms.txt, etc.) and gives us distinct cache keys without Vary headaches.
  if (pathname === "/blog.md") {
    const res = NextResponse.rewrite(new URL("/api/blog/markdown", request.url));
    res.headers.set("Vary", "Accept");
    res.headers.set("x-content-bucket", "md");
    if (aiAgent) res.headers.set("x-ai-agent", aiAgent);
    return res;
  }
  const mdPost = pathname.match(BLOG_MD_POST);
  if (mdPost) {
    const res = NextResponse.rewrite(
      new URL(
        `/api/blog/${encodeURIComponent(mdPost[1])}/markdown`,
        request.url,
      ),
    );
    res.headers.set("Vary", "Accept");
    res.headers.set("x-content-bucket", "md");
    if (aiAgent) res.headers.set("x-ai-agent", aiAgent);
    return res;
  }

  const accept = request.headers.get("accept") ?? "";

  if (isBlogPath(pathname) && accept) {
    const decision = negotiate(accept);

    if (decision === "unacceptable") {
      return unacceptableResponse();
    }

    if (decision === "markdown") {
      const markdownUrl =
        pathname === "/blog"
          ? new URL("/api/blog/markdown", request.url)
          : new URL(
              `/api/blog/${encodeURIComponent(pathname.slice("/blog/".length))}/markdown`,
              request.url,
            );
      const res = NextResponse.rewrite(markdownUrl);
      res.headers.set("Vary", "Accept");
      res.headers.set("x-content-bucket", "md");
      if (aiAgent) res.headers.set("x-ai-agent", aiAgent);
      return res;
    }
  }

  const pricingMatch = pathname.match(PRICING_PATH);
  if (pricingMatch && accept) {
    const decision = negotiate(accept);

    if (decision === "unacceptable") {
      return unacceptableResponse();
    }

    if (decision === "markdown") {
      const product = pricingMatch[1] ?? PRICING_DEFAULT_PRODUCT;
      return NextResponse.rewrite(
        new URL(`/pricing/${product}.md`, request.url),
      );
    }
  }

  const queryParams = request.nextUrl.searchParams;
  const affiliateCode = queryParams.get(AFFILIATE_CODE);

  const response = NextResponse.next();
  if (affiliateCode) {
    response.cookies.set(AFFILIATE_CODE, affiliateCode, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
  }
  if (isBlogPath(pathname)) {
    return applyBlogHtmlHeaders(response, pathname, aiAgent);
  }
  if (affiliateCode) return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
