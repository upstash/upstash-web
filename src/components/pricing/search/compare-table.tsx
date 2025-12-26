"use client";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
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
  const showPro = selectedPlans === PricingPlans.Pro;

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
        <col className="w-1/2 md:w-1/5" />
        <col className="w-1/2 md:w-1/5" />
        <col className="w-1/2 md:w-1/5" />
        <col className="w-1/2 md:w-1/5" />
      </colgroup>

      {/**/}

      <thead>
        <tr>
          <td className="p-0" />
          <Col
            plan={showFree}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            1 Free Database
          </Col>
          <Col
            plan={showPayg}
            feature
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
          <Col
            plan={showPro}
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
                $0.05
                <span className="ml-1 text-base font-normal opacity-40">
                  / 1K requests
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showPro} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pro
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Pro}
              />

              <h5 className="flex items-baseline font-semibold">
                <span className="ml-1 text-base font-normal opacity-40">
                  Contact Us
                </span>
              </h5>
            </div>
          </Col>
        </tr>
      </thead>

      {/**/}

      <tbody>
        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Capacity</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Max Documents Limit</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="K">
              200
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue suffix="M">2</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Max Databases</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">1</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="plain">Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Max Indexes</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">10</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="K">
              10
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="plain">Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Monthly Request Limit</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="K">
              20
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            Max Content Size per Document
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="characters">
              4096
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="characters">
              4096
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="size" suffix="characters">
              4096
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            Max Metadata Size per Document
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Total Max Data Size</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="GB">
              1
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="size" suffix="TB">
              1
            </CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Features</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">API and SDKs</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="list">
              <span>REST</span>
              <span>Typescript</span>
              <span>Python</span>
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="list">
              <span>REST</span>
              <span>Typescript</span>
              <span>Python</span>
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="list">
              <span>REST</span>
              <span>Typescript</span>
              <span>Python</span>
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Keyword Search</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Semantic Search</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Reranking</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Live Index Updates</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Scale to Zero</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" valid={false} />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Price</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Request Price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$0.05 per 1K requests</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 text-left font-normal">Document Price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$0.1 per 1K docs/month</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 text-left font-normal">Reranking Price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue
              after={
                <Tooltip content="Free up to 1K rerankings, the rest fallbacks to default reranking.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              Free
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Up to 100 documents are counted as 1 request">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              $1 per 1K requests
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <td className="p-0" />
          <Col plan={showFree} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showPayg} feature className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showPro} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="#">
                Coming Soon
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
      <option value={PricingPlans.Pro}>Pro</option>
      {/*<option value={PricingPlans.Enterprise}>Enterprise</option>*/}
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
