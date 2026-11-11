import { CTA, FEATURES, HERO, USE_CASES, WHAT_IS } from "@/app/qstash/content";
import { QSTASH_FAQ } from "@/app/qstash/faq";
import SectionCode from "@/app/qstash/section-code";
import SectionCta from "@/components/product-page/section-cta";
import SectionFaq from "@/components/product-page/section-faq";
import SectionFeatures from "@/components/product-page/section-features";
import SectionHero from "@/components/product-page/section-hero";
import SectionUseCases from "@/components/product-page/section-use-cases";
import SectionWhatIs from "@/components/product-page/section-what-is";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import type { Metadata } from "next";

const title = "Serverless Message Queue";
const description =
  "Upstash QStash is a serverless message queue and task scheduler over HTTP: background jobs, cron schedules, delays, retries, and fan-out for Next.js, Vercel, Cloudflare Workers, and any HTTP endpoint, with no workers to run.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "message queue",
    "serverless message queue",
    "serverless queue",
    "background jobs",
    "cron jobs",
    "task scheduler",
    "webhook delivery",
    "http message queue",
  ],
  alternates: {
    canonical: "/qstash",
  },
  openGraph: {
    type: "website",
    title: `${title} | Upstash`,
    description,
    url: "/qstash",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Upstash`,
    description,
  },
};

export default function QStashPage() {
  const faqSchema = generateFaqSchema({ faq: QSTASH_FAQ });

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
        <SectionFaq items={QSTASH_FAQ} />
        <SectionCta {...CTA} />
      </main>
    </>
  );
}
