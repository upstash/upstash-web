import Bg from "@/components/bg";
import Container from "@/components/container";
import PageBodyGradient from "@/components/page-body-gradient";
import Clap from "@/components/post/claps";
import PostHeader from "@/components/post/header";
import { Mdx } from "@/components/post/mdx";
import OtherPostCard from "@/components/post/other-post";
import RelatedRedis from "@/components/post/related-redis";
import PostTags from "@/components/post/tags";
import { authorUrl } from "@/utils/authors";
import { SITE_URL } from "@/utils/const";
import {
  generateBlogSchema,
  generateBreadcrumbSchema,
} from "@/utils/structured-schema-generators";
import type { Post } from "@content";
import { allPosts } from "@content";
import { notFound } from "next/navigation";

/**
 * Finds the adjacent non-draft posts (next and previous) for a given index
 */
function getAdjacentPosts(posts: Post[], currentIndex: number) {
  let nextPost: Post | undefined = undefined;
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (!posts[i].draft) {
      nextPost = posts[i];
      break;
    }
  }

  let prevPost: Post | undefined = undefined;
  for (let i = currentIndex + 1; i < posts.length; i++) {
    if (!posts[i].draft) {
      prevPost = posts[i];
      break;
    }
  }

  return { nextPost, prevPost };
}

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

  const isoDatePublished = new Date(post.date).toISOString();
  const isoDateModified = post.updated
    ? new Date(post.updated).toISOString()
    : undefined;
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const structuredBlogSchema = generateBlogSchema({
    headline: post.title || "Upstash Blog",
    description:
      post.description ||
      "Articles and tutorials on serverless technologies from Upstash and community",
    keywords: post.tags,
    authors: post.authorsData.map((a) => ({
      name: a.name,
      url: authorUrl(a),
    })),
    datePublished: isoDatePublished,
    dateModified: isoDateModified,
    url: postUrl,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
    wordCount: post.wordCount,
    readingTimeMinutes: post.readingTimeMinutes,
  });

  const structuredBreadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: SITE_URL },
      { name: "Blog", url: `${SITE_URL}/blog` },
      { name: post.title, url: postUrl },
    ],
  });

  const { nextPost, prevPost } = getAdjacentPosts(allPosts, indexOfPost);

  const isRedisPost = post.tags?.some((tag) => tag.toLowerCase() === "redis");

  return (
    <main className="relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredBlogSchema,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredBreadcrumbSchema,
        }}
      />
      <Bg />

      <article>
        {/* Header */}
        <PostHeader post={post} />

        {/* Body */}
        <div className="relative z-0 pt-10">
          <PageBodyGradient isBlogPage />

          <Container className="max-w-screen-md">
            <Mdx code={post.mdx} />

            {isRedisPost && <RelatedRedis />}

            <PostTags post={post} />

            <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-8">
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
  if (!post) notFound();
  const title = post.title;
  const description =
    post.description ||
    "Articles and tutorials on serverless technologies from Upstash and community";
  const publishedTime = new Date(post.date).toISOString();
  const modifiedTime = post.updated
    ? new Date(post.updated).toISOString()
    : publishedTime;
  return {
    title,
    description,
    keywords: post.tags,
    authors: post.authorsData.map((a) => {
      const url = authorUrl(a);
      return {
        name: a.name,
        ...(url ? { url } : {}),
      };
    }),
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: {
        "text/markdown": `/blog/${post.slug}.md`,
        "application/rss+xml": "/blog/feed.xml",
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime,
      modifiedTime,
      authors: post.authorsData.map((a) => a.name),
      tags: post.tags,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  };
}
