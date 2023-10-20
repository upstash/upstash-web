import { allPosts, Post } from "contentlayer/generated";
import { DateTime } from "luxon";

export const baseUrl = process.env.VERCEL_URL
? `https://${process.env.VERCEL_URL}`
: "http://localhost:3000";

export async function getData(count?: number): Promise<Post[]> {
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      return DateTime.fromISO(a.date) > DateTime.fromISO(b.date) ? -1 : 1;
    });

  if (count) {
    return posts.slice(0, count);
  }

  return posts;
}

export async function getPostDetails(slug: string){
    const postDataURL = new URL(`/api/get/post-data?slug=${slug}`, baseUrl);
    
    const response = await fetch(postDataURL);

    if (!response.ok) {
      throw new Error("Post not found");
    }
    const post = await response.json();

		return post
}