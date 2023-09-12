import * as React from "react";
import {
  PricingPrice,
  PricingTableBody,
  PricingTableHR,
  PricingTableRow,
  PricingToggle,
} from "@/app/pricing/client";
import Button from "@/components/button";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";

export default function Pricing() {
  return (
    <div>
      <PricingToggle product={"/"} />

      <div className="mt-16 md:mt-20">
        <div className="grid grid-cols-4 gap-6">
          {/**/}

          {/* FREE */}

          <PricingTableBody>
            <PricingTableRow className="grow">
              <h4 className="mb-2 text-emerald-400 text-xl font-semibold">
                Free
              </h4>

              <PricingPrice>$0</PricingPrice>
              <p className="text-white/40">-</p>
            </PricingTableRow>

            <PricingTableRow className="grow">
              <div className="text-white/80">
                Perfect for prototypes and hobby projects.
              </div>
            </PricingTableRow>

            <PricingTableHR />

            <PricingTableRow>
              <p className="text-sm text-white/40">Max command per second</p>
              <p className="font-semibold">1,000</p>
            </PricingTableRow>

            <PricingTableRow>
              <p className="text-sm text-white/40">Daily command limit</p>
              <p className="font-semibold">10,000</p>
            </PricingTableRow>

            <PricingTableRow>
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-zinc-50 text-zinc-950"
              >
                Start Now
              </Button>
            </PricingTableRow>
          </PricingTableBody>

          {/* PAYG */}

          <PricingTableBody className="bg-emerald-300/10 border border-emerald-300/5">
            <PricingTableRow className="grow">
              <h4 className="mb-2 text-emerald-400 text-xl font-semibold">
                Pay as you go
              </h4>

              <PricingPrice>$0.2</PricingPrice>
              <p className="text-white/40">-</p>
            </PricingTableRow>

            <PricingTableRow className="grow">
              <div className="text-emerald-100/80">
                For use cases with bursting traffic.
              </div>
            </PricingTableRow>

            <PricingTableHR />

            <PricingTableRow>
              <p className="text-sm text-emerald-100/40">
                Max command per second
              </p>
              <p className="font-semibold">1,000</p>
            </PricingTableRow>

            <PricingTableRow>
              <p className="text-sm text-emerald-100/40">Daily command limit</p>
              <p className="font-semibold">Unlimited</p>
            </PricingTableRow>

            <PricingTableRow>
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-emerald-400 text-zinc-950"
              >
                Start Now
              </Button>
            </PricingTableRow>
          </PricingTableBody>

          {/* PRO 2K */}

          <PricingTableBody>
            <PricingTableRow>
              <h4 className="mb-2 text-emerald-400 text-xl font-semibold">
                Pro 2K
              </h4>

              <PricingPrice>$280</PricingPrice>
              <p className="text-white/40">+$100 ✕ read region</p>
            </PricingTableRow>

            <PricingTableRow>
              <div className="text-white/80">
                For businesses with consistent high-capacity loads and
                predictable costs.
              </div>
            </PricingTableRow>

            <PricingTableHR />

            <PricingTableRow>
              <p className="text-sm text-white/40">Max command per second</p>
              <p className="font-semibold">2,000</p>
            </PricingTableRow>

            <PricingTableRow>
              <p className="text-sm text-white/40">Daily command limit</p>
              <p className="font-semibold">Unlimited</p>
            </PricingTableRow>

            <PricingTableRow>
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-zinc-50 text-zinc-950"
              >
                Start Now
              </Button>
            </PricingTableRow>
          </PricingTableBody>

          {/* PRO 10K */}

          <PricingTableBody>
            <PricingTableRow>
              <h4 className="mb-2 text-emerald-400 text-xl font-semibold">
                Pro 10K
              </h4>

              <PricingPrice>$680</PricingPrice>
              <p className="text-white/40">+$200 ✕ read region</p>
            </PricingTableRow>

            <PricingTableRow>
              <div className="text-white/80">
                For businesses with consistent high-capacity loads and
                predictable costs.
              </div>
            </PricingTableRow>

            <PricingTableHR />

            <PricingTableRow>
              <p className="text-sm text-white/40">Max command per second</p>
              <p className="font-semibold">10,000</p>
            </PricingTableRow>

            <PricingTableRow>
              <p className="text-sm text-white/40">Daily command limit</p>
              <p className="font-semibold">Unlimited</p>
            </PricingTableRow>

            <PricingTableRow>
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-zinc-50 text-zinc-950"
              >
                Start Now
              </Button>
            </PricingTableRow>
          </PricingTableBody>
        </div>

        <div className="mt-16 md:mt-32">
          <header>
            <PageHeaderTitle as="h2" className="md:text-4xl">
              Compare Plans
            </PageHeaderTitle>
            <PageHeaderDesc className="mt-4 md:text-2xl">
              Start with a hobby project, collaborate with a team, and scale to
              millions of users.
            </PageHeaderDesc>
          </header>

          <div className="mt-8 md:mt-10">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Accusamus, aliquid corporis deserunt expedita id nostrum obcaecati
              quidem sapiente sit? Delectus fugit harum, nihil odit perferendis
              sit temporibus. Necessitatibus, quia quibusdam?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
