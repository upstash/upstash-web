import { notFound } from "next/navigation";

import { allGlossaries } from "@content";
import type { Job } from "@content";

import Bg from "@/components/bg";
import Container from "@/components/container";
import { Mdx } from "@/components/post/mdx";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allGlossaries
    .filter((job) => !job.draft)
    .map((job) => ({
      slug: job.slug,
    }));
}

export async function generateMetadata({
                                         params,
                                       }: {
  params: Props["params"];
}) {
  const glossary = allGlossaries.find((job: Job) => job.slug === params.slug) as Job;
  // const url = `${SITE_URL}/glossary/${glossary.slug}`;

  return {
    title: glossary.title,
    description: glossary.summary,
  };
}

export default async function BlogPage({ params }: Props) {
  const slug = params?.slug;
  const glossary = allGlossaries.find((job) => job.slug === slug);

  if (!glossary) {
    notFound();
  }

  return (
    <main className="relative z-0">
      <Bg />

      <article>
        <Container className="max-w-screen-md">
          <h1>
            {glossary.title}
          </h1>
          <h3>
            {glossary.summary}
          </h3>

          <hr/>

          <Mdx code={glossary.mdx} />
        </Container>
      </article>
    </main>
  );
}
