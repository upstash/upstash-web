export const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export async function getPostDetails(slug: string) {
  const postDataURL = new URL(`/api/get/post-data?slug=${slug}`, baseUrl);

  const response = await fetch(postDataURL);

  if (!response.ok) {
    throw new Error("Post not found");
  }
  const post = await response.json();

  return post;
}
