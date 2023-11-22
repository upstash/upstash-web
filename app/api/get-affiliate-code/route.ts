import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const affiliateCode = request.cookies.get("code");

  if (affiliateCode) {
    return NextResponse.json(
      { affiliateCode: affiliateCode.value },
      { status: 200 },
    );
  }
  return NextResponse.json({ status: 400 });
}
