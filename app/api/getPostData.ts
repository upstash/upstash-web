import { NextApiRequest, NextApiResponse } from 'next';
import { allPosts } from "contentlayer/generated";
import { NextResponse } from 'next/server';

export const runtime = 'edge'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query;

	const post = allPosts.find((post) => post.slug === slug);

	if (!post) {
		return res.status(404).json({ message: `Post with slug '${slug}' not found` });
	}

	return NextResponse.json(post);
}
