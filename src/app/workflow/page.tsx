import SectionFaq from "@/app/redis/section-faq";
import { WORKFLOW_FAQ } from "@/app/workflow/faq";
import SectionCode from "@/app/workflow/section-code";
import SectionCta from "@/app/workflow/section-cta";
import SectionFeatures from "@/app/workflow/section-features";
import SectionHero from "@/app/workflow/section-hero";
import SectionUseCases from "@/app/workflow/section-use-cases";
import SectionWhatIs from "@/app/workflow/section-what-is";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import type { Metadata } from "next";

const title = "Durable Workflows";
const description =
  "Upstash Workflow brings durable execution to serverless functions: multi-step workflows that survive failures and timeouts, sleep for days, wait for events, and retry each step on its own, on Next.js, Cloudflare Workers, FastAPI, and more.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "durable execution",
    "durable workflows",
    "serverless workflows",
    "workflow orchestration",
    "long running functions",
    "step functions",
    "nextjs background jobs",
    "ai agent orchestration",
  ],
  alternates: {
    canonical: "/workflow",
  },
  openGraph: {
    type: "website",
    title: `${title} | Upstash`,
    description,
    url: "/workflow",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Upstash`,
    description,
  },
};

export default function WorkflowPage() {
  const faqSchema = generateFaqSchema({ faq: WORKFLOW_FAQ });

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
        <SectionFaq items={WORKFLOW_FAQ} />
        <SectionCta />
      </main>
    </>
  );
}
