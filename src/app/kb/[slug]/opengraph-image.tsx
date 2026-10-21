import { renderPostCard, size } from "@/app/blog/utils/og-card";
import { getApiArticle } from "@/lib/kb-api";

export const runtime = "edge";
export const contentType = "image/png";
export { size };

// The blog's card, for the article's link previews.
export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const { slug } = await params;

    const article = await getApiArticle(slug);

    if (!article) {
      throw new Error("Article not found");
    }

    return await renderPostCard(
      {
        title: article.title,
        authorsData: article.authors.map((author) => ({
          name: author.name,
          image: author.avatarUrl,
        })),
      },
      "upstash.com/kb",
    );
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
