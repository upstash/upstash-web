import Container from "@/components/container";
import PostHeader from "@/components/post/header";
import { Mdx } from "@/components/post/mdx";
import OtherPostCard from "@/components/post/other-post";
import PostTags from "@/components/post/tags";
import { IconBookmark } from "@tabler/icons-react";
import { SITE_URL } from "@/utils/const";
import { generateBlogSchema } from "@/utils/structured-schema-generators";
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
  const postUrl = `${SITE_URL}/blog/${post.slug}`;

  const structuredBlogSchema = generateBlogSchema({
    headline: post.title || "Upstash Blog",
    description:
      post.description ||
      "Articles and tutorials on serverless technologies from Upstash and community",
    keywords: post.tags,
    authorName: post.authorsData[0].name,
    authorUrl: post.authorsData[0].url || "",
    datePublished: isoDatePublished,
    url: postUrl,
    image: `${SITE_URL}/blog/${post.slug}/opengraph-image`,
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
      <article>
        <PostHeader post={post} />

        <div className="relative z-0 pt-12 md:pt-16">
          <Container className="max-w-screen-md">
            {post.description && (
              <div className="-mx-5 mb-10 rounded-2xl bg-emerald-900/5 p-5 md:-mx-6 md:p-6 dark:bg-white/[0.04]">
                <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  <IconBookmark size={16} stroke={2} />
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
  return {
    title,
    description,
    alternates: {
      canonical: `/blog/${post.slug}`,
      types: {
        "text/markdown": `/blog/${post.slug}.md`,
      },
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
