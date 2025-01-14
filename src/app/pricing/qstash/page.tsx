"use client";

import QStashFaqJson from "@/../public/faq/qstash.json";
import PricingLayout from "@/../src/app/pricing/layout";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/qstash/compare-table";
import Enterprise from "@/components/pricing/qstash/enterprise";
import FAQ from "@/components/pricing/qstash/faq";
import PricingTable from "@/components/pricing/qstash/pricing-table";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

export const metadata = {
  title: "QStash Pricing",
  description: "Pay as you go for reliable, scalable message queuing.",
};

export default function PricingQStashPage() {
  const structuredFaqSchema = generateFaqSchema(QStashFaqJson);

  return (
    <PricingLayout
      pageTitle="QStash Pricing"
      pageDescription="Pay as you go for reliable, scalable message queuing."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />
      <ProductToggle product="/qstash" />

      <div className="mt-16 md:mt-20">
        <PricingTable />
        <div className="mt-10 md:mt-20">
          <Enterprise />
        </div>

        <div className="mt-32 md:mt-40">
          <header>
            <h2 className="md:text-4xl">Compare Plans</h2>
            <p className="mt-2 md:text-xl">Plans that scale to all sizes.</p>
          </header>

          <div className="mt-12 md:mt-16">
            <CompareTable />
          </div>
        </div>

        <div className="mt-32 md:mt-40">
          <div className="max-w-screen-md mx-auto">
            <h2 className="mb md:text-4xl">FAQ</h2>
            <div className="mt-10">
              <FAQ />
            </div>
          </div>
        </div>
      </div>
    </PricingLayout>
  );
}
