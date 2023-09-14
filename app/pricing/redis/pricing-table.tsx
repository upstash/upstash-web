import * as React from "react";
import {
  PricingTableBody,
  PricingTableHR,
  PricingTableRow,
} from "@/app/pricing/client";
import Button from "@/components/button";

export default function PricingTable() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {/**/}

      {/* FREE */}

      <PricingTableBody>
        <PricingTableRow className="grow">
          <h4 className="mb-2 text-emerald-400 text-xl font-semibold">Free</h4>

          <h5 className="text-3xl font-semibold">$0</h5>
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

        <PricingTableHR />

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

          <h5 className="text-3xl font-semibold">$0.2</h5>
          <p className="text-white/40">-</p>
        </PricingTableRow>

        <PricingTableRow className="grow">
          <div className="text-emerald-100/80">
            For use cases with bursting traffic.
          </div>
        </PricingTableRow>

        <PricingTableHR />

        <PricingTableRow>
          <p className="text-sm text-emerald-100/40">Max command per second</p>
          <p className="font-semibold">1,000</p>
        </PricingTableRow>

        <PricingTableRow>
          <p className="text-sm text-emerald-100/40">Daily command limit</p>
          <p className="font-semibold">Unlimited</p>
        </PricingTableRow>

        <PricingTableHR />

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

          <h5 className="text-3xl font-semibold">$280</h5>
          <p className="text-white/40">+$100 ✕ read region</p>
        </PricingTableRow>

        <PricingTableRow>
          <div className="text-white/80">
            For businesses with consistent high-capacity loads and predictable
            costs.
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

        <PricingTableHR />

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

          <h5 className="text-3xl font-semibold">$680</h5>
          <p className="text-white/40">+$200 ✕ read region</p>
        </PricingTableRow>

        <PricingTableRow>
          <div className="text-white/80">
            For businesses with consistent high-capacity loads and predictable
            costs.
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

        <PricingTableHR />

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
  );
}
