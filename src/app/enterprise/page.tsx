import EnterpriseCobe from "@/app/enterprise/cobe";
import SectionContact from "@/app/enterprise/section-contact";
import SectionCustomer from "@/app/enterprise/section-customer";
import SectionFeature from "@/app/enterprise/section-feature";
import SectionHero from "@/app/enterprise/section-hero";
import SectionWhy from "@/app/enterprise/section-why";
import { Metadata } from "next";

const title = "Enterprise";
const description =
  "Upstash for Enterprise — dedicated infrastructure, SLAs, priority support, and custom plans for teams that need production-grade serverless Redis, Vector, and QStash.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/enterprise",
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: "/enterprise",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function HomePage() {
  return (
    <main className="text-center">
      <SectionHero />
      <EnterpriseCobe />
      <SectionFeature />
      <SectionWhy />
      <SectionCustomer />
      <SectionContact />
    </main>
  );
}
