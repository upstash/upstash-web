"use client";

import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Enterprise from "@/components/pricing/enterprise";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/vector/compare-table";
import FAQ from "@/components/pricing/vector/faq";
import PricingTable from "@/components/pricing/vector/pricing-table";

export default function PricingVectorPage() {
  return (
    <div>
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

        <div className="mt-32 md:mt-40">
          <Container className="max-w-screen-md">
            <PageHeaderTitle as="h2" className="mb md:text-4xl">
              FAQ
            </PageHeaderTitle>
            <div className="mt-10">
              <FAQ />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
