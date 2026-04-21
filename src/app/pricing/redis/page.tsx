"use client";

import RedisFaqJson from "@/../public/faq/redis.json";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/redis/compare-table";
import Enterprise from "@/components/pricing/redis/enterprise";
import FAQ from "@/components/pricing/redis/faq";
import ProdPack from "@/components/pricing/redis/prod-pack";
import PricingTable from "@/components/pricing/redis/pricing-table";
import { PROD_PACK_SECTION_ID } from "@/constants";
import { generateFaqSchema } from "@/utils/structured-schema-generators";
import { PricingRedis } from "@/utils/type";
import { ChangeEvent, useState } from "react";

export default function PricingRedisPage() {
  const structuredFaqSchema = generateFaqSchema(RedisFaqJson);
  const [selectedPlan, setSelectedPlan] = useState(PricingRedis.Free);
  const [selectedFixed, setSelectedFixed] = useState(PricingRedis.Fixed250MB);

  const onChangePlan = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingRedis;
    setSelectedPlan(value);

    if (
      [
        PricingRedis.Fixed250MB,
        PricingRedis.Fixed1GB,
        PricingRedis.Fixed5GB,
        PricingRedis.Fixed10GB,
        PricingRedis.Fixed50GB,
        PricingRedis.Fixed100GB,
        PricingRedis.Fixed500GB,
      ].includes(value)
    ) {
      setSelectedFixed(value);
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredFaqSchema,
        }}
      />

      <section>
        <Container className="max-w-screen-lg">
          <ProductToggle product={"/redis"} />

          <div className="mt-12 md:mt-20">
            <PricingTable
              selectedFixed={selectedFixed}
              onChangePlan={onChangePlan}
            />
          </div>

          {/* PROD PACK */}
          <div
            id={PROD_PACK_SECTION_ID}
            className="mt-6 rounded-4xl bg-white p-4 md:mt-16 dark:bg-bg-mute"
          >
            <ProdPack />
            <Enterprise />
          </div>
        </Container>
      </section>

      {/* Compare Table */}
      <section className="mt-32 md:mt-40">
        <Container className="max-w-screen-2xl">
          <header>
            <PageHeaderTitle as="h2" className="md:text-4xl">
              Compare Plans
            </PageHeaderTitle>
            <PageHeaderDesc className="mt-2 md:text-xl">
              Plans that scale to all sizes.
            </PageHeaderDesc>
          </header>

          <div className="mt-12 md:mt-16">
            <CompareTable
              selectedPlan={selectedPlan}
              selectedFixed={selectedFixed}
              onChangePlan={onChangePlan}
            />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="mt-32 md:mt-40">
        <Container className="max-w-screen-md">
          <PageHeaderTitle as="h2" className="mb md:text-4xl">
            FAQ
          </PageHeaderTitle>
          <div className="mt-10">
            <FAQ />
          </div>
        </Container>
      </section>
    </>
  );
}
