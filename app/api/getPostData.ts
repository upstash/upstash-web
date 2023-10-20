import { NextApiRequest, NextApiResponse } from 'next';
import { allPosts } from "contentlayer/generated";

export const runtime = 'edge'

export default async function getPost(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query;

	const post = allPosts.find((post) => post.slug === slug);

	if (!post) {
		return res.status(404).json({ message: `Post with slug '${slug}' not found` });
	}

	res.status(200).json(post);
}
