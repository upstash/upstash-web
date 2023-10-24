import { NextRequest, NextResponse } from "next/server";
import { allPosts } from "contentlayer/generated";

export const runtime = 'edge'

export async function GET(req: NextRequest, res: NextResponse) {
	const slug = req.nextUrl.searchParams.get('slug');

	const post = allPosts.find((post) => post.slug === slug);

	if (!post) {
		return NextResponse.json({ error: `Post with slug '${slug}' not found` }, {status:404});
	}

	return NextResponse.json(post);
}
