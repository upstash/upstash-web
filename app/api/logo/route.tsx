import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const imagePath = path.resolve("public/logo/upstash-icon-white-bg.png");

  const imageBuffer = fs.readFileSync(imagePath);

  const response = new NextResponse(imageBuffer);

  response.headers.set("Content-Type", "image/png");

  return response;
}
