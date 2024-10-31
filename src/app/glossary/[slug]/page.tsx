import Bg from "@/components/bg";
import Container from "@/components/container";
import { Mdx } from "@/components/post/mdx";
import { allGlossaries, Glossary } from "@content";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  const glossary = allGlossaries.find(
    (glossary: Glossary) => glossary.slug === params.slug,
  ) as Glossary;

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

      <article className="py-16">
        <Container className="max-w-screen-md">
          <Link className="text-emerald-600 hover:underline" href="/glossary">
            ← Back to Glossary
          </Link>

          <header className="mt-8">
            <h1 className="text-4xl font-semibold">{glossary.title}</h1>
            <h3 className="text-lg opacity-60">{glossary.summary}</h3>
          </header>

          <section className="mt-8">
            <Mdx code={glossary.mdx} />
          </section>
        </Container>
      </article>
    </main>
  );
}
