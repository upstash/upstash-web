import Bg from "@/components/bg";
import Container from "@/components/container";
import PageBodyGradient from "@/components/page-body-gradient";
import { Mdx } from "@/components/post/mdx";
import { SITE_URL } from "@/utils/const";
import { allTrustDocs } from "@content";
import { IconFileTypePdf } from "@tabler/icons-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

// the PDFs live next to these pages in public/trust, so only known slugs render
export const dynamicParams = false;

export async function generateStaticParams(): Promise<
  Awaited<Props["params"]>[]
> {
  return allTrustDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const doc = allTrustDocs.find((doc) => doc.slug === params.slug);
  if (!doc) {
    return {};
  }

  const url = `${SITE_URL}/trust/${doc.slug}`;

  return {
    title: doc.title,
    description: doc.description,
    alternates: {
      canonical: `/trust/${doc.slug}`,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: doc.title,
      description: doc.description,
      siteName: "Upstash",
      images: "/og-home.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      site: "@upstash",
      creator: "@upstash",
      images: "/og-home.jpg",
    },
  };
}

export default async function TrustDocPage(props: Props) {
  const params = await props.params;
  const doc = allTrustDocs.find((doc) => doc.slug === params.slug);

  if (!doc) {
    notFound();
  }

  return (
    <main className="relative z-0">
      <Bg />

      <article>
        <header className="py-16 text-center md:py-20">
          <Container className="max-w-screen-lg">
            <h1 className="mx-4 text-balance font-display text-3xl font-bold !leading-title md:text-5xl">
              {doc.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-text-mute">
              {doc.updated && <span>{doc.updated}</span>}
              <a
                href={doc.pdf}
                target="_blank"
                className="inline-flex items-center gap-1 hover:text-primary hover:underline"
                rel="noreferrer"
              >
                <IconFileTypePdf size={18} />
                Download PDF
              </a>
            </div>
          </Container>
        </header>

        <div className="relative z-0 pb-20 pt-10">
          <PageBodyGradient />

          <Container className="legal max-w-screen-md">
            <Mdx code={doc.mdx} />
          </Container>
        </div>
      </article>
    </main>
  );
}
