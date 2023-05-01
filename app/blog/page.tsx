import getData from "./get-data";
import PostGrid from "@/components/blog/grid/grid";
import PopularTag from "@/components/blog/popular-tag/popular-tag";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Container from "@/components/container";
import cx from "@/utils/cx";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <main className="relative z-0">
      <div
        className={cx(
          "absolute left-1/2 -z-10 h-[400px] w-4/5",
          "-translate-x-1/2",
          "bg-emerald-500 opacity-5 blur-[100px]"
        )}
      />

      {/* TODO: blog yazmak isteyenler için bir uyarı */}

      <header className="py-20 text-center">
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

      <section className="relative z-0 mt-6">
        {/*<PageBodyGradient className="opacity-40" />*/}

        {/* grid */}
        <PostGrid data={posts.slice(0, 20)} views={views} />
      </section>
    </main>
  );
}
