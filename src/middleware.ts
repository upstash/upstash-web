import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AFFILIATE_CODE } from "./constants";
import { negotiate } from "@/lib/accept";

function isBlogPath(pathname: string): boolean {
  return pathname === "/blog" || /^\/blog\/[^/]+$/.test(pathname);
}

const BLOG_MD_POST = /^\/blog\/([^/]+)\.md$/;

const PRICING_MD_PRODUCTS = [
  "redis",
  "qstash",
  "vector",
  "workflow",
  "search",
  "box",
] as const;

const PRICING_PATH = new RegExp(
  `^/pricing/(${PRICING_MD_PRODUCTS.join("|")})$`,
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

  // Explicit `.md` URLs (e.g. /blog.md, /blog/foo.md) always serve Markdown,
  // regardless of Accept header. This is the conventional pattern (GitHub,
  // llms.txt, etc.) and gives us distinct cache keys without Vary headaches.
  if (pathname === "/blog.md") {
    return NextResponse.rewrite(new URL("/api/blog/markdown", request.url));
  }
  const mdPost = pathname.match(BLOG_MD_POST);
  if (mdPost) {
    return NextResponse.rewrite(
      new URL(
        `/api/blog/${encodeURIComponent(mdPost[1])}/markdown`,
        request.url,
      ),
    );
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
      return NextResponse.rewrite(markdownUrl);
    }
  }

  const pricingMatch = pathname.match(PRICING_PATH);
  if (pricingMatch && accept) {
    const decision = negotiate(accept);

    if (decision === "unacceptable") {
      return unacceptableResponse();
    }

    if (decision === "markdown") {
      return NextResponse.rewrite(
        new URL(`/pricing/${pricingMatch[1]}.md`, request.url),
      );
    }
  }

  const queryParams = request.nextUrl.searchParams;
  const affiliateCode = queryParams.get(AFFILIATE_CODE);

  if (affiliateCode) {
    const response = NextResponse.next();
    response.cookies.set(AFFILIATE_CODE, affiliateCode, {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    return response;
  }
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
