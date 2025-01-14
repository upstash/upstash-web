"use client";

import RedisFaqJson from "@/../public/faq/redis.json";
import PricingLayout from "@/../src/app/pricing/layout";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/redis/compare-table";
import Enterprise from "@/components/pricing/enterprise";
import FAQ from "@/components/pricing/redis/faq";
import PricingTable from "@/components/pricing/redis/pricing-table";
import { generateFaqSchema } from "@/utils/structured-schema-generators";

export const metadata = {
  title: "Free Redis Pricing & Alternative Redis Pricing Plans",
  description: "Free Redis Pricing & Alternative Redis Pricing Plans: Begin with Free Redis, pay only for what you use with per-request Redis pricing.",
};

export default function PricingRedisPage() {
  const structuredFaqSchema = generateFaqSchema(RedisFaqJson);

  return (
    <PricingLayout
      pageTitle="Redis Pricing"
      pageDescription="Pay only for what you use with per-request pricing."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />
      <ProductToggle product="/redis" />

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
