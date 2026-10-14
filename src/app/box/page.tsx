import { BOX_FAQ } from "@/app/box/faq";
import SectionCode from "@/app/box/section-code";
import SectionCta from "@/app/box/section-cta";
import SectionFeatures from "@/app/box/section-features";
import SectionHero from "@/app/box/section-hero";
import SectionMcp from "@/app/box/section-mcp";
import SectionUseCases from "@/app/box/section-use-cases";
import SectionWhatIs from "@/app/box/section-what-is";
import SectionFaq from "@/app/redis/section-faq";
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
        <SectionHero />
        <SectionFeatures />
        <SectionCode />
        <SectionMcp />
        <SectionUseCases />
        <SectionWhatIs />
        <SectionFaq items={BOX_FAQ} />
        <SectionCta />
      </main>
    </>
  );
}
