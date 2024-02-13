import { notFound } from "next/navigation";

import { getTableOfContents } from "@/utils/toc";
import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";

import Bg from "@/components/bg";
import Container from "@/components/container";
import PageBodyGradient from "@/components/page-body-gradient";
import Clap from "@/components/post/claps";
import PostHeader from "@/components/post/header";
import { Mdx } from "@/components/post/mdx";
import OtherPostCard from "@/components/post/other-post";
import PostTags from "@/components/post/tags";
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

  const jsonLdData = {
    blogName: post.title,
    blogDescription: post.description || "Articles and tutorials on serverless technologies from Upstash and community",
    keywords: post.tags,
    authorName: post.authorsData[0].name,
    authorUrl: post.authorsData[0].twitter,
    datePublished: post.date,
  }

  if (!post) {
    notFound();
  }

  const toc = await getTableOfContents(post.body.raw);

  const nextPost = indexOfPost > 0 ? allPosts[indexOfPost - 1] : undefined;
  const prevPost =
    indexOfPost < allPosts.length - 1 ? allPosts[indexOfPost + 1] : undefined;

 

  return (
    <main className="relative z-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(jsonLdData))}}/>
      <Bg />

      <article>
        {/* Header */}
        <PostHeader post={post} />

        {/* Body */}
        <div className="relative z-0 pt-10">
          <PageBodyGradient isBlogPage />

          <Container className="max-w-screen-md">
            {/* toc */}
            <PostTOC toc={toc} />

            {/* content */}
            <Mdx code={post.body.code} />

            {/* Tags- */}
            <PostTags post={post} />

            {/* Other Post */}
            <div className="grid gap-4 mt-10 md:grid-cols-2 md:gap-8">
              <OtherPostCard post={nextPost} align="left" />
              <OtherPostCard post={prevPost} align="right" />
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
  if (!post)
    notFound()
  const title = post.title;
  const description =
    post.description ||
    "Articles and tutorials on serverless technologies from Upstash and community";
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      url: `${baseUrl}/blog/${post.slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const generateJsonLd = ({blogName, blogDescription, keywords, authorName, authorUrl, datePublished}: {
  blogName: string;
  blogDescription: string;
  keywords: string[];
  authorName: string;
  authorUrl: string;
  datePublished: string;
})=>{
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogName,
    "description": blogDescription,
    "keywords": keywords.join(" "),
    "image": [
      "https://example.com/photos/1x1/photo.jpg",
      "https://example.com/photos/4x3/photo.jpg",
      "https://example.com/photos/16x9/photo.jpg"
     ],
    "datePublished": datePublished,
    "author": [{
        "@type": "Person",
        "name": authorName,
        "url": authorUrl
      }]
  }

  return jsonLd
}