import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import OtherPostCard from "@/components/post/other-post";
import Clap from "@/components/post/claps";
import { Mdx } from "@/components/post/mdx";
import Container from "@/components/container";
import PostHeader from "@/components/post/header";
import PostTags from "@/components/post/tags";
import PageBodyGradient from "@/components/page-body-gradient";
import Bg from "@/components/bg";
import { getTableOfContents } from "@/utils/toc";
import PostTOC from "@/components/post/toc";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      slug: post.slug,
    }));
}

export default async function BlogPage({ params }: Props) {
  const slug = params?.slug;

  const indexOfPost = allPosts.findIndex((post) => post.slug === slug);
  const post = allPosts[indexOfPost];

  if (!post) {
    notFound();
  }

  const toc = await getTableOfContents(post.body.raw);

  const nextPost = indexOfPost > 0 ? allPosts[indexOfPost - 1] : undefined;
  const prevPost =
    indexOfPost < allPosts.length - 1 ? allPosts[indexOfPost + 1] : undefined;

  return (
    <main className="relative z-0">
      <Bg />

      <article>
        {/* Header */}
        <PostHeader post={post} />

        {/* Body */}
        <div className="relative z-0 pt-10">
          <PageBodyGradient />

          <Container className="max-w-screen-md">
            {/* toc */}
            <PostTOC toc={toc} />

            {/* content */}
            <Mdx code={post.body.code} />

            {/* Tags */}
            <PostTags post={post} />

            {/* Other Post */}
            <div className="grid gap-4 mt-10 md:grid-cols-2 md:gap-8">
              <OtherPostCard post={prevPost} />
              <OtherPostCard post={nextPost} align="right" />
            </div>
          </Container>
        </div>

        {/* Claps */}
        <Clap tweet={post.tweet} />
      </article>
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const post = allPosts.find((post: Post) => post.slug === params.slug) as Post;
  const title = post.title;
  const description =
    post.description ||
    "Articles and tutorials on serverless technologies from Upstash and community";
  const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: `${baseUrl}/blog/${post.slug}/opengraph-image`,
          width: 1200,
          height: 675,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
