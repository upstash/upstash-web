"use client";

import Button from "@/components/button";
import { PricingRedis } from "@/utils/type";
import * as React from "react";
import { ChangeEvent, useState } from "react";

export default function PricingTable() {
  const [selectedPlans, setSelectedPlans] = useState(PricingRedis.Fixed250MB);

  const showFixed250MB = selectedPlans === PricingRedis.Fixed250MB;
  const showFixed1GB = selectedPlans === PricingRedis.Fixed1GB;
  const showFixed5GB = selectedPlans === PricingRedis.Fixed5GB;
  const showFixed12GB = selectedPlans === PricingRedis.Fixed12GB;

  const onPlanChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingRedis;
    setSelectedPlans(value);
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/**/}

      {/* FREE */}

      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Free
          </h4>

          <h5 className="text-2xl font-semibold">$0</h5>
          <p className="text-sm text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text">
            Perfect for prototypes and hobby projects.
          </div>
        </div>

        <div className="w-full divide-y divide-bg-mute px-6">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold text-primary-text">256 MB</p>
          </div>

          <div className="py-3">
            <p className="text-text-mute">Monthly Commands</p>
            <p className="font-semibold text-primary-text">500 K</p>
          </div>
        </div>

        <div>
          <Button asChild>
            <a target="_self" href="https://console.upstash.com">
              Start Now
            </a>
          </Button>
        </div>
      </div>

      {/* PAYG */}

      <div className="flex flex-col items-center gap-4 rounded-3xl border-2 border-primary bg-white p-6 shadow sm:gap-6 sm:p-8 dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">$0.2</h5>
          <p className="text-sm text-text-mute">per 100K commands</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text">
            Flexible pricing for variable traffic.
          </div>
        </div>

        <div className="w-full divide-y divide-bg-mute px-6">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold text-primary-text">100 GB</p>
          </div>

          <div className="py-3">
            <p className="text-text-mute">Monthly Bandwidth</p>
            <p className="font-semibold text-primary-text">Unlimited</p>
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

      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 text-xl font-semibold text-primary-text">
            <select
              className="w-auto rounded-xl bg-bg-mute px-4 py-1 font-bold"
              value={selectedPlans}
              onChange={onPlanChange}
            >
              <option value={PricingRedis.Fixed250MB}>Fixed 250MB</option>
              <option value={PricingRedis.Fixed1GB}>Fixed 1GB</option>
              <option value={PricingRedis.Fixed5GB}>Fixed 5GB</option>
              <option value={PricingRedis.Fixed12GB}>Fixed 12GB</option>
            </select>
          </h4>

          <h5 className="flex items-baseline justify-center text-2xl font-semibold">
            {showFixed250MB && <>$7</>}
            {showFixed1GB && <>$20</>}
            {showFixed5GB && <>$77</>}
            {showFixed12GB && <>$180</>}
            <span className="ml-1 text-base font-normal text-text-mute">
              / month
            </span>
          </h5>

          <p className="text-sm text-text-mute">
            {showFixed250MB && <>$5</>}
            {showFixed1GB && <>$10</>}
            {showFixed5GB && <>$35</>}
            {showFixed12GB && <>$90</>} ✕ read region
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text">
            For consistent loads with predictable costs.
          </div>
        </div>

        <div className="w-full divide-y divide-bg-mute px-6">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold text-primary-text">
              {showFixed250MB && <>250 MB</>}
              {showFixed1GB && <>1 GB</>}
              {showFixed5GB && <>5 GB</>}
              {showFixed12GB && <>12 GB</>}
            </p>
          </div>

          <div className="py-3">
            <p className="text-text-mute">Monthly Bandwidth</p>
            <p className="font-semibold text-primary-text">
              {showFixed250MB && <>100</>}
              {showFixed1GB && <>200</>}
              {showFixed5GB && <>800</>}
              {showFixed12GB && <>2,000</>} GB
            </p>
          </div>
        </div>

        <div>
          <Button asChild>
            <a target="_self" href="https://console.upstash.com">
              Start Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
