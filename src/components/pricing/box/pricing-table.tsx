import Button from "@/components/button";
import {
  BOX_ENTERPRISE_PLAN,
  BOX_FREE_PLAN,
  BOX_PAYG_PLAN,
  BOX_SIZES,
} from "@/data/pricing/box";
import * as React from "react";

const defaultSize = BOX_SIZES[0];

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* FREE */}
      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {BOX_FREE_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {BOX_FREE_PLAN.priceDisplay}
          </h5>
          <p className="text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {BOX_FREE_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Concurrent Boxes</p>
            <p className="font-semibold">{BOX_FREE_PLAN.maxConcurrentBoxes}</p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">CPU Hours / Month</p>
            <p className="font-semibold">{BOX_FREE_PLAN.cpuHoursPerMonth}</p>
          </div>
        </div>

        <div>
          <Button asChild variant="primary">
            <a target="_self" href="https://console.upstash.com">
              Start Now
            </a>
          </Button>
        </div>
      </div>

      {/* PAYG */}
      <div className="flex flex-col items-center gap-4 rounded-4xl border-2 border-primary bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow text-center">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {BOX_PAYG_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            ${defaultSize.cpuHourPrice.toFixed(2)}
          </h5>
          <p className="text-sm text-text-mute">per active CPU hour</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {BOX_PAYG_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Resources</p>
            <p className="font-semibold">
              {defaultSize.cpu}, {defaultSize.memory}
            </p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Included Storage</p>
            <p className="font-semibold">{defaultSize.storage}</p>
          </div>
        </div>

        <div>
          <Button asChild variant="primary">
            <a target="_self" href="https://console.upstash.com">
              Start Now
            </a>
          </Button>
        </div>
      </div>

      {/* Enterprise */}
      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {BOX_ENTERPRISE_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {BOX_ENTERPRISE_PLAN.priceDisplay}
          </h5>
          <p className="text-sm text-text-mute">
            {BOX_ENTERPRISE_PLAN.priceSubtext}
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {BOX_ENTERPRISE_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Box Sizes</p>
            <p className="font-semibold">
              {BOX_SIZES.map((s) => s.label).join(", ")}
            </p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Limits</p>
            <p className="font-semibold">{BOX_ENTERPRISE_PLAN.maxConcurrentBoxes}</p>
          </div>
        </div>

        <div>
          <Button asChild variant="primary">
            <a target="_self" href="/contact">
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
