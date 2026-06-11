import Bg from "@/components/bg";
import AuthorSocials from "@/components/blog/author-socials";
import PostGridCard from "@/components/blog/grid-item";
import Container from "@/components/container";
import { authors } from "@/utils/authors";
import type { Post } from "@content";
import { uniq } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

export default async function BlogPage({ params: { author } }: Props) {
  const posts = await getData();
  const postsByAuthor = posts.filter((post) => post.authors.includes(author));

  if (postsByAuthor.length === 0) {
    notFound();
  }

  // Pull profile details from the first post's resolved author data so the
  // image path matches what the cards use; fall back to the static map.
  const profile =
    postsByAuthor[0].authorsData.find((a) => a.username === author) ??
    authors[author];

  const displayName = profile?.name ?? author;

  return (
    <main className="relative z-0">
      <Bg />

      <header className="pt-16 md:pt-24">
        <Container className="max-w-screen-md">
          <div className="mb-8">
            <Link
              className="text-sm text-text-mute transition hover:text-primary-text hover:underline"
              href="/blog"
            >
              ← Back to all posts
            </Link>
          </div>

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            {profile?.image && (
              <Image
                width={96}
                height={96}
                alt={displayName}
                src={profile.image}
                className="aspect-square shrink-0 rounded-full object-cover"
              />
            )}

            <div className="flex flex-col items-start gap-2">
              <p className="font-mono text-sm">
                <span className="opacity-40">blog/author/</span>
                <span className="font-semibold text-primary-text">
                  {author}
                </span>
              </p>
              <h1 className="font-display text-3xl font-bold !leading-title md:text-4xl">
                {displayName}
              </h1>
              {profile?.title && (
                <p className="text-lg opacity-60">{profile.title}</p>
              )}

              <div className="mt-1 flex items-center gap-4">
                <span className="text-sm text-text-mute">
                  {postsByAuthor.length}{" "}
                  {postsByAuthor.length === 1 ? "post" : "posts"}
                </span>
                {profile && (
                  <AuthorSocials author={profile} className="-ml-1.5" />
                )}
              </div>
            </div>
          </div>
        </Container>
      </header>

      <section className="py-12 md:py-16">
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
