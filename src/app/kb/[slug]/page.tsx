import Bg from "@/components/bg";
import Container from "@/components/container";
import { formatKbDate, KbAvatar, KbGrid } from "@/components/kb/card";
import { KbMarkdown } from "@/components/kb/markdown";
import { TopicIcon } from "@/components/kb/topic-toggle";
import PageBodyGradient from "@/components/page-body-gradient";
import {
  getKbArticle,
  getKbArticles,
  kbBlogSlug,
  kbExcerpt,
  kbReadingMinutes,
  topicName,
  topicSlug,
  type KbArticle,
} from "@/lib/kb";
import { SITE_URL } from "@/utils/const";
import {
  generateBlogSchema,
  generateBreadcrumbSchema,
} from "@/utils/structured-schema-generators";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams(): Promise<
  Awaited<Props["params"]>[]
> {
  // When ByDefault doesn't answer, each page is built on its first visit.
  const articles = await getKbArticles().catch(() => []);
  return articles.map((article) => ({ slug: article.slug }));
}

const pageUrl = (article: KbArticle) => `${SITE_URL}/kb/${article.slug}`;

const metaDescription = (article: KbArticle) => {
  const excerpt = kbExcerpt(article);
  return excerpt.length > 160 ? `${excerpt.slice(0, 157).trimEnd()}…` : excerpt;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const article = await getKbArticle((await props.params).slug);
  if (!article) {
    return {};
  }
  const description = metaDescription(article);
  return {
    title: article.title,
    description,
    authors: article.authors.map((author) => ({ name: author.name })),
    alternates: { canonical: `/kb/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: pageUrl(article),
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.authors.map((author) => author.name),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
    },
  };
}

export default async function KbArticlePage(props: Props) {
  const { slug } = await props.params;
  const blogSlug = await kbBlogSlug(slug);
  if (blogSlug) {
    permanentRedirect(`/blog/${blogSlug}`);
  }
  const article = await getKbArticle(slug);
  if (!article) {
    notFound();
  }

  const topic = article.topic
    ? {
        name: topicName(article.topic.name),
        slug: topicSlug(article.topic.name),
      }
    : null;

  // Three more from the same topic, topped up with the latest.
  const articles = await getKbArticles();
  const sameTopic = articles.filter(
    (other) => article.topic && other.topic?.id === article.topic.id,
  );
  const more = [...sameTopic, ...articles]
    .filter(
      (other, i, all) =>
        other.id !== article.id &&
        all.findIndex((o) => o.id === other.id) === i,
    )
    .slice(0, 3);
  const moreTitle =
    topic && more.every((other) => other.topic?.id === article.topic?.id)
      ? `More on ${topic.name}`
      : "More from the knowledge base";

  const blogSchema = generateBlogSchema({
    headline: article.title,
    description: metaDescription(article),
    keywords: topic ? [topic.name] : [],
    authors: article.authors.map((author) => ({ name: author.name })),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    url: pageUrl(article),
    image: `${pageUrl(article)}/opengraph-image`,
    readingTimeMinutes: kbReadingMinutes(article),
  });
  const breadcrumbSchema = generateBreadcrumbSchema({
    items: [
      { name: "Home", url: SITE_URL },
      { name: "Knowledge Base", url: `${SITE_URL}/kb` },
      ...(topic
        ? [{ name: topic.name, url: `${SITE_URL}/kb/topics/${topic.slug}` }]
        : []),
      { name: article.title, url: pageUrl(article) },
    ],
  });

  return (
    <main className="relative z-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogSchema }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <Bg />

      <article>
        {/* The blog's post header, under the way back to the index. */}
        <header className="py-20 text-center">
          <Container className="max-w-screen-lg">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center justify-center gap-2 font-medium"
            >
              <Link
                href="/kb"
                className="opacity-60 transition hover:opacity-100"
              >
                Knowledge Base
              </Link>
              {topic && (
                <>
                  <span className="opacity-30">/</span>
                  <Link
                    href={`/kb/topics/${topic.slug}`}
                    className="flex items-center gap-1.5 opacity-60 transition hover:opacity-100"
                  >
                    <TopicIcon slug={topic.slug} width={18} />
                    {topic.name}
                  </Link>
                </>
              )}
            </nav>

            <h1 className="mx-4 mt-4 text-balance font-display text-4xl font-bold !leading-title md:text-6xl">
              {article.title}
            </h1>

            <div className="mt-8 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-8">
              {article.authors.map((author) => (
                <div
                  key={author.name}
                  className="flex items-center gap-3 text-left"
                >
                  <KbAvatar author={author} size={44} />
                  <span className="font-medium">{author.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 opacity-40">
              <time dateTime={article.publishedAt}>
                {formatKbDate(article.publishedAt)}
              </time>
              <span>·</span>
              <span>{kbReadingMinutes(article)} min read</span>
            </div>
          </Container>
        </header>

        <div className="relative z-0 pt-10">
          <PageBodyGradient isBlogPage />

          <Container className="max-w-screen-md">
            <div className="post leading-p">
              <KbMarkdown markdown={article.content} />
            </div>
          </Container>
        </div>
      </article>

      {more.length > 0 && (
        <section className="mt-24 md:mt-32">
          <Container>
            <div className="flex items-baseline justify-between gap-6">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                {moreTitle}
              </h2>
              <Link
                href={topic ? `/kb/topics/${topic.slug}` : "/kb"}
                className="shrink-0 font-medium text-primary-text hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="mt-8">
              <KbGrid articles={more} />
            </div>
          </Container>
        </section>
      )}
    </main>
  );
}
