import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allGlossaries,
  Glossary,
} from "../../../.content-collections/generated";
import Bg from "../../../src/components/bg";
import Container from "../../../src/components/container";
import { Mdx } from "../../../src/components/post/mdx";

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
          <Link
            className="group inline-flex h-10 items-center justify-center gap-2 rounded-full bg-white/5 px-4 hover:w-auto hover:bg-white/10 hover:text-emerald-500"
            href="/glossary"
          >
            <IconArrowLeft className="shrink-0 opacity-50 group-hover:opacity-100" />
            <span className="hidden group-hover:block">Back to Glossary</span>
          </Link>

          <header className="mt-10">
            <h1 className="text-4xl font-semibold">{glossary.title}</h1>
            <h3 className="text-lg opacity-60">{glossary.summary}</h3>
          </header>

          <section className="mt-10">
            <Mdx code={glossary.mdx} />
          </section>

          {/* Other Post */}
          <div className="mt-10 border-t border-t-zinc-800 pt-10">
            <h5 className="uppercase opacity-50">See also;</h5>

            <ul className="list-inside list-disc">
              {glossary.relations?.map((slug) => {
                const glossary = allGlossaries.find(
                  (glossary) => glossary.slug === slug,
                );

                if (!glossary) {
                  return null;
                }

                return (
                  <li key={glossary.slug}>
                    <Link
                      href={`/archive/glossary/${glossary.slug}`}
                      className="text-emerald-500 hover:underline"
                    >
                      {glossary.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </article>
    </main>
  );
}
