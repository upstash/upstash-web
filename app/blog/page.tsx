import getData from "./get-data";
import PostGrid from "@/components/blog/grid";
import PopularTag from "@/components/blog/popular-tag";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Container from "@/components/container";
import PageBodyGradient from "@/components/page-body-gradient";

export default async function BlogPage() {
  const { posts, views, tags } = await getData();

  return (
    <>
      <header className="py-20 text-center">
        <Container>
          <PageHeaderTitle>Blog</PageHeaderTitle>
          <PageHeaderDesc>
            Articles and tutorials from Upstash and community.
          </PageHeaderDesc>

          <div className="mt-8">
            <PopularTag data={tags.slice(0, 12)} />
          </div>
        </Container>
      </header>

      <div className="relative z-10 pt-20">
        <PageBodyGradient className="opacity-40" />

        {/* grid */}
        <PostGrid data={posts.slice(0, 20)} views={views} />
      </div>
    </>
  );
}
