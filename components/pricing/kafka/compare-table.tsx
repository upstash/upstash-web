import { ChangeEvent, useState } from "react";

import { PricingPlans } from "@/utils/type";

import useIsMobile from "@/hooks/use-is-mobile";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";

import CompareValue from "../compare-value";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState([
    PricingPlans.Free,
    // PricingPlans.PayAsYouGo,
  ]);

  const showFree = selectedPlans.includes(PricingPlans.Free);
  const showPayg = selectedPlans.includes(PricingPlans.PayAsYouGo);
  const showPro2 = selectedPlans.includes(PricingPlans.Pro2K);
  const showPro10 = selectedPlans.includes(PricingPlans.Pro10K);

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
    <table className="w-full border-separate border-spacing-x-1 border-spacing-y-0">
      <colgroup>
        <col className="w-1/3 md:w-1/5" />
        <col className="w-1/3 md:w-1/5" />
        <col className="w-1/3 md:w-1/5" />
        <col className="w-1/3 md:w-1/5" />
        <col className="w-1/3 md:w-1/5" />
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
            hidden={isMobile ? !showPro2 : false}
            className="border-b-2 border-b-zinc-950 bg-white/3 px-0
             py-3 text-xs font-medium uppercase
            tracking-wider text-white/80"
          >
            Fixed Pricing
          </th>
          <th
            hidden={isMobile ? !showPro10 : false}
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
                onChange={(e) => onPlanChange(e, PricingPlans.Free)}
                value={PricingPlans.Free}
              >
                <option value={PricingPlans.Free} disabled>
                  Free
                </option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Pro2K}>Pro 2K</option>
                <option value={PricingPlans.Pro10K}>Pro 10K</option>
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
                onChange={(e) => onPlanChange(e, PricingPlans.PayAsYouGo)}
                value={PricingPlans.PayAsYouGo}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo} disabled>
                  Pay as you go
                </option>
                <option value={PricingPlans.Pro2K}>Pro 2K</option>
                <option value={PricingPlans.Pro10K}>Pro 10K</option>
              </select>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro2 : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-16 items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pro 2K
              </h4>

              <select
                className="bg-transparent px-4 py-2 font-semibold md:hidden"
                onChange={(e) => onPlanChange(e, PricingPlans.Pro2K)}
                value={PricingPlans.Pro2K}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Pro2K} disabled>
                  Pro 2K
                </option>
                <option value={PricingPlans.Pro10K}>Pro 10K</option>
              </select>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro10 : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-16 items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pro 10K
              </h4>

              <select
                className="bg-transparent px-4 py-2 font-semibold md:hidden"
                onChange={(e) => onPlanChange(e, PricingPlans.Pro10K)}
                value={PricingPlans.Pro10K}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Pro2K}>Pro 2K</option>
                <option value={PricingPlans.Pro10K} disabled>
                  Pro 10K
                </option>
              </select>
            </div>
          </th>
        </tr>
      </thead>

      {/**/}

      <tbody>
        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 p-0 text-left md:top-0"
          >
            <div
              className="-ml-4 flex h-16 items-center bg-gradient-to-r
            from-zinc-900 to-zinc-950 px-4"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"></path>
                    <path d="M4 6v6a8 3 0 0 0 16 0v-6"></path>
                    <path d="M4 12v6a8 3 0 0 0 16 0v-6"></path>
                  </svg>
                </span>

                <span>Capacity</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Messages Daily
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Message Per Second
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">2000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">10000</CompareValue>
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Number of Partitions
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">10</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="number">100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">5000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Retention Size
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              256
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="size" suffix="TB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="TB">
              2
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="TB">
              10
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Retention Time
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="Week">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>Infinite</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Infinite</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Infinite</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Monthly Bandwidth
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="size" suffix="TB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="TB">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="TB">
              100
            </CompareValue>
          </td>
        </tr>

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 p-0 text-left md:top-0"
          >
            <div
              className="-ml-4 flex h-16 items-center bg-gradient-to-r
            from-zinc-900 to-zinc-950 px-4"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3"></path>
                    <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3"></path>
                    <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  </svg>
                </span>

                <span>Backend Features</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Supported platforms
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            REST API
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Managed Connectors
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 p-0 text-left md:top-0"
          >
            <div
              className="-ml-4 flex h-16 items-center bg-gradient-to-r
            from-zinc-900 to-zinc-950 px-4"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
                    <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    <path d="M12 12l0 2.5"></path>
                  </svg>
                </span>

                <span>Security and Privacy</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            SSL Encryption (TLS)
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Security
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>Password</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="list">
              <span>Password</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>Password</span>
              <span>VPC Peering</span>
              <span>IP Whitelisting</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>Password</span>
              <span>VPC Peering</span>
              <span>IP Whitelisting</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Audit logs
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Last 7 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>Last 30 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Last 1 year</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Last 1 year</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Encryption at REST
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            <Tooltip content="Upstash Global regions are SOC-2 certified.">
              Compliance (SOC2)
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
        </tr>

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 p-0 text-left md:top-0"
          >
            <div
              className="-ml-4 flex h-16 items-center bg-gradient-to-r
            from-zinc-900 to-zinc-950 px-4"
            >
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.6"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 13m0 2a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z"></path>
                    <path d="M15 13m0 2a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z"></path>
                    <path d="M4 15v-3a8 8 0 0 1 16 0v3"></path>
                  </svg>
                </span>

                <span>Support</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Community Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Email Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Dedicated support and Slack channel
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Uptime SLA
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          ></td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue className="border-b-0">
              <div>
                <div>Single Replica: 99.5%</div>
                <div>Multi Replica: 99.99%</div>
              </div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue className="border-b-0">
              <div>
                <div>Single Replica: 99.5%</div>
                <div>Multi Replica: 99.99%</div>
              </div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue className="border-b-0">
              <div>
                <div>Single Replica: 99.5%</div>
                <div>Multi Replica: 99.99%</div>
              </div>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="p-0" />
          <th hidden={isMobile ? !showFree : false} className="bg-zinc-950 p-0">
            <div className="bg-white/3 py-4 text-white/60">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-zinc-50 font-medium text-zinc-950"
              >
                Start Now
              </Button>
            </div>
          </th>
          <th hidden={isMobile ? !showPayg : false} className="bg-zinc-950 p-0">
            <div className="bg-emerald-300/10 py-4 text-white/60">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-emerald-400 font-medium text-zinc-950"
              >
                Start Now
              </Button>
            </div>
          </th>
          <th hidden={isMobile ? !showPro2 : false} className="bg-zinc-950 p-0">
            <div className="bg-white/3 py-4 text-white/60">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-zinc-50 font-medium text-zinc-950"
              >
                Start Now
              </Button>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro10 : false}
            className="bg-zinc-950 p-0"
          >
            <div className="bg-white/3 py-4 text-white/60">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-zinc-50 font-medium text-zinc-950"
              >
                Start Now
              </Button>
            </div>
          </th>
        </tr>
      </tbody>
    </table>
  );
}
