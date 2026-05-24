import Container from "@/components/container";
import PostHeader from "@/components/post/header";
import { Mdx } from "@/components/post/mdx";
import OtherPostCard from "@/components/post/other-post";
import PostTags from "@/components/post/tags";
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
    authors: post.authorsData.map((a) => ({ name: a.name, url: a.url })),
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
      <article>
        <PostHeader post={post} />

        <div className="relative z-0 pt-12 md:pt-16">
          <Container className="max-w-screen-md">
            {post.description && (
              <div className="-mx-5 mb-10 rounded-2xl bg-emerald-900/5 p-5 md:-mx-6 md:p-6 dark:bg-white/[0.04]">
                <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  <SummaryIcon />
                  Summary
                </div>
                <p className="text-text">{post.description}</p>
              </div>
            )}

            <Mdx code={post.mdx} />

            <PostTags post={post} />

            <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-8">
              <OtherPostCard post={nextPost} align="left" />
              <OtherPostCard post={prevPost} align="right" />
            </div>
          </Container>
        </div>
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
    authors: post.authorsData.map((a) => ({
      name: a.name,
      ...(a.url ? { url: a.url } : {}),
    })),
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

function SummaryIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="13"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="-mt-1"
    >
      <path
        d="M11 17H4.2C3.07989 17 2.51984 17 2.09202 16.782C1.71569 16.5903 1.40973 16.2843 1.21799 15.908C1 15.4802 1 14.9201 1 13.8V4.2C1 3.07989 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.07989 1 4.2 1H4.6C6.84021 1 7.96031 1 8.81596 1.43597C9.56861 1.81947 10.1805 2.43139 10.564 3.18404C11 4.03968 11 5.15979 11 7.4M11 17V7.4M11 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V4.2C21 3.07989 21 2.51984 20.782 2.09202C20.5903 1.71569 20.2843 1.40973 19.908 1.21799C19.4802 1 18.9201 1 17.8 1H17.4C15.1598 1 14.0397 1 13.184 1.43597C12.4314 1.81947 11.8195 2.43139 11.436 3.18404C11 4.03968 11 5.15979 11 7.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
