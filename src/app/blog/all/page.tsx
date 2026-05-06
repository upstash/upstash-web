import Bg from "@/components/bg";
import BlogAllSearch from "@/components/blog/search-all";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { getData } from "../utils/helpers";

export default async function BlogPage() {
  const posts = await getData();

  const searchPosts = posts.map(
    ({ slug, title, description, tags, date, authorsData }) => ({
      slug,
      title,
      description,
      tags,
      date,
      authorsData,
    }),
  );

  return (
    <main className="relative z-0">
      <Bg />

      <header className="pt-10 text-center md:pt-20">
        <Container className="max-w-screen-lg">
          <PageHeaderTitle>Blog</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Articles and tutorials from Upstash and community.
          </PageHeaderDesc>

          <BlogAllSearch posts={searchPosts} />
        </Container>
      </header>
    </main>
  );
}
