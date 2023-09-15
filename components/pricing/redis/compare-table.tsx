"use client";

import * as React from "react";
import { HTMLProps, isValidElement, useState } from "react";
import cx from "@/utils/cx";
import Button from "@/components/button";
import { useMediaQuery } from "@uidotdev/usehooks";
import { PricingPlans } from "@/utils/type";

export default function CompareTable() {
  const isMobile = useMediaQuery("only screen and (max-width: 768px)");
  const [selectedPlans, setSelectedPlans] = useState([
    PricingPlans.Free,
    PricingPlans.PayAsYouGo,
  ]);

  const showFree = selectedPlans.includes(PricingPlans.Free);
  const showPayg = selectedPlans.includes(PricingPlans.PayAsYouGo);
  const showPro2 = selectedPlans.includes(PricingPlans.Pro2K);
  const showPro10 = selectedPlans.includes(PricingPlans.Pro10K);

  const onPlanChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
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
            className="bg-white/3 py-3 px-0 text-white/80
             uppercase text-xs font-medium tracking-wider
          border-b-2 border-b-zinc-950"
          >
            Limit of 1 Free DB
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 py-3 px-0 text-white/80
             uppercase text-xs font-medium tracking-wider
            border-b-2 border-b-zinc-950"
          >
            Fixed Pricing
          </th>
          <th
            hidden={isMobile ? !showPro10 : false}
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
                <option value={PricingPlans.Pro2K}>Pro 2K</option>
                <option value={PricingPlans.Pro10K}>Pro 10K</option>
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
                <option value={PricingPlans.Pro2K}>Pro 2K</option>
                <option value={PricingPlans.Pro10K}>Pro 10K</option>
              </select>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro2 : false}
            className="bg-zinc-950 p-0 border-b border-b-zinc-800"
          >
            <div className="bg-white/3 h-16 flex items-center justify-center">
              <h4 className="hidden md:block text-emerald-400 text-lg font-semibold">
                Pro 2K
              </h4>

              <select
                className="md:hidden font-semibold bg-transparent px-4 py-2"
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
            className="bg-zinc-950 p-0 border-b border-b-zinc-800"
          >
            <div className="bg-white/3 h-16 flex items-center justify-center">
              <h4 className="hidden md:block text-emerald-400 text-lg font-semibold">
                Pro 10K
              </h4>

              <select
                className="md:hidden font-semibold bg-transparent px-4 py-2"
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
          <th colSpan={5} className="z-10 top-0 p-0 sticky text-left">
            <div
              className="-ml-4 h-16 flex items-center px-4
            bg-gradient-to-r from-zinc-900 to-zinc-950"
            >
              <span className="flex items-center gap-2 font-semibold text-lg">
                <span className="flex items-center p-2 rounded-full bg-white/10">
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
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max command per second
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
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">2000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Daily command limit
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max request size
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
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max record size
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              200
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              500
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max memory storage
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              64
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="size" suffix="GB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="GB">
              3
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max data size
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="MB">
              256
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="GB">
              100
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max concurrent connections
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
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">2000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="number">5000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max monthly bandwidth
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="GB" className="border-b-0">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="size" suffix="GB" className="border-b-0">
              200
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="TB" className="border-b-0">
              5
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="size" suffix="TB" className="border-b-0">
              10
            </CompareValue>
          </td>
        </tr>

        {/**/}

        <tr>
          <th colSpan={5} className="z-10 top-0 p-0 sticky text-left">
            <div
              className="-ml-4 h-16 flex items-center px-4
            bg-gradient-to-r from-zinc-900 to-zinc-950"
            >
              <span className="flex items-center gap-2 font-semibold text-lg">
                <span className="flex items-center p-2 rounded-full bg-white/10">
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

                <span>Backend Feature</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Supported platforms
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Persistence
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            REST API
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Global replication
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
        </tr>

        {/**/}

        <tr>
          <th colSpan={5} className="z-10 top-0 p-0 sticky text-left">
            <div
              className="-ml-4 h-16 flex items-center px-4
            bg-gradient-to-r from-zinc-900 to-zinc-950"
            >
              <span className="flex items-center gap-2 font-semibold text-lg">
                <span className="flex items-center p-2 rounded-full bg-white/10">
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
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            SSL Encryption (TLS)
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Security
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
              <span>VPC Peering</span>
              <span>IP Whitelisting</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
              <span>VPC Peering</span>
              <span>IP Whitelisting</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Audit logs
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Last 7 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue>Last 30 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Last 1 year</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue>Last 1 year</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Encryption at REST
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Compliance (SOC2, ISO27001, ...)
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
        </tr>

        {/**/}

        <tr>
          <th colSpan={5} className="z-10 top-0 p-0 sticky text-left">
            <div
              className="-ml-4 h-16 flex items-center px-4
            bg-gradient-to-r from-zinc-900 to-zinc-950"
            >
              <span className="flex items-center gap-2 font-semibold text-lg">
                <span className="flex items-center p-2 rounded-full bg-white/10">
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
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Community Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Email Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Dedicated support and Slack channel
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-4 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Uptime SLA
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="px-4 py-0 bg-white/3"
          ></td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="px-4 py-0 bg-emerald-300/10"
          >
            <CompareValue className="border-b-0">
              <div>
                <div>Regional: 99.99%</div>
                <div>Global: 99.99%</div>
              </div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue className="border-b-0">
              <div>
                <div>Regional: 99.99%</div>
                <div>Global: 99.99%</div>
              </div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="px-4 py-0 bg-white/3"
          >
            <CompareValue className="border-b-0">
              <div>
                <div>Regional: 99.99%</div>
                <div>Global: 99.99%</div>
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
                className="bg-zinc-50 text-zinc-950 font-medium"
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
                className="bg-emerald-400 text-zinc-950 font-medium"
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
                className="bg-zinc-50 text-zinc-950 font-medium"
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
                className="bg-zinc-50 text-zinc-950 font-medium"
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

const CompareValue = ({
  type = "plain",
  suffix = "",
  valid = true,
  children,
  className = "",
  ...props
}: HTMLProps<HTMLSpanElement> & {
  type?: "plain" | "size" | "boolean" | "list" | "number";
  suffix?: string;
  valid?: boolean;
}) => (
  <span
    className={`inner py-3 border-b border-b-white/3 flex items-center justify-center ${className}`}
    {...props}
  >
    {type === "plain" && children}

    {type === "size" && (
      <>
        {children} <span className="ml-1 text-white/40">{suffix}</span>
      </>
    )}

    {type === "boolean" && (
      <span className="text-zinc-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cx(valid ? "text-emerald-400" : "text-white/10")}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.25"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
            strokeWidth="0"
            fill="currentColor"
          />
        </svg>
      </span>
    )}

    {type === "list" && children && (
      <span className="text-left flex items-center justify-center flex-wrap gap-1">
        {ReactChildrenText(children).map((item, index) => (
          <span
            className="text-sm px-2 py-1.5 font-medium bg-emerald-300/10 rounded leading-none"
            key={index}
          >
            {item}
          </span>
        ))}
      </span>
    )}

    {type === "number" && Number(children).toLocaleString()}
  </span>
);

const hasChildren = (element) =>
  // @ts-ignore
  isValidElement(element) && Boolean(element.props.children);

const ReactChildrenText = (children) => {
  if (hasChildren(children)) return ReactChildrenText(children.props.children);
  return children;
};
