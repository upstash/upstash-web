import Button from "@/components/button";
import { Hr } from "@/components/pricing/pricing-parts";
import * as React from "react";

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/**/}

      {/* FREE */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-bg-mute px-4 py-8">
        <div className="">
          <h4 className="mb-2 text-xl font-semibold text-primary-text">Free</h4>

          <h5 className="text-2xl font-semibold">$0</h5>
          <p className="text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-text-mute">
            Perfect for prototypes and hobby projects.
          </div>
        </div>

        <Hr />

        <div>
          <p className="text-text-mute">Max Messages per Day</p>
          <p className="font-semibold">500</p>
        </div>

        <div>
          <p className="text-text-mute">Max Requests per Second</p>
          <p className="font-semibold">100</p>
        </div>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="!bg-white !text-black shadow"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* PAYG */}

      <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-primary bg-emerald-500/10 px-4 py-8">
        <div className="grow">
          <h4 className="mb-2 text-xl font-semibold text-primary-text">
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">$1</h5>
          <p className="text-text-mute">per 100K messages</p>
        </div>

        <div className="grow">
          <div className="text-text-mute">
            For use cases with bursting traffic.
          </div>
        </div>

        <Hr />

        <div>
          <p className="text-text-mute">Max Messages per Day</p>
          <p className="font-semibold">500,000</p>
        </div>

        <div>
          <p className="text-text-mute">Max Requests per Second</p>
          <p className="font-semibold">100</p>
        </div>

        <hr className="w-2/3 border-0 border-b border-b-white/5" />

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="!bg-primary !text-white shadow"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* ENTERPRISE */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-bg-mute px-4 py-8">
        <div>
          <h4 className="mb-2 text-xl font-semibold text-primary-text">Pro</h4>

          <h5 className="flex items-baseline text-2xl font-semibold">
            $180
            <span className="ml-1 text-base font-normal opacity-40">
              / month
            </span>
          </h5>
          <p className="text-text-mute">Starting from</p>
        </div>

        <div>
          <div className="text-text-mute">
            For businesses with consistent high-capacity loads and predictable
            costs.
          </div>
        </div>

        <Hr />

        <div>
          <p className="text-text-mute">Max Messages per Day</p>
          <p className="font-semibold">Up to 100M</p>
        </div>

        <div>
          <p className="text-text-mute">Max Requests per Second</p>
          <p className="font-semibold">Up to 1000</p>
        </div>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="!bg-white !text-black shadow"
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
