import Button from "@/components/button";
import {
  VECTOR_FIXED_PLAN,
  VECTOR_FREE_PLAN,
  VECTOR_PAYG_PLAN,
} from "@/data/pricing/vector";
import * as React from "react";

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* FREE */}
      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {VECTOR_FREE_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {VECTOR_FREE_PLAN.priceDisplay}
          </h5>
          <p className="text-sm text-text-mute">{VECTOR_FREE_PLAN.priceSubtext}</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {VECTOR_FREE_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Daily Query/Update Limit</p>
            <p className="font-semibold">{VECTOR_FREE_PLAN.dailyQueryLimit}</p>
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
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {VECTOR_PAYG_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {VECTOR_PAYG_PLAN.priceDisplay}
          </h5>
          <p className="text-sm text-text-mute">
            {VECTOR_PAYG_PLAN.priceSubtext}
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {VECTOR_PAYG_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Daily Query / Update Limit</p>
            <p className="font-semibold">{VECTOR_PAYG_PLAN.dailyQueryLimit}</p>
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

      {/* Fixed / Pro */}
      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {VECTOR_FIXED_PLAN.name}
          </h4>
          <h5 className="flex items-baseline text-2xl font-semibold">
            {VECTOR_FIXED_PLAN.priceDisplay}
            <span className="ml-1 text-base font-normal text-text-mute">
              {VECTOR_FIXED_PLAN.priceSubtext}
            </span>
          </h5>
          <p className="text-sm text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {VECTOR_FIXED_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Daily Query / Update Limit</p>
            <p className="font-semibold">{VECTOR_FIXED_PLAN.dailyQueryLimit}</p>
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
    </div>
  );
}
