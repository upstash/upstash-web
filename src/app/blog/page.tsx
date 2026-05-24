import PostCard from "@/components/blog/post-card";
import Container from "@/components/container";
import { extractExcerpt, getData } from "./utils/helpers";

const COLS = 3;

export default async function BlogPage() {
  const posts = await getData();
  const fillers = (COLS - (posts.length % COLS)) % COLS;

  return (
    <main className="relative z-0">
      <Container className="pt-16 md:pt-24">
        <div className="w-fit py-10 pl-7 pr-10 text-white md:pl-10 md:pr-20">
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl">
            Latest blog articles.
          </h1>
        </div>

        <div className="bg-white/10 p-px">
          <div className="grid gap-px md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
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
