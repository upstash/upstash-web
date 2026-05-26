import PostCard from "@/components/blog/post-card";
import Container from "@/components/container";
import { normalizeTag, normalizeTagParam } from "@/utils/tags";
import { uniq } from "lodash";
import Link from "next/link";
import { notFound } from "next/navigation";
import { extractExcerpt, getData } from "../../utils/helpers";

const COLS = 3;

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

export default async function BlogTagPage({ params: { tag } }: Props) {
  const normalized = normalizeTagParam(tag);
  const posts = await getData();
  const postsWithTag = posts.filter((post) =>
    post.tags.some((t) => normalizeTag(t) === normalized),
  );

  if (postsWithTag.length === 0) {
    notFound();
  }

  const fillers = (COLS - (postsWithTag.length % COLS)) % COLS;

  return (
    <main className="relative z-0">
      <Container className="pt-16 md:pt-24">
        <div className="w-fit py-10 pl-7 pr-10 text-text md:pl-10 md:pr-20">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Articles tagged {normalized}.
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
            {postsWithTag.map((post) => (
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
