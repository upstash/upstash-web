"use client";

import VectorFaqJson from "@/../public/faq/vector.json";
import PricingLayout from "@/../src/app/pricing/layout";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/vector/compare-table";
import Enterprise from "@/components/pricing/vector/enterprise";
import FAQ from "@/components/pricing/vector/faq";
import PricingTable from "@/components/pricing/vector/pricing-table";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

export const metadata = {
  title: "Free Vector DB & Alternative Vector DB Pricing Plans",
  description: "Free Vector DB & Alternative Vector DB Pricing Plans: Pay only for what you use with per-request Vector DB pricing.",
};

export default function PricingVectorPage() {
  const structuredFaqSchema = generateFaqSchema(VectorFaqJson);

  return (
    <PricingLayout
      pageTitle="Vector DB Pricing"
      pageDescription="Pay only for what you use with per-request pricing."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />
      <ProductToggle product="/vector" />

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
