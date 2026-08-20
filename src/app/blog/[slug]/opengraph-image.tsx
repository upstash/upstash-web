import { renderPostCard, size } from "../utils/og-card";
import { getPostDetails } from "../utils/og-post-details";

export const runtime = "edge";
export const contentType = "image/png";
export { size };

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    const post = await getPostDetails(slug);

    if (!post) {
      throw new Error("Post not found");
    }

    return await renderPostCard(post);
  } catch (e) {
    console.error(e);
    return new Response(
      `Failed to generate the image: ${(e as Error).message}`,
      {
        status: 500,
      },
    );
  }
}
