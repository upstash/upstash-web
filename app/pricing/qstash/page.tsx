import * as React from "react";
import PricingTable from "@/components/pricing/qstash/pricing-table";
import PricingTableEnterprise from "@/components/pricing/qstash/pricing-table-enterprise";
import CompareTable from "@/components/pricing/qstash/compare-table";
import Ps from "@/components/pricing/qstash/ps";
import ProductToggle from "@/components/pricing/product-toggle";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";

export default function PricingQStashPage() {
  return (
    <div>
      <ProductToggle product={"/qstash"} />

      <div className="mt-16 md:mt-20">
        <PricingTable />
        <div className="mt-10">
          <PricingTableEnterprise />
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
