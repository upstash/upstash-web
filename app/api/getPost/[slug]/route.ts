import { allPosts } from "contentlayer/generated";
import { authors } from "@/utils/authors";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const authorImagePath = authors[post.authors[0]].image;

  return new NextResponse(JSON.stringify({ post, authorImagePath }));
}
