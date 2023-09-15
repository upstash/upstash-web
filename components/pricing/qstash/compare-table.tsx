import { ChangeEvent, useState } from "react";
import CompareValue from "../compare-value";
import { PricingPlans } from "@/utils/type";
import useIsMobile from "@/hooks/use-is-mobile";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState([
    PricingPlans.Free,
    PricingPlans.PayAsYouGo,
  ]);

  const showFree = selectedPlans.includes(PricingPlans.Free);
  const showPayg = selectedPlans.includes(PricingPlans.PayAsYouGo);
  const showEnterprise = selectedPlans.includes(PricingPlans.Enterprise);

  const onPlanChange = (
    event: ChangeEvent<HTMLSelectElement>,
    plan: PricingPlans,
  ) => {
    const value = event.target.value as PricingPlans;
    const index = selectedPlans.indexOf(plan);

    setSelectedPlans((prev) => {
      if (index === 0) {
        return [value, prev[1]];
      }
      return [prev[0], value];
    });
  };

  return (
    <table className="w-full border-separate border-spacing-y-0 border-spacing-x-1">
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
            className="bg-white/3 py-3 px-0 text-white/80
             uppercase text-xs font-medium tracking-wider
          border-b-2 border-b-zinc-950"
          >
            Free
          </th>
          <th
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 py-3 px-0 text-white/80
             uppercase text-xs font-medium tracking-wider
          border-b-2 border-b-zinc-950"
          >
            Usage Based Pricing
          </th>
          <th
            hidden={isMobile ? !showEnterprise : false}
            className="bg-white/3 py-3 px-0 text-white/80
             uppercase text-xs font-medium tracking-wider
            border-b-2 border-b-zinc-950"
          >
            Fixed Pricing
          </th>
        </tr>

        <tr className="top-20 md:top-0 sticky z-20">
          <th className="" />
          <th
            hidden={isMobile ? !showFree : false}
            className="bg-zinc-950 p-0 border-b border-b-zinc-800"
          >
            <div className="bg-white/3 h-16 flex items-center justify-center">
              <h4 className="hidden md:block text-emerald-400 text-lg font-semibold">
                Free
              </h4>

              <select
                className="md:hidden font-semibold bg-transparent px-4 py-2"
                onChange={(e) => onPlanChange(e, PricingPlans.Free)}
                value={PricingPlans.Free}
              >
                <option value={PricingPlans.Free} disabled>
                  Free
                </option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Enterprise}>Enterprise</option>
              </select>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPayg : false}
            className="bg-zinc-950 p-0 border-b border-b-zinc-800"
          >
            <div className="bg-emerald-300/10 h-16 flex items-center justify-center">
              <h4 className="hidden md:block text-emerald-400 text-lg font-semibold">
                Pay as you go
              </h4>

              <select
                className="md:hidden font-semibold bg-transparent px-4 py-2"
                onChange={(e) => onPlanChange(e, PricingPlans.PayAsYouGo)}
                value={PricingPlans.PayAsYouGo}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo} disabled>
                  Pay as you go
                </option>
                <option value={PricingPlans.Enterprise}>Enterprise</option>
              </select>
            </div>
          </th>
          <th
            hidden={isMobile ? !showEnterprise : false}
            className="bg-zinc-950 p-0 border-b border-b-zinc-800"
          >
            <div className="bg-white/3 h-16 flex items-center justify-center">
              <h4 className="hidden md:block text-emerald-400 text-lg font-semibold">
                Pro 2K
              </h4>

              <select
                className="md:hidden font-semibold bg-transparent px-4 py-2"
                onChange={(e) => onPlanChange(e, PricingPlans.Enterprise)}
                value={PricingPlans.Enterprise}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Enterprise} disabled>
                  Enterprise
                </option>
              </select>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max Messages per Day
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">500</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="number">500000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>up to 100M</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max Requests per Second
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="number">100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max Message Size
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max Number of Topics
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>1</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>20</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Infinite</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max Number of Endpoints per Topic
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Infinite</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max Retry Count
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>3</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>5</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>20</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max Delay
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>7 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>30 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max HTTP Connection Timeout
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>2 min</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>5 min</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max DLQ Retention
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>3 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>7 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>30 days</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60">
            Max DLQ Size (Number of Messages)
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showEnterprise : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Custom</CompareValue>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
