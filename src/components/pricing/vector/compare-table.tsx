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

  function Col({ plan, children, className, ...props }) {
    return (
      <td
        hidden={isMobile ? !plan : false}
        className={cx(className)}
        {...props}
      >
        {children}
      </td>
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
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Limit of 1 Free DB
          </Col>
          <Col
            plan={showPayg}
            className="border-b-2 border-b-bg bg-emerald-500/10 px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
          <Col
            plan={showFixed}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
          <Col
            plan={showPro}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
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
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-500/10">
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
          <th className="px-0 text-left font-normal text-text-mute">
            Max Vectors x Dimensions
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="Million">
              200
            </CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="Billion">
              2
            </CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="Billion">
              2
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="Billion">
              100
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Max Dimensions
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">1536</CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="number">3072</CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">3072</CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">5000</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Max Namespaces
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="number">1000</CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">1000</CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">10000</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Daily Query / Update Limit
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="K">
              10
            </CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="M">
              1
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Max Metadata Per Vector
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Max Data Per Vector
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Max Data / Metadata Size
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="GB">
              1
            </CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
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
          <th className="px-0 text-left font-normal text-text-mute">Regions</th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
              <span>Iowa, GCP</span>
            </CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
              <span>Iowa, GCP</span>
            </CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            API and SDKs
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Live Index Updates
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Scale to Zero
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Sparse Vectors
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue suffix="Coming soon" />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue suffix="Coming soon" />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue suffix="Coming soon" />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue suffix="Coming soon" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Namespaces
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Metadata Filtering
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Uptime SLA
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.9%</div>
            </CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue className="border-b-0">
              <div>99.9%</div>
            </CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
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
          <th className="px-0 text-left font-normal text-text-mute">
            Community Support
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Email Support
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Dedicated Support and Slack Channel
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-500/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Price</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Monthly Price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-emerald-500/10 px-4 py-0">
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0">
            <CompareValue>$60</CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0">
            <CompareValue>Contact Us</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Request Price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-emerald-500/10 px-4 py-0">
            <CompareValue>$0.4 per 100K</CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0">
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0">
            <CompareValue>None</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Storage Price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-emerald-500/10 px-4 py-0">
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0">
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showPro} className="bg-bg-mute px-4 py-0">
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Bandwidth Price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-emerald-500/10 px-4 py-0">
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
          <Col plan={showFixed} className="bg-bg-mute px-4 py-0">
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
          <Col plan={showPro} className="bg-bg-mute px-4 py-0">
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
          <Col plan={showFree} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="!bg-white !text-black shadow"
              >
                Start Now
              </Button>
            </div>
          </Col>
          <Col plan={showPayg} className="p-0">
            <div className="bg-emerald-500/10 py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="!bg-primary"
              >
                Start Now
              </Button>
            </div>
          </Col>
          <Col plan={showFixed} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="!bg-white !text-black shadow"
              >
                Start Now
              </Button>
            </div>
          </Col>
          <Col plan={showPro} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="!bg-white !text-black shadow"
              >
                Start Now
              </Button>
            </div>
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
