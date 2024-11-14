import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import { PricingPlans } from "@/utils/type";
import {
  IconCreditCard,
  IconDatabase,
  IconInfoCircle,
} from "@tabler/icons-react";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import CompareValue from "../compare-value";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState(PricingPlans.Free);

  const showFree = selectedPlans === PricingPlans.Free;
  const showPayg = selectedPlans === PricingPlans.PayAsYouGo;
  const showPro1 = selectedPlans === PricingPlans.Pro1M;
  const showPro10 = selectedPlans === PricingPlans.Pro10M;

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
            hidden={isMobile ? !showPro1 : false}
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
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-300/10">
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

              <h5 className="flex items-baseline font-semibold">
                $1
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K messages
                </span>
              </h5>
            </div>
          </th>
          <th
            hidden={isMobile ? !showPro1 : false}
            className="border-b border-b-zinc-800 bg-zinc-950 p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-white/3">
              <h4 className="hidden text-lg font-semibold text-emerald-400 md:block">
                Pro 1M
              </h4>

              <select
                className="bg-transparent px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Pro1M}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Pro1M} disabled>
                  Pro 1M
                </option>
                <option value={PricingPlans.Pro10M}>Pro 10M</option>
              </select>

              <h5 className="flex items-baseline font-semibold">
                $180
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
                Pro 10M
              </h4>

              <select
                className="bg-transparent px-4 py-2 font-semibold md:hidden"
                onChange={onPlanChange}
                value={PricingPlans.Pro10M}
              >
                <option value={PricingPlans.Free}>Free</option>
                <option value={PricingPlans.PayAsYouGo}>Pay as you go</option>
                <option value={PricingPlans.Pro1M}>Pro 1M</option>
                <option value={PricingPlans.Pro10M} disabled>
                  Pro 10M
                </option>
              </select>

              <h5 className="flex items-baseline font-semibold">
                $420
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </th>
        </tr>
      </thead>

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
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>1M</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>10M</CompareValue>
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
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>500</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>1000</CompareValue>
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
              10
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="size" suffix="MB">
              50
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Number of URL Groups
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
            <CompareValue>100</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>2000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Number of Endpoints per URL Group
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
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>2000</CompareValue>
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
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>20</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>100</CompareValue>
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
            <CompareValue>1 year</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
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
            Max HTTP Connection Timeout
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>15 minutes</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue>2 hours</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>6 hours</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>12 hours</CompareValue>
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
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>30 days</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>3 months</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Active Schedules
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
            <CompareValue
              type="number"
              after={
                <Tooltip content="Free up to 1000. Beyond that, $0.01 per active schedule.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              1000
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue
              after={
                <Tooltip content="Free up to 10K. Beyond that, $0.01 per active schedule.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              10000
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue
              after={
                <Tooltip content="Free up to 50K. Beyond that, $0.01 per active schedule.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              50000
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Queue Count
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
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>1000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Queue Parallelism
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">2</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue type="number">10</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>10</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>10</CompareValue>
          </td>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Max Events Size
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
            <CompareValue type="number">10000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">100000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue type="number">100000</CompareValue>
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
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.99%</div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.99%</div>
            </CompareValue>
          </td>
        </tr>

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
            hidden={isMobile ? !showPro1 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$180</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-white/3 px-4 py-0"
          >
            <CompareValue>$420</CompareValue>
          </td>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-white/60">
            Message price
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
            <CompareValue>$1 per 100K</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro1 : false}
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
      </tbody>
    </table>
  );
}
