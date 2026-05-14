import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AFFILIATE_CODE } from "./constants";
import { negotiate } from "@/lib/accept";

function isBlogPath(pathname: string): boolean {
  return pathname === "/blog" || /^\/blog\/[^/]+$/.test(pathname);
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === "developer.upstash.com") {
    return NextResponse.redirect(
      "https://upstash.com/docs/devops/developer-api",
      301,
    );
  }

  const pathname = request.nextUrl.pathname;
  const accept = request.headers.get("accept") ?? "";

  if (isBlogPath(pathname) && accept) {
    const decision = negotiate(accept);

    if (decision === "unacceptable") {
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
