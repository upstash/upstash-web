"use client";

import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/vector/compare-table";
import Enterprise from "@/components/pricing/vector/enterprise";
import PricingTable from "@/components/pricing/vector/pricing-table";

export default function PricingVectorPage() {
  return (
    <div>
      <ProductToggle product={"/vector"} />

      <div className="mt-16 md:mt-20">
        {/**/}
        <div className="-mt-10 mb-10 grid place-items-center">
          <div className="rounded-2xl border-2 border-dashed border-orange-400/10 bg-orange-600/10 px-10 py-6 text-sm text-orange-300/80">
            <h5 className="font-semibold">Important Notice</h5>
            <p>
              The prices shown are introductory and may be subject to
              adjustments in the future.
            </p>
          </div>
        </div>
        {/**/}

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
