import { Post } from "contentlayer/generated";
import { div } from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";

import Bg from "@/components/bg";
import PostListCard from "@/components/blog/list-item";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

import { getData } from "../utils/helpers";

export default async function BlogPage() {
  const posts = await getData();

  const postsByMonth = posts.reduce((acc, post) => {
    const date = new Date(post.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const key = `${month} ${year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(post);
    return acc;
  }, {});

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-10 text-center md:py-20">
        <Container>
          <PageHeaderTitle>Blog</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Articles and tutorials from Upstash and community.
          </PageHeaderDesc>
        </Container>
      </header>

      <section className="mt-6">
        <Container className="max-w-screen-lg">
          <div className="grid gap-10 md:gap-14">
            {Object.keys(postsByMonth).map((key) => {
              const posts: Post[] = postsByMonth[key];
              return (
                <div key={key}>
                  <h4 className="pl-2 font-display text-2xl font-medium opacity-40 dark:opacity-20">
                    {key}
                  </h4>
                  <div className="mt-2 grid gap-0.5">
                    {posts.map((post) => {
                      return <PostListCard key={post.slug} data={post} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
