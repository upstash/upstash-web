import { AFFILIATE_CODE } from "@/constants";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const affiliateCode = cookies().get(AFFILIATE_CODE);

  if (affiliateCode) {
    return NextResponse.json(
      { affiliateCode: affiliateCode.value },
      { status: 200 },
    );
  }
  return NextResponse.json({ status: 400, cookies: request.cookies.getAll() });
}
