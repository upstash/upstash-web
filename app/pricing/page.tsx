import { PricingToggle } from "@/app/pricing/client";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import PricingTable from "@/app/pricing/redis/pricing-table";
import CompareTable from "@/app/pricing/redis/compare-table";

export default function Pricing() {
  return (
    <div>
      <PricingToggle product={"/"} />

      <div className="mt-16 md:mt-20">
        <PricingTable />

        <div className="mt-16 md:mt-32">
          <header>
            <PageHeaderTitle as="h2" className="md:text-4xl">
              Compare Plans
            </PageHeaderTitle>
            <PageHeaderDesc className="mt-2 md:text-xl">
              Start with a hobby project, collaborate with a team, and scale to
              millions of users.
            </PageHeaderDesc>
          </header>

          <div className="mt-8 md:mt-10">
            <CompareTable />
          </div>
        </div>
      </div>
    </div>
  );
}
