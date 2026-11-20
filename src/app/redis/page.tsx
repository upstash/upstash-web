import { CTA, FEATURES, HERO, USE_CASES, WHAT_IS } from "@/app/redis/content";
import { REDIS_FAQ } from "@/app/redis/faq";
import SectionSkills from "@/app/redis/section-skills";
import SectionCta from "@/components/product-page/section-cta";
import SectionFaq from "@/components/product-page/section-faq";
import SectionFeatures from "@/components/product-page/section-features";
import SectionHero from "@/components/product-page/section-hero";
import SectionUseCases from "@/components/product-page/section-use-cases";
import SectionWhatIs from "@/components/product-page/section-what-is";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import type { Metadata } from "next";

const title = "Redis Database";
const description =
  "Upstash is a serverless Redis database with low latency, durable storage, and pay-as-you-go pricing. Create a fully managed Redis database in the cloud in seconds.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "redis database",
    "serverless redis",
    "managed redis",
    "redis cache",
    "redis cloud",
    "kv database",
  ],
  alternates: {
    canonical: "/redis",
  },
  openGraph: {
    type: "website",
    title: `${title} | Upstash`,
    description,
    url: "/redis",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Upstash`,
    description,
  },
};

export default function RedisPage() {
  const faqSchema = generateFaqSchema({ faq: REDIS_FAQ });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />

      <main className="text-center">
        <SectionHero {...HERO} />
        <SectionFeatures {...FEATURES} />
        <SectionUseCases {...USE_CASES} />
        <SectionSkills />
        <SectionWhatIs {...WHAT_IS} />
        <SectionFaq items={REDIS_FAQ} />
        <SectionCta {...CTA} />
      </main>
    </>
  );
}
