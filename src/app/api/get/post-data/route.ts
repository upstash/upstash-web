//@ts-ignore
import { allPosts } from "@content";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  const post = allPosts.find((post) => post.slug === slug);

  if (!post) {
    return NextResponse.json(
      { error: `Post with slug '${slug}' not found` },
      { status: 404 },
    );
  }

  return NextResponse.json(post);
}
