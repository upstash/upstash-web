import { BLOB_FAQ } from "@/app/blob/faq";
import SectionCode from "@/app/blob/section-code";
import SectionCta from "@/app/blob/section-cta";
import SectionFeatures from "@/app/blob/section-features";
import SectionHero from "@/app/blob/section-hero";
import SectionUseCases from "@/app/blob/section-use-cases";
import SectionWhatIs from "@/app/blob/section-what-is";
import SectionFaq from "@/app/redis/section-faq";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import { Metadata } from "next";

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
        <SectionHero />
        <SectionFeatures />
        <SectionCode />
        <SectionUseCases />
        <SectionWhatIs />
        <SectionFaq items={BLOB_FAQ} />
        <SectionCta />
      </main>
    </>
  );
}
