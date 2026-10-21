import { KbGrid } from "@/components/kb/card";
import { getKbArticles, KB_DESCRIPTION, kbExcerpt } from "@/lib/kb";
import { SITE_URL } from "@/utils/const";
import { generateBlogListSchema } from "@/utils/structured-schema-generators";
import Link from "next/link";

export default async function KbPage() {
  const articles = await getKbArticles();

  if (articles.length === 0) {
    return (
      <p className="py-20 text-center text-text-mute">
        Nothing here yet. The{" "}
        <Link href="/blog" className="font-medium text-text underline">
          blog
        </Link>{" "}
        has everything we&apos;ve written so far.
      </p>
    );
  }

  const schema = generateBlogListSchema({
    url: `${SITE_URL}/kb`,
    name: "Upstash Knowledge Base",
    description: KB_DESCRIPTION,
    posts: articles.map((article) => ({
      title: article.title,
      url: `${SITE_URL}/kb/${article.slug}`,
      datePublished: article.publishedAt,
      description: kbExcerpt(article),
      authors: article.authors.map((author) => author.name),
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schema }}
      />
      <KbGrid articles={articles} />
    </>
  );
}
