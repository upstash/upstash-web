import * as React from "react";
import { ChangeEvent, useState } from "react";

import { PricingPlans } from "@/utils/type";
import {
  IconCreditCard,
  IconDatabase,
  IconHeadphones,
  IconInfoCircle,
  IconRocket,
} from "@tabler/icons-react";

import useIsMobile from "@/hooks/use-is-mobile";
import { usePrepareLoginUrl } from "@/hooks/use-prepare-login-url";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";

import CompareValue from "../compare-value";

export default function CompareTable() {
  const { loginUrl } = usePrepareLoginUrl();

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
            Limit of 1 Free DB
          </th>
          <th
            hidden={isMobile ? !showPayg : false}
            className="border-b-2 border-b-zinc-950 bg-emerald-300/10 px-0 py-3 text-xs font-medium uppercase tracking-wider text-white/80"
          >
            Usage Based Pricing
          </th>
          <th
            hidden={isMobile ? !showFixed : false}
            className="border-b-2 border-b-zinc-950 bg-white/3 px-0 py-3 text-xs font-medium uppercase tracking-wider text-white/80"
          >
            Fixed Pricing
          </th>
          <th
            hidden={isMobile ? !showPro : false}
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
                <option value={PricingPlans.Fixed}>Fixed</option>
                <option value={PricingPlans.Pro}>Pro</option>
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
                <option value={PricingPlans.Fixed}>Fixed</option>
                <option value={PricingPlans.Pro}>Pro</option>
              </select>

              <h5 className="flex items-baseline font-semibold">
                $0.4
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K requests
                </span>
              </h5>
            </div>
          </th>
          <th
            hidden={isMobile ? !showFixed : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Fixed
              </h4>

              <select
                className="mb-2 bg-white/5 px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Fixed}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Fixed} disabled>
                  Fixed
                </option>
                <option value={PricingPlans.Pro}>Pro</option>
              </select>

              <h5 className="flex items-baseline font-semibold">
                $60
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pro
              </h4>

              <select
                className="mb-2 bg-white/5 px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Pro}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Fixed}>Fixed</option>
                <option value={PricingPlans.Pro} disabled>
                  Pro
                </option>
                Pro
              </select>

              <h5 className="flex items-baseline font-semibold">
                <span className="ml-1 text-base font-normal opacity-40">
                  Contact Us
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
          <th className="px-0 text-left font-normal text-white/60">
            Max Vectors x Dimensions
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="Million">
              200
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="Billion">
              2
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="Billion">
              2
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="Billion">
              100
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Max Dimensions
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="number">1536</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="number">3072</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="number">3072</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="number">5000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Max Namespaces
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="number">100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Daily Query / Update Limit
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="K">
              10
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="M">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Max Metadata Per Vector
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="KB">
              48
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Max Data Per Vector
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Max Data / Metadata Size
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="TB">
              1
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
          <th className="px-0 text-left font-normal text-white/60">Regions</th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
              <span>Iowa, GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
              <span>Iowa, GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>N. Virginia, AWS</span>
              <span>Ireland, AWS</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            API and SDKs
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>REST</span>
              <span>Python</span>
              <span>Typescript</span>
              <span>Go</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Live Index Updates
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Scale to Zero
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Sparse Vectors
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue suffix="Coming soon" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue suffix="Coming soon" />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue suffix="Coming soon" />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue suffix="Coming soon" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Namespaces
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Metadata Filtering
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Uptime SLA
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.9%</div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.9%</div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.99%</div>
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
                  <IconHeadphones width="20" height="20" strokeWidth={1.5} />
                </span>

                <span>Support</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Community Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Email Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-white/60">
            Dedicated Support and Slack Channel
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0 align-top"
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
                  <IconCreditCard width="20" height="20" strokeWidth={1.5} />
                </span>
                <span>Price</span>
              </span>
            </div>
          </th>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Monthly Price
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
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$60</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>Contact Us</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Request Price
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
            <CompareValue>$0.4 per 100K</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>None</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>None</CompareValue>
          </td>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Storage Price
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
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$0.25 per GB</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$0.25 per GB</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Bandwidth Price
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
          </td>
          <td
            hidden={isMobile ? !showFixed : false}
            className="bg-white/3 px-4 py-0"
          >
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
          </td>
          <td
            hidden={isMobile ? !showPro : false}
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
              $0.03 per GB
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
                href={loginUrl}
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
                href={loginUrl}
                className="bg-emerald-400 font-medium text-zinc-950"
              >
                Start Now
              </Button>
            </div>
          </th>
          <th
            hidden={isMobile ? !showFixed : false}
            className="bg-zinc-950 p-0"
          >
            <div className="bg-white/3 py-4 text-white/60">
              <Button
                target="_self"
                type="button"
                hideIcon
                href={loginUrl}
                className="bg-zinc-50 font-medium text-zinc-950"
              >
                Start Now
              </Button>
            </div>
          </th>
          <th hidden={isMobile ? !showPro : false} className="bg-zinc-950 p-0">
            <div className="bg-white/3 py-4 text-white/60">
              <Button
                target="_self"
                type="button"
                hideIcon
                href={loginUrl}
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
