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
  const showFixed = selectedPlans === PricingPlans.Fixed;
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
            1 Free DB
          </Col>
          <Col
            plan={showPayg}
            feature
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
          <Col
            plan={showFixed}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
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
                $0.4
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K requests
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showFixed} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Fixed
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Fixed}
              />

              <h5 className="flex items-baseline font-semibold">
                $60
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
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
          <th className="px-0 text-left font-normal">
            Max Vectors x Dimensions
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="Million">
              200
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="Billion">
              2
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="size" suffix="Billion">
              2
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="size" suffix="Billion">
              100
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Max Dimensions</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">1536</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">3072</CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="number">3072</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="number">5000</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Max Namespaces</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="K">
              10
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="size" suffix="K">
              10
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="plain">Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            Daily Query / Update Limit
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="K">
              10
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="size" suffix="M">
              1
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            Max Metadata Per Vector
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
          <Col plan={showFixed}>
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
          <th className="px-0 text-left font-normal">Max Data Per Vector</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            Max Data / Metadata Size
          </th>
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
          <Col plan={showFixed}>
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
          <th className="px-0 text-left font-normal">Regions</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
              <span>Iowa, GCP</span>
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
              <span>Iowa, GCP</span>
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">API and SDKs</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
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
          <Col plan={showFixed}>
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
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" valid={false} />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Sparse Vectors</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue suffix="Coming soon" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue suffix="Coming soon" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue suffix="Coming soon" />
          </Col>
          <Col plan={showPro}>
            <CompareValue suffix="Coming soon" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Namespaces</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Metadata Filtering</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Uptime SLA</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue className="border-b-0">
              <div>99.9%</div>
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue className="border-b-0">
              <div>99.9%</div>
            </CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue className="border-b-0">
              <div>99.99%</div>
            </CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Support</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Community Support</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Email Support</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            Dedicated Support and Slack Channel
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Price</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Monthly Price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue>$60</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>Contact Us</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Request Price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$0.4 per 100K</CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>None</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 text-left font-normal">Storage Price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showPro}>
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Bandwidth Price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Free up to 200GB per month, beyond that $0.03 per GB.">
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
          <Col plan={showFixed}>
            <CompareValue
              after={
                <Tooltip content="Free up to 200GB per month, beyond that $0.03 per GB.">
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
          <Col plan={showPro}>
            <CompareValue
              after={
                <Tooltip content="Price can change depending on cloud provider's fee.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              $0.03 per GB
            </CompareValue>
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
          <Col plan={showFixed} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showPro} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
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
      <option value={PricingPlans.Fixed}>Fixed</option>
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
