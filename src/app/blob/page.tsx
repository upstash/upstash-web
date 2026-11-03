import { CTA, FEATURES, HERO, USE_CASES, WHAT_IS } from "@/app/blob/content";
import { BLOB_FAQ } from "@/app/blob/faq";
import SectionCode from "@/app/blob/section-code";
import SectionCta from "@/components/product-page/section-cta";
import SectionFaq from "@/components/product-page/section-faq";
import SectionFeatures from "@/components/product-page/section-features";
import SectionHero from "@/components/product-page/section-hero";
import SectionUseCases from "@/components/product-page/section-use-cases";
import SectionWhatIs from "@/components/product-page/section-what-is";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import type { Metadata } from "next";

const title = "Blob Storage";
const description =
  "Upstash Blob is S3-compatible object storage for Next.js and web apps: direct browser uploads with a React hook, a global CDN, public or private buckets, and 1 TB of free egress a month on pay-as-you-go.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "blob storage",
    "object storage",
    "serverless storage",
    "s3 compatible storage",
    "file uploads",
    "browser uploads",
    "nextjs file storage",
    "nextjs object storage",
  ],
  alternates: {
    canonical: "/blob",
  },
  openGraph: {
    type: "website",
    title: `${title} | Upstash`,
    description,
    url: "/blob",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Upstash`,
    description,
  },
};

export default function BlobPage() {
  const faqSchema = generateFaqSchema({ faq: BLOB_FAQ });

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
        <SectionFaq items={BLOB_FAQ} />
        <SectionCta {...CTA} />
      </main>
    </>
  );
}
