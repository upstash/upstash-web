import getData from "./get-data";
import PopularTag from "@/components/blog/popular-tag";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Container from "@/components/container";
import Bg from "@/components/bg";
import { countBy, flatten, omit } from "lodash";
import { BANNED_TAGS } from "@/utils/const";
import Link from "next/link";
import { Post } from "contentlayer/generated";
import PostGridCard from "@/components/blog/grid-item";

export default async function BlogPage() {
  const posts = await getData();

  const _tags = omit(
    countBy(flatten(posts.map((post) => post.tags))),
    BANNED_TAGS
  );
  const tags = Object.entries(_tags).sort((a, b) => b[1] - a[1]);

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-10 text-center md:py-20">
        <Container>
          <div>{process.env.VERCEL_URL}</div>
          <PageHeaderTitle>Blog</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Articles and tutorials from Upstash and community.
          </PageHeaderDesc>

          <div className="mt-10">
            <PopularTag data={tags.slice(0, 12)} />
          </div>
        </Container>
      </header>

      <section className="relative z-0 mt-6">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {posts.slice(0, 20).map((post: Post) => {
              return <PostGridCard key={post.slug} data={post} />;
            })}
          </div>
        </Container>

        <div className="mt-10">
          <Link href={`/blog/all`}>Show all posts</Link>
        </div>
      </section>
    </main>
  );
}
