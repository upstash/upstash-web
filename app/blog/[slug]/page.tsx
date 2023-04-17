import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Link from "next/link";
import IncrView from "./view";
import OtherPostCard from "./other-post";
import Clap from "./claps";
import { Mdx } from "./mdx";
import Container from "@/components/container";

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

  const nextPost = indexOfPost > 0 ? allPosts[indexOfPost - 1] : undefined;
  const prevPost =
    indexOfPost < allPosts.length - 1 ? allPosts[indexOfPost + 1] : undefined;

  return (
    <>
      <IncrView slug={slug} />
      <div>{post.title}</div>

      {/* Claps */}
      <Clap tweet={post.tweet} />

      {/* Body */}
      <Container className="max-w-screen-md">
        <Mdx code={post.body.code} />

        {/* Tags */}
        <div className="flex gap-2">
          {post.tags.map((tag: string) => (
            <Link key={tag} href={`/blog/tag/${tag}`}>
              {tag}
            </Link>
          ))}
        </div>

        {/* Other Post */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <OtherPostCard post={prevPost} />
          <OtherPostCard post={nextPost} align="right" />
        </div>
      </Container>
    </>
  );
}
