import Bg from "@/components/bg";
import PostGridCard from "@/components/blog/grid-item";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import { normalizeTag, normalizeTagParam } from "@/utils/tags";
import type { Post } from "@content";
import { uniq } from "lodash";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getData } from "../../utils/helpers";

type Props = {
  params: {
    tag: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  const posts = await getData();
  const tags = uniq(posts.flatMap((post) => post.tags.map(normalizeTag)));
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const tag = normalizeTagParam(params.tag);
  const description = `Browse all Upstash blog posts about ${tag}. Tutorials, guides, and articles on ${tag} for serverless developers.`;
  return {
    title: `Tag: ${tag}`,
    description,
    alternates: {
      canonical: `/blog/tag/${tag}`,
    },
    openGraph: {
      title: `${tag} Articles | Upstash Blog`,
      description,
      url: `/blog/tag/${tag}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${tag} Articles | Upstash Blog`,
      description,
    },
  };
}

export default async function BlogPage({ params: { tag } }: Props) {
  const normalized = normalizeTagParam(tag);
  const posts = await getData();
  const postsWithTag = posts.filter((post) =>
    post.tags.some((t) => normalizeTag(t) === normalized),
  );

  if (postsWithTag.length === 0) {
    notFound();
  }

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-12 text-center md:py-24">
        <PageHeaderTitle>
          <span className="font-medium opacity-40">blog/tag/</span>
          <span className="font-bold">{normalized}</span>
        </PageHeaderTitle>
        <div className="mt-4">
          <Link className="text-primary-text hover:underline" href="/blog">
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
