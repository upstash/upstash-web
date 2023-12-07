import { ChangeEvent, useState } from "react";

import { PricingPlans } from "@/utils/type";

import useIsMobile from "@/hooks/use-is-mobile";

import CompareValue from "../compare-value";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState(PricingPlans.Free);

  const showFree = selectedPlans === PricingPlans.Free;
  const showPayg = selectedPlans === PricingPlans.PayAsYouGo;
  const showEnterprise = selectedPlans == PricingPlans.Enterprise;

  const onPlanChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingPlans;
    setSelectedPlans(value);
  };

  return (
    <table className="w-full border-separate border-spacing-x-1 border-spacing-y-0">
      <colgroup>
        <col className="w-1/3 md:w-1/4" />
        <col className="w-1/3 md:w-1/4" />
        <col className="w-1/3 md:w-1/4" />
        <col className="w-1/3 md:w-1/4" />
      </colgroup>

      {/**/}

      <thead>
        <tr>
          <th className="p-0" />
          <th
            hidden={isMobile ? !showFree : false}
            className="border-b-2 border-b-zinc-950 bg-white/3 px-0
             py-3 text-xs font-medium uppercase
          tracking-wider text-white/80"
          >
            Free
          </th>
          <th
            hidden={isMobile ? !showPayg : false}
            className="border-b-2 border-b-zinc-950 bg-emerald-300/10 px-0
             py-3 text-xs font-medium uppercase
          tracking-wider text-white/80"
          >
            Usage Based Pricing
          </th>
          <th
            hidden={isMobile ? !showEnterprise : false}
            className="border-b-2 border-b-zinc-950 bg-white/3 px-0
             py-3 text-xs font-medium uppercase
            tracking-wider text-white/80"
          >
            Fixed Pricing
          </th>
        </tr>

        <tr className="sticky top-20 z-20 md:top-0">
          <th className="" />
          <th
            hidden={isMobile ? !showFree : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-16 items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Free
              </h4>

              <select
                className="bg-transparent px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Free}
              >
                <option value={PricingPlans.Free} disabled>
                  Free
                </option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Enterprise}>Pro</option>
              </select>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPayg : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-16 items-center justify-center bg-emerald-300/10">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pay as you go
              </h4>

              <select
                className="bg-transparent px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.PayAsYouGo}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo} disabled>
                  Pay as you go
                </option>
                <option value={PricingPlans.Enterprise}>Pro</option>
              </select>
            </div>
          </th>
          <th
            hidden={isMobile ? !showEnterprise : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-16 items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pro
              </h4>

              <select
                className="bg-transparent px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Enterprise}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Enterprise} disabled>
                  Pro
                </option>
              </select>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Messages per Day
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">500</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="number">500000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>up to 100M</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Requests per Second
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="number">100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Message Size
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Number of Topics
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>1</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>20</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Infinite</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Number of Endpoints per Topic
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Infinite</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Retry Count
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>3</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>5</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>20</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Delay
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>7 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>30 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max HTTP Connection Timeout
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>2 min</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>5 min</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max DLQ Retention
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>3 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>7 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>30 days</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max DLQ Size (Number of Messages)
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Schedule Count
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
