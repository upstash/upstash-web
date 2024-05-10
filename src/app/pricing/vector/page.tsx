"use client";

import VectorFaqJson from "@/../public/faq/vector.json";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/vector/compare-table";
import Enterprise from "@/components/pricing/vector/enterprise";
import PricingTable from "@/components/pricing/vector/pricing-table";

export default function PricingVectorPage() {
  const structuredFaqSchema = generateFaqSchema(VectorFaqJson);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />
      <ProductToggle product={"/vector"} />

      <div className="mt-16 md:mt-20">
        <PricingTable />

        <div className="mt-10 md:mt-20">
          <Enterprise />
        </div>

        <div className="mt-32 md:mt-40">
          <header>
            <PageHeaderTitle as="h2" className="md:text-4xl">
              Compare Plans
            </PageHeaderTitle>
            <PageHeaderDesc className="mt-2 md:text-xl">
              Plans that scale to all sizes.
            </PageHeaderDesc>
          </header>

          <div className="mt-12 md:mt-16">
            <CompareTable />
          </div>
        </div>
      </div>
    </div>
  );
}
