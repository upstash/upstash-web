"use client";

import Button from "@/components/button";
import {
  WORKFLOW_FIXED_PLANS,
  WORKFLOW_FREE_PLAN,
  WORKFLOW_PAYG_PLAN,
} from "@/data/pricing/workflow";
import { PricingPlans } from "@/utils/type";
import * as React from "react";
import { ChangeEvent, useState } from "react";

const PRICING_PLANS_TO_FIXED_ID: Record<string, string> = {
  [PricingPlans.Pro1M]: "fixed-1m",
  [PricingPlans.Pro10M]: "fixed-10m",
};

const FIXED_PLAN_BY_ID = Object.fromEntries(
  WORKFLOW_FIXED_PLANS.map((p) => [p.id, p])
);

export default function PricingTable() {
  const [selectedFixed, setSelectedFixed] = useState(PricingPlans.Pro1M);

  const onChangePlan = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedFixed(event.target.value as PricingPlans);
  };

  const fixedPlan =
    FIXED_PLAN_BY_ID[PRICING_PLANS_TO_FIXED_ID[selectedFixed]] ??
    WORKFLOW_FIXED_PLANS[0];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* FREE */}
      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            {WORKFLOW_FREE_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {WORKFLOW_FREE_PLAN.priceDisplay}
          </h5>
          <p className="text-text-mute">{WORKFLOW_FREE_PLAN.priceSubtext}</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {WORKFLOW_FREE_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Steps per Day</p>
            <p className="font-semibold">{WORKFLOW_FREE_PLAN.maxStepsPerDay}</p>
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
            {WORKFLOW_PAYG_PLAN.name}
          </h4>
          <h5 className="text-2xl font-semibold">
            {WORKFLOW_PAYG_PLAN.priceDisplay}
          </h5>
          <p className="text-sm text-text-mute">
            {WORKFLOW_PAYG_PLAN.priceSubtext}
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {WORKFLOW_PAYG_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Steps per Day</p>
            <p className="font-semibold">{WORKFLOW_PAYG_PLAN.maxStepsPerDay}</p>
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
            {fixedPlan.priceDisplay}
            <span className="ml-1 text-base font-normal text-text-mute">
              {fixedPlan.priceSubtext}
            </span>
          </h5>
          <p className="text-sm text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {fixedPlan.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Steps per Day</p>
            <p className="font-semibold">{fixedPlan.maxStepsPerDay}</p>
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
