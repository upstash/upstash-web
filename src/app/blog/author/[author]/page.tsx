import Bg from "@/components/bg";
import PostGridCard from "@/components/blog/grid-item";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import type { Post } from "@content";
import { uniq } from "lodash";
import Link from "next/link";
import { getData } from "../../utils/helpers";

type Props = {
  params: {
    author: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  const posts = await getData();
  const authors = uniq(posts.flatMap((post) => post.authors));
  return authors.map((author) => ({ author }));
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const description = `Read all blog posts by ${params.author} on the Upstash blog. Tutorials, guides, and insights on serverless technologies.`;
  return {
    title: `${params.author}'s Posts`,
    description,
    alternates: {
      canonical: `/blog/author/${params.author}`,
    },
    openGraph: {
      title: `${params.author}'s Posts | Upstash Blog`,
      description,
      url: `/blog/author/${params.author}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${params.author}'s Posts | Upstash Blog`,
      description,
    },
  };
}

export default async function BlogPage({ params: { author } }: Props) {
  const posts = await getData();
  const postsByAuthor = posts.filter((post) => post.authors.includes(author));

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-12 text-center md:py-24">
        <PageHeaderTitle>
          <span className="font-medium opacity-40">blog/author/</span>
          <span className="font-bold">{author}</span>
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
            {postsByAuthor.map((post: Post) => {
              return <PostGridCard key={post.slug} data={post} />;
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
