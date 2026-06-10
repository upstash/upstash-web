import Bg from "@/components/bg";
import PopularTag from "@/components/blog/popular-tag";
import BlogSearch from "@/components/blog/search";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { BANNED_TAGS } from "@/utils/const";
import { normalizeTag } from "@/utils/tags";
import { countBy, flatten, omit } from "lodash";
import { extractExcerpt, getData } from "./utils/helpers";

export default async function BlogPage() {
  const posts = await getData();

  const _tags = omit(
    countBy(flatten(posts.map((post) => post.tags.map(normalizeTag)))),
    BANNED_TAGS.map(normalizeTag),
  );
  const tags = Object.entries(_tags).sort((a, b) => b[1] - a[1]);

  const searchPosts = posts.map(
    ({ slug, title, description, tags, date, authorsData, content }) => ({
      slug,
      title,
      description,
      tags,
      date,
      authorsData,
      excerpt: description ? undefined : extractExcerpt(content),
    }),
  );

  return (
    <main className="relative z-0">
      <Bg />

      <header className="pt-10 text-center md:pt-20">
        <Container>
          <PageHeaderTitle>Blog</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Articles and tutorials from Upstash and community.
          </PageHeaderDesc>

          <div className="mt-10">
            <PopularTag data={tags.slice(0, 12)} />
          </div>

          <BlogSearch posts={searchPosts} />
        </Container>
      </header>
    </main>
  );
}
