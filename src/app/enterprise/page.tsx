import EnterpriseCobe from "@/app/enterprise/cobe";
import SectionContact from "@/app/enterprise/section-contact";
import SectionCustomer from "@/app/enterprise/section-customer";
import SectionFeature from "@/app/enterprise/section-feature";
import SectionHero from "@/app/enterprise/section-hero";
import SectionWhy from "@/app/enterprise/section-why";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise",
  description: "Unlock the full potential of Upstash for your business.",
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
