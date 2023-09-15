import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import PricingTable from "@/app/pricing/redis/pricing-table";
import PricingTableEnterprise from "@/app/pricing/redis/pricing-table-enterprise";
import CompareTable from "@/app/pricing/redis/compare-table";
import { ProductToggle } from "@/components/pricing/product-toggle";

export default function Pricing() {
  return (
    <div>
      <ProductToggle product={"/"} />

      <div className="mt-16 md:mt-20">
        <PricingTable />
        <PricingTableEnterprise />

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
      </div>
    </div>
  );
}
