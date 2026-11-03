import { CTA, FEATURES, HERO, USE_CASES, WHAT_IS } from "@/app/vector/content";
import { VECTOR_FAQ } from "@/app/vector/faq";
import SectionCode from "@/app/vector/section-code";
import SectionCta from "@/components/product-page/section-cta";
import SectionFaq from "@/components/product-page/section-faq";
import SectionFeatures from "@/components/product-page/section-features";
import SectionHero from "@/components/product-page/section-hero";
import SectionUseCases from "@/components/product-page/section-use-cases";
import SectionWhatIs from "@/components/product-page/section-what-is";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import type { Metadata } from "next";

const title = "Serverless Vector Database";
const description =
  "Upstash Vector is a serverless vector database for RAG, semantic search, and AI apps: built-in embedding models, hybrid search, metadata filtering, and namespaces, priced per request with no idle cost.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "vector database",
    "serverless vector database",
    "vector search",
    "semantic search",
    "embeddings database",
    "rag database",
    "hybrid search",
    "vector store",
  ],
  alternates: {
    canonical: "/vector",
  },
  openGraph: {
    type: "website",
    title: `${title} | Upstash`,
    description,
    url: "/vector",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Upstash`,
    description,
  },
};

export default function VectorPage() {
  const faqSchema = generateFaqSchema({ faq: VECTOR_FAQ });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <main className="text-center">
        <SectionHero {...HERO} />
        <SectionFeatures {...FEATURES} />
        <SectionCode />
        <SectionUseCases {...USE_CASES} />
        <SectionWhatIs {...WHAT_IS} />
        <SectionFaq items={VECTOR_FAQ} />
        <SectionCta {...CTA} />
      </main>
    </>
  );
}
