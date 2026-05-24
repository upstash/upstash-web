import PostCard from "@/components/blog/post-card";
import Container from "@/components/container";
import { authors } from "@/utils/authors";
import { uniq } from "lodash";
import Link from "next/link";
import { extractExcerpt, getData } from "../../utils/helpers";

const COLS = 3;

type Props = {
  params: {
    author: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  const posts = await getData();
  const usernames = uniq(posts.flatMap((post) => post.authors));
  return usernames.map((author) => ({ author }));
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
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

export default async function BlogAuthorPage({ params: { author } }: Props) {
  const posts = await getData();
  const postsByAuthor = posts.filter((post) => post.authors.includes(author));
  const displayName = authors[author]?.name ?? author;
  const fillers = (COLS - (postsByAuthor.length % COLS)) % COLS;

  return (
    <main className="relative z-0">
      <Container className="pt-16 md:pt-24">
        <div className="w-fit py-10 pl-7 pr-10 text-text md:pl-10 md:pr-20">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Articles by {displayName}.
          </h1>
        </div>

        <div className="mb-6 pl-7 md:pl-10">
          <Link
            href="/blog"
            className="font-mono text-sm tracking-tight text-text-mute hover:text-text"
          >
            ← Back to all posts
          </Link>
        </div>

        <div className="bg-emerald-950/10 p-px dark:bg-white/10">
          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
            {postsByAuthor.map((post) => (
              <PostCard
                key={post.slug}
                data={{
                  slug: post.slug,
                  title: post.title,
                  tags: post.tags,
                  date: post.date,
                  authorsData: post.authorsData,
                  description: post.description,
                  excerpt: post.description
                    ? undefined
                    : extractExcerpt(post.content),
                }}
              />
            ))}
            {Array.from({ length: fillers }).map((_, i) => (
              <div key={`filler-${i}`} className="bg-bg" aria-hidden />
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
