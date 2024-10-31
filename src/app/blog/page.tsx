import Bg from "@/components/bg";
import PostGridCard from "@/components/blog/grid-item";
import PopularTag from "@/components/blog/popular-tag";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { BANNED_TAGS } from "@/utils/const";
import type { Post } from "@content";
import { countBy, flatten, omit } from "lodash";
import Link from "next/link";
import { getData } from "./utils/helpers";

export default async function BlogPage() {
  const posts = await getData(10);

  const _tags = omit(
    countBy(flatten(posts.map((post) => post.tags))),
    BANNED_TAGS,
  );
  const tags = Object.entries(_tags).sort((a, b) => b[1] - a[1]);

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-10 text-center md:py-20">
        <Container>
          <PageHeaderTitle>Blog</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Articles and tutorials from Upstash and community.
          </PageHeaderDesc>

          <div className="mt-10">
            <PopularTag data={tags.slice(0, 12)} />
          </div>
        </Container>
      </header>

      <section className="mt-6">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {posts.map((post: Post) => {
              return <PostGridCard key={post.slug} data={post} />;
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              className="flex justify-center gap-1 rounded-full bg-emerald-400 px-5 py-3 text-emerald-950 transition"
              href={`/blog/all`}
            >
              Show all posts
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
