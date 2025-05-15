"use client";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import cx from "@/utils/cx";
import { PricingPlans } from "@/utils/type";
import { IconCoin } from "@tabler/icons-react";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import CompareValue from "../compare-value";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState(PricingPlans.Free);

  const showFree = selectedPlans === PricingPlans.Free;
  const showPayg = selectedPlans === PricingPlans.PayAsYouGo;
  const showEnterprise = selectedPlans === PricingPlans.Enterprise;

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
    <table className="w-full border-separate border-spacing-x-1 border-spacing-y-0">
      <colgroup>
        <col className="w-1/1 md:w-1/5" />
        <col className="w-1/1 md:w-1/5" />
        <col className="w-1/1 md:w-1/5" />
        <col className="w-1/1 md:w-1/5" />
      </colgroup>

      {/**/}

      <thead>
        <tr>
          <td className="p-0" />
          <Col
            plan={showFree}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Free
          </Col>
          <Col
            plan={showPayg}
            feature
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
          <Col
            plan={showEnterprise}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
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

              <h5 className="flex items-baseline font-semibold">-</h5>
            </div>
          </Col>
          <Col plan={showPayg} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-600/20 dark:bg-emerald-800/20">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pay as you go
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.PayAsYouGo}
              />

              <h5 className="flex items-baseline font-semibold">
                $0.05
                <span className="ml-1 text-base font-normal opacity-40">
                  / 1K queries
                </span>
              </h5>
            </div>
          </Col>
          <Col plan={showEnterprise} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Enterprise
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Enterprise}
              />

              <h5 className="flex items-baseline font-semibold">-</h5>
            </div>
          </Col>
        </tr>
      </thead>

      <tbody>
        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Capacity</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max Queries per Second
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">?</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">?</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="number">?</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max Queries per Month
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">20000</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="plain">?</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="The max amount of documents to upsert in a single request.">
              Max Documents(?) per Request
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">?</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="number">?</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Documents</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">200_000</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="plain">$0.1 per 1K</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Max Document Size</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="MB">
              ?
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="MB">
              ?
            </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="size" suffix="MB">
              ?
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Basic Reranking</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={true} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={true} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Advanced Reranking
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              valid={true}
              after={
                <Tooltip content="$1 per 1K queries">
                  <IconCoin className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Uptime SLA
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue className="">
              <div>99.99%</div>
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <td className="p-0" />
          <Col plan={showFree} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com/workflow">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showPayg} feature className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com/workflow">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showEnterprise} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com/workflow">
                Start Now
              </a>
            </Button>
          </Col>
        </tr>
      </tbody>
    </table>
  );
}

function MobileSelectCol({ ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className="mb-2 bg-white px-4 py-2 font-semibold md:hidden"
      {...props}
    >
      <option value={PricingPlans.Free}>Free</option>
      <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
      <option value={PricingPlans.Pro1M}>Pro 1M</option>
      <option value={PricingPlans.Pro10M}>Pro 10M</option>
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
