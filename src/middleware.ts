import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { AFFILIATE_CODE } from "./constants";

export function middleware(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams; // `URLSearchParams`
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
