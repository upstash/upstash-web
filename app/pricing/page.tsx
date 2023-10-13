"use client";

import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Enterprise from "@/components/pricing/enterprise";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/redis/compare-table";
import PricingTable from "@/components/pricing/redis/pricing-table";
import Ps from "@/components/pricing/redis/ps";

export default function PricingRedisPage() {
  return (
    <div>
      <ProductToggle product={"/"} />

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
              Start with a hobby project, collaborate with a team, and scale to
              millions of users.
            </PageHeaderDesc>
          </header>

          <div className="mt-12 md:mt-16">
            <CompareTable />
          </div>
        </div>

        <div className="mt-32 md:mt-40">
          <Ps />
        </div>
      </div>
    </div>
  );
}
