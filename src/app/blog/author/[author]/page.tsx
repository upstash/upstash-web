import Bg from "@/components/bg";
import PostGridCard from "@/components/blog/grid-item";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import { authors } from "@/utils/authors";
import type { Post } from "@content";
import { uniq } from "lodash";
import Link from "next/link";
import { getData } from "../../utils/helpers";

type Props = {
  params: Promise<{
    author: string;
  }>;
};

export async function generateStaticParams(): Promise<Awaited<Props["params"]>[]> {
  const posts = await getData();
  const authors = uniq(posts.flatMap((post) => post.authors));
  return authors.map((author) => ({ author }));
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const displayName = authors[params.author]?.name ?? params.author;
  const description = `Read all blog posts by ${displayName} on the Upstash blog. Tutorials, guides, and insights on serverless technologies.`;
  return {
    title: `${displayName}'s Posts`,
    description,
    alternates: {
      canonical: `/blog/author/${params.author}`,
    },
    openGraph: {
      title: `${displayName}'s Posts | Upstash Blog`,
      description,
      url: `/blog/author/${params.author}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${displayName}'s Posts | Upstash Blog`,
      description,
    },
  };
}

export default async function BlogPage(props: Props) {
  const params = await props.params;

  const {
    author
  } = params;

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
