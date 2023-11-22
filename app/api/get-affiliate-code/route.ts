import { NextRequest, NextResponse } from "next/server";

import { AFFILIATE_CODE } from "@/app/constants";

export async function GET(request: NextRequest) {
  const affiliateCode = request.cookies.get(AFFILIATE_CODE);

  if (affiliateCode) {
    return NextResponse.json(
      { affiliateCode: affiliateCode.value },
      { status: 200 },
    );
  }
  return NextResponse.json({ status: 400 });
}
