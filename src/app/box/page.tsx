import { CTA, FEATURES, HERO, USE_CASES, WHAT_IS } from "@/app/box/content";
import { BOX_FAQ } from "@/app/box/faq";
import SectionCode from "@/app/box/section-code";
import SectionMcp from "@/app/box/section-mcp";
import SectionCta from "@/components/product-page/section-cta";
import SectionFaq from "@/components/product-page/section-faq";
import SectionFeatures from "@/components/product-page/section-features";
import SectionHero from "@/components/product-page/section-hero";
import SectionUseCases from "@/components/product-page/section-use-cases";
import SectionWhatIs from "@/components/product-page/section-what-is";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import type { Metadata } from "next";

const title = "Box: Cloud Computers for AI Agents";
const description =
  "Upstash Box is a persistent cloud computer for AI agents, with Claude Code, Codex and OpenCode built in. Run an agent, give it a browser and a repository, and get results back through an API. Billed for active CPU only, with memory free.";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "ai agent sandbox",
    "cloud computer for ai agents",
    "sandbox for ai agents",
    "code execution sandbox",
    "run claude code in the cloud",
    "background coding agent",
    "remote development environment for ai agents",
    "e2b alternative",
  ],
  alternates: {
    canonical: "/box",
  },
  openGraph: {
    type: "website",
    title: `${title} | Upstash`,
    description,
    url: "/box",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Upstash`,
    description,
  },
};

export default function BoxPage() {
  const faqSchema = generateFaqSchema({ faq: BOX_FAQ });

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
        <SectionMcp />
        <SectionUseCases {...USE_CASES} />
        <SectionWhatIs {...WHAT_IS} />
        <SectionFaq items={BOX_FAQ} />
        <SectionCta {...CTA} />
      </main>
    </>
  );
}
