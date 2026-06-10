import Bg from "@/components/bg";
import PopularTag from "@/components/blog/popular-tag";
import BlogSearch from "@/components/blog/search";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { BANNED_TAGS, SITE_URL } from "@/utils/const";
import { generateBlogListSchema } from "@/utils/structured-schema-generators";
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
    ({ slug, title, description, tags, date, authorsData }) => ({
      slug,
      title,
      description,
      tags,
      date,
      authorsData,
    }),
  );

  // Expose each post's description to crawlers via structured data (not visible
  // in the UI). Falls back to an auto-generated excerpt when a post has no
  // frontmatter description.
  const structuredBlogListSchema = generateBlogListSchema({
    url: `${SITE_URL}/blog`,
    name: "Upstash Blog",
    description: "Articles and tutorials from Upstash and community.",
    posts: posts.map((post) => ({
      title: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: new Date(post.publishedAt ?? post.date).toISOString(),
      description: post.description || extractExcerpt(post.content),
      authors: post.authorsData.map((author) => author.name),
    })),
  });

  return (
    <main className="relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredBlogListSchema,
        }}
      />
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
