"use client";

import Button from "@/components/button";
import { PricingRedis } from "@/utils/type";
import * as React from "react";
import { ChangeEvent } from "react";

export default function PricingTable({
  selectedFixed,
  onChangePlan,
}: {
  selectedFixed: PricingRedis;
  onChangePlan: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const showFixed250MB = selectedFixed === PricingRedis.Fixed250MB;
  const showFixed1GB = selectedFixed === PricingRedis.Fixed1GB;
  const showFixed5GB = selectedFixed === PricingRedis.Fixed5GB;
  const showFixed10GB = selectedFixed === PricingRedis.Fixed10GB;
  const showFixed50GB = selectedFixed === PricingRedis.Fixed50GB;
  const showFixed100GB = selectedFixed === PricingRedis.Fixed100GB;
  const showFixed500GB = selectedFixed === PricingRedis.Fixed500GB;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/**/}

      {/* FREE */}

      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow min-h-[120px]">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Free
          </h4>

          <h5 className="text-2xl font-semibold">$0</h5>
          <p className="text-sm text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            Perfect for prototypes and hobby projects.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold">256 MB</p>
          </div>

          <div className="py-3">
            <p className="text-text-mute">Monthly Commands</p>
            <p className="font-semibold">500 K</p>
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
        <div className="grow min-h-[120px]">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">$0.2</h5>
          <p className="text-sm text-text-mute">per 100K commands</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            Flexible pricing for variable traffic.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold">100 GB</p>
          </div>

          <div className="py-3">
            <p className="text-text-mute">Monthly Bandwidth</p>
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
        <div className="grow min-h-[120px]">
          <h4 className="mb-4 text-xl font-semibold text-primary-text">
            <select
              className="w-auto rounded-xl bg-bg-mute px-4 py-1 font-bold"
              value={selectedFixed}
              onChange={onChangePlan}
            >
              <option value={PricingRedis.Fixed250MB}>Fixed 250MB</option>
              <option value={PricingRedis.Fixed1GB}>Fixed 1GB</option>
              <option value={PricingRedis.Fixed5GB}>Fixed 5GB</option>
              <option value={PricingRedis.Fixed10GB}>Fixed 10GB</option>
              <option value={PricingRedis.Fixed50GB}>Fixed 50GB</option>
              <option value={PricingRedis.Fixed100GB}>Fixed 100GB</option>
              <option value={PricingRedis.Fixed500GB}>Fixed 500GB</option>
            </select>
          </h4>

          <h5 className="flex items-baseline justify-center text-2xl font-semibold">
            {showFixed250MB && <>$10</>}
            {showFixed1GB && <>$20</>}
            {showFixed5GB && <>$100</>}
            {showFixed10GB && <>$200</>}
            {showFixed50GB && <>$400</>}
            {showFixed100GB && <>$800</>}
            {showFixed500GB && <>$1500</>}
            <span className="ml-1 text-base font-normal text-text-mute">
              / month
            </span>
          </h5>

          <p className="text-sm text-text-mute">
            {showFixed250MB && <>$5</>}
            {showFixed1GB && <>$10</>}
            {showFixed5GB && <>$50</>}
            {showFixed10GB && <>$100</>}
            {showFixed50GB && <>$200</>}
            {showFixed100GB && <>$400</>}
            {showFixed500GB && <>$750</>} ✕ read regions
          </p>
          <p className="text-sm text-text-mute">No per-command pricing</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            For consistent loads with predictable costs.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold">
              {showFixed250MB && <>250 MB</>}
              {showFixed1GB && <>1 GB</>}
              {showFixed5GB && <>5 GB</>}
              {showFixed10GB && <>10 GB</>}
              {showFixed50GB && <>50 GB</>}
              {showFixed100GB && <>100 GB</>}
              {showFixed500GB && <>500 GB</>}
            </p>
          </div>

          <div className="py-3">
            <p className="text-text-mute">Monthly Bandwidth</p>
            <p className="font-semibold">
              {showFixed250MB && <>50GB</>}
              {showFixed1GB && <>100GB</>}
              {showFixed5GB && <>500GB</>}
              {showFixed10GB && <>1TB</>}
              {showFixed50GB && <>5TB</>}
              {showFixed100GB && <>10TB</>}
              {showFixed500GB && <>20TB</>}
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
