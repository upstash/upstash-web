import SectionCta from "@/app/redis/section-cta";
import SectionFaq from "@/app/redis/section-faq";
import SectionFeatures from "@/app/redis/section-features";
import SectionHero from "@/app/redis/section-hero";
import SectionSkills from "@/app/redis/section-skills";
import SectionUseCases from "@/app/redis/section-use-cases";
import SectionWhatIs from "@/app/redis/section-what-is";
import { REDIS_FAQ } from "@/app/redis/faq";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import { Metadata } from "next";

const title = "Redis Database";
const description =
  "Upstash is a serverless, fully managed Redis database with low latency, durable storage, and pay-as-you-go pricing. Create a managed Redis database in seconds.";

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
        <SectionHero />
        <SectionFeatures />
        <SectionUseCases />
        <SectionSkills />
        <SectionWhatIs />
        <SectionFaq items={REDIS_FAQ} />
        <SectionCta />
      </main>
    </>
  );
}
