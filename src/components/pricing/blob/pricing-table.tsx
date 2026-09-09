"use client";

import Button from "@/components/button";
import {
  BLOB_CARD_METERS,
  BLOB_FREE_PLAN,
  BLOB_PAYG_PLAN,
} from "@/data/pricing/blob";
import { useTrackHover } from "@/hooks/use-track-hover";
import * as React from "react";

export default function PricingTable() {
  const freeHover = useTrackHover({ product: "blob", plan: "free" });
  const paygHover = useTrackHover({ product: "blob", plan: "payg" });

  return (
    <div
      data-area="pricing_table"
      data-product="blob"
      className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2"
    >
      {/* FREE */}
      <div
        data-plan="free"
        {...freeHover}
        className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute"
      >
        <div className="grow text-center">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {BLOB_FREE_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {BLOB_FREE_PLAN.priceDisplay}
          </h5>
          <p className="text-text-mute">{BLOB_FREE_PLAN.priceSubtext}</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {BLOB_FREE_PLAN.description}
          </div>
        </div>

        {/* Included per month. Same four meters as the payg card below, so the
            two read as a cap against a rate rather than as different lists. */}
        <div className="w-full px-6 *:border-b *:border-bg-mute">
          {BLOB_CARD_METERS.map((meter) => (
            <div key={meter.key} className="py-3">
              <p className="text-text-mute">{meter.label}</p>
              <p className="font-semibold">{meter.freeIncluded}</p>
            </div>
          ))}
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
      <div
        data-plan="payg"
        {...paygHover}
        className="flex flex-col items-center gap-4 rounded-4xl border-2 border-primary bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute"
      >
        <div className="grow text-center">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {BLOB_PAYG_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {BLOB_PAYG_PLAN.priceDisplay}
          </h5>
          <p className="text-sm text-text-mute">
            {BLOB_PAYG_PLAN.priceSubtext}
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {BLOB_PAYG_PLAN.description}
          </div>
        </div>

        {/* Rates, billed from the first unit: payg includes no free allowance. */}
        <div className="w-full px-6 *:border-b *:border-bg-mute">
          {BLOB_CARD_METERS.map((meter) => (
            <div key={meter.key} className="py-3">
              <p className="text-text-mute">{meter.label}</p>
              <p className="font-semibold">{meter.rate}</p>
            </div>
          ))}
        </div>

        <div>
          <Button asChild variant="primary">
            <a target="_self" href="https://console.upstash.com">
              Start Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
