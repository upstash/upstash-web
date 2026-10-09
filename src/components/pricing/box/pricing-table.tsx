"use client";

import Button from "@/components/button";
import {
  BOX_FREE_PLAN,
  BOX_KEEPALIVE_PLAN,
  BOX_PAYG_PLAN,
  BOX_SIZES,
  type BoxSize,
} from "@/data/pricing/box";
import { useTrackHover } from "@/hooks/use-track-hover";
import * as React from "react";

const defaultSize = BOX_SIZES[0];

export default function PricingTable() {
  const freeHover = useTrackHover({ product: "box", plan: "free" });
  const paygHover = useTrackHover({ product: "box", plan: "payg" });
  const keepAliveHover = useTrackHover({ product: "box", plan: "keepalive" });
  const [paygSizeId, setPaygSizeId] = React.useState<BoxSize["id"]>(
    defaultSize.id,
  );
  const [keepAliveSizeId, setKeepAliveSizeId] = React.useState<BoxSize["id"]>(
    defaultSize.id,
  );
  const paygSize = BOX_SIZES.find((s) => s.id === paygSizeId) ?? defaultSize;
  const keepAliveSize =
    BOX_SIZES.find((s) => s.id === keepAliveSizeId) ?? defaultSize;

  return (
    <div
      data-area="pricing_table"
      data-product="box"
      className="grid gap-6 md:grid-cols-3"
    >
      {/* FREE */}
      <div
        data-plan="free"
        {...freeHover}
        className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute"
      >
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
      <div
        data-plan="payg"
        {...paygHover}
        className="flex flex-col items-center gap-4 rounded-4xl border-2 border-primary bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute"
      >
        <div className="grow text-center">
          <h4 className="mb-4 text-xl font-semibold text-primary-text">
            <select
              className="w-auto rounded-xl bg-bg-mute px-4 py-1 font-bold"
              value={paygSizeId}
              onChange={(e) => setPaygSizeId(e.target.value as BoxSize["id"])}
            >
              {BOX_SIZES.map((size) => (
                <option key={size.id} value={size.id}>
                  PAYG {size.label}
                </option>
              ))}
            </select>
          </h4>
          <h5 className="text-2xl font-semibold">
            ${paygSize.cpuHourPrice.toFixed(2)}
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
              {paygSize.cpu}, {paygSize.memory}
            </p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Included Storage</p>
            <p className="font-semibold">{paygSize.storage}</p>
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

      {/* KEEP ALIVE */}
      <div
        data-plan="keepalive"
        {...keepAliveHover}
        className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute"
      >
        <div className="grow text-center">
          <h4 className="mb-4 text-xl font-semibold text-primary-text">
            <select
              className="w-auto rounded-xl bg-bg-mute px-4 py-1 font-bold"
              value={keepAliveSizeId}
              onChange={(e) =>
                setKeepAliveSizeId(e.target.value as BoxSize["id"])
              }
            >
              {BOX_SIZES.map((size) => (
                <option key={size.id} value={size.id}>
                  {BOX_KEEPALIVE_PLAN.name} {size.label}
                </option>
              ))}
            </select>
          </h4>
          <h5 className="text-2xl font-semibold">
            ${keepAliveSize.keepAlivePrice}
          </h5>
          <p className="text-sm text-text-mute">
            {BOX_KEEPALIVE_PLAN.priceSubtext}
          </p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            {BOX_KEEPALIVE_PLAN.description}
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Resources</p>
            <p className="font-semibold">
              {keepAliveSize.cpu}, {keepAliveSize.memory}
            </p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Idle Timeout</p>
            <p className="font-semibold">Never</p>
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
