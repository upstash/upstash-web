import * as React from "react";
import { ChangeEvent, useState } from "react";

import { PricingPlans } from "@/utils/type";
import {
  IconCreditCard,
  IconDatabase,
  IconHeadphones,
  IconInfoCircle,
  IconRocket,
  IconShieldLock,
} from "@tabler/icons-react";

import useIsMobile from "@/hooks/use-is-mobile";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";

import CompareValue from "../compare-value";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState(PricingPlans.Free);

  const showFree = selectedPlans === PricingPlans.Free;
  const showPayg = selectedPlans === PricingPlans.PayAsYouGo;
  const showPro2 = selectedPlans === PricingPlans.Pro2K;
  const showPro10 = selectedPlans === PricingPlans.Pro10K;

  const onPlanChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingPlans;
    setSelectedPlans(value);
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
          <td className="p-0" />
          <th
            hidden={isMobile ? !showFree : false}
            className="border-b-2 border-b-zinc-950 bg-white/3 px-0 py-3 text-xs font-medium uppercase tracking-wider text-white/80"
          >
            Free
          </th>
          <th
            hidden={isMobile ? !showPayg : false}
            className="border-b-2 border-b-zinc-950 bg-emerald-300/10 px-0 py-3 text-xs font-medium uppercase tracking-wider text-white/80"
          >
            Usage Based Pricing
          </th>
          <th
            hidden={isMobile ? !showPro2 : false}
            className="border-b-2 border-b-zinc-950 bg-white/3 px-0 py-3 text-xs font-medium uppercase tracking-wider text-white/80"
          >
            Fixed Pricing
          </th>
          <th
            hidden={isMobile ? !showPro10 : false}
            className="border-b-2 border-b-zinc-950 bg-white/3 px-0 py-3 text-xs font-medium uppercase tracking-wider text-white/80"
          >
            Fixed Pricing
          </th>
        </tr>

        <tr className="sticky top-20 z-20 md:top-0">
          <td className="" />
          <th
            hidden={isMobile ? !showFree : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Free
              </h4>

              <select
                className="mb-2 bg-white/5 px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
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
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-300/10">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pay as you go
              </h4>

              <select
                className="mb-2 bg-white/5 px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.PayAsYouGo}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo} disabled>
                  Pay as you go
                </option>
                <option value={PricingPlans.Pro2K}>Pro 2K</option>
                <option value={PricingPlans.Pro10K}>Pro 10K</option>
              </select>

              <h5 className="flex items-baseline font-semibold">
                $0.6
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K messages
                </span>
              </h5>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro2 : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pro 2K
              </h4>

              <select
                className="mb-2 bg-white/5 px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Pro2K}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Pro2K} disabled>
                  Pro 2K
                </option>
                <option value={PricingPlans.Pro10K}>Pro 10K</option>
              </select>

              <h5 className="flex items-baseline font-semibold">
                $320
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro10 : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pro 10K
              </h4>

              <select
                className="mb-2 bg-white/5 px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Pro10K}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Pro2K}>Pro 2K</option>
                <option value={PricingPlans.Pro10K} disabled>
                  Pro 10K
                </option>
              </select>

              <h5 className="flex items-baseline font-semibold">
                $520
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
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
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-zinc-900 to-zinc-950 px-4 md:h-16">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <IconDatabase width="20" height="20" strokeWidth={1.5} />
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
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-zinc-900 to-zinc-950 px-4 md:h-16">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <IconRocket width="20" height="20" strokeWidth={1.5} />
                </span>

                <span>Features</span>
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
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="list">
              <span>AWS</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>AWS</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <span>AWS</span>
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
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-zinc-900 to-zinc-950 px-4 md:h-16">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <IconShieldLock width="20" height="20" strokeWidth={1.5} />
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
              <Tooltip content="Once TLS is enabled, the data transfer between the client and database is encrypted.">
                TLS
              </Tooltip>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="list">
              <Tooltip content="Once TLS is enabled, the data transfer between the client and database is encrypted.">
                TLS
              </Tooltip>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <Tooltip content="Once TLS is enabled, the data transfer between the client and database is encrypted.">
                TLS
              </Tooltip>
              <Tooltip content="mTLS ensures two-way authentication where both client and server authenticate each other at the same time in the authentication protocol.">
                mTLS
              </Tooltip>
              <Tooltip content="VPC Peering enables you to connect to Upstash from your own VPC using private IP. Cluster and your application can run in the same subnet which also minimizes data transfer costs.">
                VPC Peering
              </Tooltip>
              <Tooltip content="You can set the IP addresses which will have access to your database.">
                IP Whitelisting
              </Tooltip>
              <Tooltip content="Private Link helps you to access to Upstash Cluster with a private network link inside AWS infrastructure.">
                Private Link
              </Tooltip>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="list">
              <Tooltip content="mTLS ensures two-way authentication where both client and server authenticate each other at the same time in the authentication protocol.">
                TLS
              </Tooltip>
              <Tooltip content="mTLS ensures two-way authentication where both client and server authenticate each other at the same time in the authentication protocol.">
                mTLS
              </Tooltip>
              <Tooltip content="VPC Peering enables you to connect to Upstash from your own VPC using private IP. Cluster and your application can run in the same subnet which also minimizes data transfer costs.">
                VPC Peering
              </Tooltip>
              <Tooltip content="You can set the IP addresses which will have access to your database.">
                IP Whitelisting
              </Tooltip>
              <Tooltip content="Private Link helps you to access to Upstash Cluster with a private network link inside AWS infrastructure.">
                Private Link
              </Tooltip>
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
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-zinc-900 to-zinc-950 px-4 md:h-16">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <IconHeadphones width="20" height="20" strokeWidth={1.5} />
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
          />
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

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-zinc-900 to-zinc-950 px-4 md:h-16">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <IconCreditCard width="20" height="20" strokeWidth={1.5} />
                </span>
                <span>Price</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Monthly price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Free</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>None</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$320</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$520</CompareValue>
          </td>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Request price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Free</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>$0.2 per 100K</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>None</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>None</CompareValue>
          </td>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Storage price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Free</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>$0.25 per GB</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$0.25 per GB</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$0.25 per GB</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Bandwidth price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Free</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue
              after={
                <Tooltip content="Free up to 200GB per month. Beyond that, $0.1 per GB.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              Free{" "}
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-white/3 px-4 py-0"
          >
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
              $0.1 per GB out and $0.05 per GB in
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
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
              $0.1 per GB out and $0.05 per GB in
            </CompareValue>
          </td>
        </tr>

        {/**/}

        <tr>
          <td className="p-0" />
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
