import { KbGrid } from "@/components/kb/card";
import { getKbArticles, kbTopics } from "@/lib/kb";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams(): Promise<
  Awaited<Props["params"]>[]
> {
  // When ByDefault doesn't answer, each page is built on its first visit.
  const articles = await getKbArticles().catch(() => []);
  return kbTopics(articles).map((topic) => ({
    topic: topic.slug,
  }));
}

async function load(params: Props["params"]) {
  const { topic: slug } = await params;
  const articles = await getKbArticles();
  const topic = kbTopics(articles).find((topic) => topic.slug === slug);
  if (!topic) {
    return null;
  }
  return {
    topic,
    articles: articles.filter((article) => article.topic?.id === topic.id),
  };
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const loaded = await load(props.params);
  if (!loaded) {
    return {};
  }
  const { topic } = loaded;
  return {
    title: topic.name,
    description: `Guides, comparisons and how-tos on Upstash ${topic.name}.`,
    alternates: { canonical: `/kb/topics/${topic.slug}` },
  };
}

export default async function KbTopicPage(props: Props) {
  const loaded = await load(props.params);
  if (!loaded) {
    notFound();
  }
  return <KbGrid articles={loaded.articles} />;
}
