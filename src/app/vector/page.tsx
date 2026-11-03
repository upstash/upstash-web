import SectionFaq from "@/app/redis/section-faq";
import { VECTOR_FAQ } from "@/app/vector/faq";
import SectionCode from "@/app/vector/section-code";
import SectionCta from "@/app/vector/section-cta";
import SectionFeatures from "@/app/vector/section-features";
import SectionHero from "@/app/vector/section-hero";
import SectionUseCases from "@/app/vector/section-use-cases";
import SectionWhatIs from "@/app/vector/section-what-is";
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
        <SectionHero />
        <SectionFeatures />
        <SectionCode />
        <SectionUseCases />
        <SectionWhatIs />
        <SectionFaq items={VECTOR_FAQ} />
        <SectionCta />
      </main>
    </>
  );
}
