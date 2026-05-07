"use client";

import Button from "@/components/button";
import {
  REDIS_FIXED_PLANS,
  REDIS_FREE_PLAN,
  REDIS_PAYG_PLAN,
} from "@/data/pricing/redis";
import { PricingRedis } from "@/utils/type";
import * as React from "react";
import { ChangeEvent } from "react";

const FIXED_PLAN_BY_ID: Record<string, (typeof REDIS_FIXED_PLANS)[number]> =
  Object.fromEntries(REDIS_FIXED_PLANS.map((p) => [p.id, p]));

const PRICING_REDIS_TO_FIXED_ID: Record<string, string> = {
  [PricingRedis.Fixed250MB]: "fixed-250mb",
  [PricingRedis.Fixed1GB]: "fixed-1gb",
  [PricingRedis.Fixed5GB]: "fixed-5gb",
  [PricingRedis.Fixed10GB]: "fixed-10gb",
  [PricingRedis.Fixed50GB]: "fixed-50gb",
  [PricingRedis.Fixed100GB]: "fixed-100gb",
  [PricingRedis.Fixed500GB]: "fixed-500gb",
};

export default function PricingTable({
  selectedFixed,
  onChangePlan,
}: {
  selectedFixed: PricingRedis;
  onChangePlan: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const fixedPlan =
    FIXED_PLAN_BY_ID[PRICING_REDIS_TO_FIXED_ID[selectedFixed]] ??
    REDIS_FIXED_PLANS[0];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* FREE */}
      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow min-h-[120px]">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {REDIS_FREE_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {REDIS_FREE_PLAN.priceDisplay}
          </h5>
          <p className="text-sm text-text-mute">{REDIS_FREE_PLAN.priceSubtext}</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {REDIS_FREE_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold">{REDIS_FREE_PLAN.dataSize}</p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Monthly Commands</p>
            <p className="font-semibold">{REDIS_FREE_PLAN.monthlyCommands}</p>
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
            {REDIS_PAYG_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {REDIS_PAYG_PLAN.priceDisplay}
          </h5>
          <p className="text-sm text-text-mute">
            {REDIS_PAYG_PLAN.priceSubtext}
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {REDIS_PAYG_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold">{REDIS_PAYG_PLAN.dataSize}</p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Monthly Bandwidth</p>
            <p className="font-semibold">{REDIS_PAYG_PLAN.maxBandwidth}</p>
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
            {fixedPlan.priceDisplay}
            <span className="ml-1 text-base font-normal text-text-mute">
              {fixedPlan.priceSubtext}
            </span>
          </h5>

          <p className="text-sm text-text-mute">
            ${fixedPlan.readRegionPrice} ✕ read regions
          </p>
          <p className="text-sm text-text-mute">No per-command pricing</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {fixedPlan.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Data Size</p>
            <p className="font-semibold">{fixedPlan.dataSize}</p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Monthly Bandwidth</p>
            <p className="font-semibold">{fixedPlan.maxBandwidth}</p>
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
