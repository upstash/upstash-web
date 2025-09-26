"use client"

import Button from "@/components/button";
import { PricingPlans } from "@/utils/type";
import * as React from "react";
import { ChangeEvent, useState } from "react";

export default function PricingTable() {
  const [selectedFixed, setSelectedFixed] = useState(PricingPlans.Pro1M);
  
  const showFixed1M = selectedFixed === PricingPlans.Pro1M;
  const showFixed10M = selectedFixed === PricingPlans.Pro10M;
  
  const onChangePlan = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingPlans;
    setSelectedFixed(value);
  };
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/**/}

      {/* FREE */}

      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Free
          </h4>

          <h5 className="text-2xl font-semibold">$0</h5>
          <p className="text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            Perfect for prototypes and hobby projects.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Messages per Day</p>
            <p className="font-semibold">1,000</p>
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
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">$1</h5>
          <p className="text-sm text-text-mute">per 100K messages</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            For use cases with bursting traffic.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Messages per Day</p>
            <p className="font-semibold">Unlimited</p>
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

      {/* Fixed */}

      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 text-xl font-semibold text-primary-text">
            <select
              className="w-auto rounded-xl bg-bg-mute px-4 py-1 font-bold"
              value={selectedFixed}
              onChange={onChangePlan}
            >
              <option value={PricingPlans.Pro1M}>Fixed 1M</option>
              <option value={PricingPlans.Pro10M}>Fixed 10M</option>
            </select>
          </h4>

          <h5 className="flex items-baseline justify-center text-2xl font-semibold">
            {showFixed1M && <>$180</>}
            {showFixed10M && <>$420</>}
            <span className="ml-1 text-base font-normal text-text-mute">
              / month
            </span>
          </h5>

          <p className="text-sm text-text-mute">
            -
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            For businesses with consistent high-capacity loads and predictable
            costs.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Messages per Day</p>
            <p className="font-semibold">
              {showFixed1M && <>1M messages</>}
              {showFixed10M && <>10M messages</>}
            </p>
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
