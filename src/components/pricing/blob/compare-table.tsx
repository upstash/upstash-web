"use client";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import { BLOB_METERS } from "@/data/pricing/blob";
import useIsMobile from "@/hooks/use-is-mobile";
import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import { PricingPlans } from "@/utils/type";
import { IconInfoCircle } from "@tabler/icons-react";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import CompareValue from "../compare-value";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState(PricingPlans.Free);

  const showFree = selectedPlans === PricingPlans.Free;
  const showPayg = selectedPlans === PricingPlans.PayAsYouGo;

  const onPlanChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingPlans;
    setSelectedPlans(value);
  };

  function Col({
    plan,
    className,
    feature = false,
    ...props
  }: React.ComponentProps<"td"> & {
    plan: boolean;
    feature?: boolean;
  }) {
    return (
      <td
        hidden={isMobile ? !plan : false}
        className={cx(
          "bg-bg-mute px-4 py-0 align-top",
          feature && "bg-emerald-600/20 dark:bg-emerald-800/20",
          className,
        )}
        {...props}
      />
    );
  }

  return (
    <table
      data-area="pricing_compare"
      data-product="blob"
      className="w-full border-separate border-spacing-x-1 border-spacing-y-0"
    >
      <colgroup>
        <col className="w-1/2 md:w-1/3" />
        <col className="w-1/2 md:w-1/3" />
        <col className="w-1/2 md:w-1/3" />
      </colgroup>

      {/**/}

      <thead>
        <tr>
          <td className="p-0" />
          <Col
            plan={showFree}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Free Forever
          </Col>
          <Col
            plan={showPayg}
            feature
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
        </tr>

        <tr className="sticky top-20 z-20 md:top-0">
          <td className="" />
          <Col plan={showFree} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Free
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Free}
              />

              <h5 className="flex items-baseline font-semibold">$0</h5>
            </div>
          </Col>

          <Col
            plan={showPayg}
            feature
            className="border-b border-b-bg bg-bg p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-600/20 dark:bg-emerald-800/20">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pay as you go
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.PayAsYouGo}
              />

              <h5 className="flex items-baseline font-semibold">
                $0.02
                <span className="ml-1 text-base font-normal opacity-40">
                  / GB stored
                </span>
              </h5>
            </div>
          </Col>
        </tr>
      </thead>

      {/**/}

      <tbody>
        <tr>
          <StickyRow colSpan={isMobile ? 2 : 3}>Pricing</StickyRow>
        </tr>

        {/* One row per billed meter. The free column is what the plan includes
            each month; the pay-as-you-go column is the rate, billed from the
            first unit, because pay-as-you-go includes nothing. */}
        {BLOB_METERS.map((meter) => (
          <tr key={meter.key}>
            <th className="px-0 text-left font-normal">
              <span className="flex items-center">
                {meter.label}
                <Tooltip content={meter.tooltip}>
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              </span>
            </th>
            {/**/}
            <Col plan={showFree}>
              <CompareValue>{meter.freeIncluded}</CompareValue>
            </Col>
            <Col plan={showPayg} feature>
              <CompareValue>{meter.rate}</CompareValue>
            </Col>
          </tr>
        ))}

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 3}>Features</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">API and SDKs</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="list">
              <span>S3</span>
              <span>Typescript</span>
              <span>React</span>
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="list">
              <span>S3</span>
              <span>Typescript</span>
              <span>React</span>
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            <span className="flex items-center">
              Global CDN
              <Tooltip content="Files are replicated worldwide automatically. There is no region to choose, no replication to configure and no cross-region transfer charge.">
                <IconInfoCircle
                  className="ml-1 opacity-60"
                  stroke={1.2}
                  aria-label="Info"
                />
              </Tooltip>
            </span>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Custom CORS Rules</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Token Rotation</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/**/}

        <tr>
          <td className="p-0" />
          <Col plan={showFree} className="py-4">
            <Button asChild variant="primary">
              <a
                target="_self"
                data-plan="free"
                href="https://console.upstash.com"
              >
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showPayg} feature className="py-4">
            <Button asChild variant="primary">
              <a
                target="_self"
                data-plan="payg"
                href="https://console.upstash.com"
              >
                Start Now
              </a>
            </Button>
          </Col>
        </tr>
      </tbody>
    </table>
  );
}

function MobileSelectCol({
  onChange,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className="mb-2 bg-white px-4 py-2 font-semibold md:hidden"
      onChange={(event) => {
        trackEvent("pricing_compare_select", {
          product: "blob",
          plan: event.target.value,
        });
        onChange?.(event);
      }}
      {...props}
    >
      <option value={PricingPlans.Free}>Free</option>
      <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
    </select>
  );
}

function StickyRow({ children, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      className="sticky top-20 z-10 border-y-2 border-bg bg-bg p-0 text-left md:top-0"
      {...props}
    >
      <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 text-lg font-semibold md:h-16">
        {children}
      </div>
    </th>
  );
}
