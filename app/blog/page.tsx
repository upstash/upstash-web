import getData from "./get-data";
import PostGrid from "@/components/blog/grid/grid";
import PopularTag from "@/components/blog/popular-tag/popular-tag";
import PageHeaderDesc from "@/components/app/page-header-desc";
import PageHeaderTitle from "@/components/app/page-header-title";
import Container from "@/components/container";
import PageBodyGradient from "@/components/app/page-body-gradient";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <>
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

      <div className="relative z-0 pt-20">
        <PageBodyGradient className="opacity-40" />

        {/* grid */}
        <PostGrid data={posts.slice(0, 20)} views={views} />
      </div>
    </>
  );
}
