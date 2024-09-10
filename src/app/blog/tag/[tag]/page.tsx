import Link from "next/link";

import type { Post } from "@content";
import { uniq } from "lodash";

import Bg from "@/components/bg";
import PostGridCard from "@/components/blog/grid-item";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";

import { getData } from "../../utils/helpers";

type Props = {
  params: {
    tag: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  const posts = await getData();
  const tags = uniq(posts.flatMap((post) => post.tags));
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  return {
    title: `Tag: ${params.tag}`,
  };
}

export default async function BlogPage({ params: { tag } }: Props) {
  const posts = await getData();
  const postsWithTag = posts.filter((post) => post.tags.includes(tag));

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-12 text-center md:py-24">
        <PageHeaderTitle>
          <span className="font-medium opacity-40">blog/tag/</span>
          <span className="font-bold">{tag}</span>
        </PageHeaderTitle>
        <div className="mt-4">
          <Link className="text-emerald-600 hover:underline" href="/blog">
            Back to all posts
          </Link>
        </div>
      </header>

      <section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {postsWithTag.map((post: Post) => {
              return <PostGridCard key={post.slug} data={post} />;
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
