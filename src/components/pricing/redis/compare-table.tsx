import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import { PricingPlans } from "@/utils/type";
import {
  IconChartLine,
  IconCoin,
  IconCreditCard,
  IconDatabase,
  IconHeadphones,
  IconInfoCircle,
  IconRocket,
  IconShieldLock,
} from "@tabler/icons-react";
import * as React from "react";
import { ChangeEvent, useState } from "react";
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
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Limit of 1 Free DB
          </th>
          <th
            hidden={isMobile ? !showPayg : false}
            className="border-b-2 border-b-bg bg-emerald-500/10 px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </th>
          <th
            hidden={isMobile ? !showPro2 : false}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </th>
          <th
            hidden={isMobile ? !showPro10 : false}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </th>
        </tr>

        <tr className="sticky top-20 z-20 md:top-0">
          <td className="" />
          <th
            hidden={isMobile ? !showFree : false}
            className="border-b border-b-bg bg-bg p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
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
            className="border-b border-b-bg bg-bg p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-500/10">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
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
                $0.2
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K commands
                </span>
              </h5>
            </div>
          </th>

          <th
            hidden={isMobile ? !showPro2 : false}
            className="border-b border-b-bg bg-bg p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
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
                $280
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </th>

          <th
            hidden={isMobile ? !showPro10 : false}
            className="border-b border-b-bg bg-bg p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
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
                $680
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
            className="sticky top-20 z-10 border-y border-bg bg-bg p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 md:h-16">
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
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="This is the number of commands that your database can process per second.">
              <span className="underline decoration-primary-text decoration-2 underline-offset-2">
                Max commands per second
              </span>
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="number">2000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Daily command limit
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="number">10000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue>Unlimited</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="The max size of a single request/command.">
              <span className="underline decoration-primary-text decoration-2 underline-offset-2">
                Max request size
              </span>
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="size"
              suffix="MB"
              after={
                <Tooltip
                  content={
                    <>
                      <h4 className="font-semibold">Custom Limit Pricing</h4>
                      <table className="mini-table mt-2">
                        <thead>
                          <tr>
                            <th>Extra Limit</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>10MB</td>
                            <td>$50</td>
                          </tr>
                          <tr>
                            <td>50MB</td>
                            <td>$80</td>
                          </tr>
                          <tr>
                            <td>100MB</td>
                            <td>$120</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  }
                >
                  <IconCoin
                    aria-label="Pricing"
                    className="ml-1 stroke-emerald-400 opacity-60"
                    stroke={1.2}
                  />
                </Tooltip>
              }
            >
              1
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="This is the maximum size per your entry. The entry can be String, List, Set, Hash etc.">
              <span className="underline decoration-primary-text decoration-2 underline-offset-2">
                Max record size
              </span>
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="size"
              suffix="MB"
              after={
                <Tooltip
                  content={
                    <>
                      <h4 className="font-semibold">Custom Limit Pricing</h4>
                      <table className="mini-table mt-2">
                        <thead>
                          <tr>
                            <th>Limit</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>256MB</td>
                            <td>$60</td>
                          </tr>
                          <tr>
                            <td>500MB</td>
                            <td>$100</td>
                          </tr>
                          <tr>
                            <td>1GB</td>
                            <td>$180</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  }
                >
                  <IconCoin
                    aria-label="Pricing"
                    className="ml-1 stroke-emerald-400 opacity-60"
                    stroke={1.2}
                  />
                </Tooltip>
              }
            >
              100
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              200
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              500
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="When limit is reached, if eviction is enabled, some entries will be evicted to allow new writes. Otherwise, write commands will be rejected.">
              <span className="underline decoration-primary-text decoration-2 underline-offset-2">
                Max data size
              </span>
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="MB">
              256
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              100
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="When the limit is reached, your idle connections may be terminated. You will not experience any issue unless all of your connections are active. Even in that case; most Redis clients reconnect automatically. You can use REST API if you expect very high number of concurrent connections.">
              <span className="underline decoration-primary-text decoration-2 underline-offset-2">
                Max concurrent connections
              </span>
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="number">2000</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="number">5000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="The max data transfer (bandwidth) limit per month.">
              <span className="underline decoration-primary-text decoration-2 underline-offset-2">
                Max monthly bandwidth
              </span>
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB" className="border-b-0">
              50
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="size"
              suffix="GB"
              className="border-b-0"
              after={
                <Tooltip content="Free up to 200GB per month. Beyond that, $0.03 per GB.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              200
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="size"
              suffix="TB"
              className="border-b-0"
              after={
                <Tooltip content="Upon hitting this limit, we'll prompt you to upgrade without stopping your traffic.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              5
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="size"
              suffix="TB"
              className="border-b-0"
              after={
                <Tooltip content="Upon hitting this limit, we'll prompt you to upgrade without stopping your traffic.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              10
            </CompareValue>
          </td>
        </tr>

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 border-y border-bg bg-bg p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 md:h-16">
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
          <th className="px-0 text-left font-normal text-text-mute">
            Supported platforms
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Persistence
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            REST API
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Global replication
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              after={
                <Tooltip content="Free tier allows max one read replica.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Strong consistency
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            High Availability
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue>Primary Replicas</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue>Primary Replicas</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue>All Replicas</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue>All Replicas</CompareValue>
          </td>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Uptime SLA
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.99%</div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            className="sticky top-20 z-10 border-y border-bg bg-bg p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 md:h-16">
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
          <th className="px-0 text-left font-normal text-text-mute">
            TLS Encryption
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            IP Allowlist
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Single Sign-On (SSO)
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Role based access
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            VPC Peering
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Private Link
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Encryption at REST
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="Upstash Global regions are SOC-2 certified.">
              <span className="underline decoration-primary-text decoration-2 underline-offset-2">
                SOC-2 Compliance
              </span>
            </Tooltip>
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" className="border-b-0" />
          </td>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            HIPAA Compliance
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 border-y border-bg bg-bg p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 md:h-16">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <IconChartLine width="20" height="20" strokeWidth={1.5} />
                </span>
                <span>Observability</span>
              </span>
            </div>
          </th>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Grafana Integration
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Datadog Integration
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            New Relic Integration
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Access Logging
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 5}
            className="sticky top-20 z-10 border-y border-bg bg-bg p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 md:h-16">
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
          <th className="px-0 text-left font-normal text-text-mute">
            Community Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Email Support
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Dedicated support and Slack channel
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Uptime SLA
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="boolean" valid={false} />
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue
              type="boolean"
              className="border-b-0"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            />
          </td>
          <td
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue className="border-b-0">
              <div>99.99%</div>
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
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
            className="sticky top-20 z-10 border-y border-bg bg-bg p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 md:h-16">
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
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Monthly price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0"
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
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue>
              $280 <br />
              +($100 ✕ read region)
            </CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue>
              $680 <br />
              +($200 ✕ read region)
            </CompareValue>
          </td>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Request price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0"
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
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue>None</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue>None</CompareValue>
          </td>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Storage price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0"
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
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue>$0.25 per GB</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue>$0.25 per GB</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Bandwidth price
          </th>
          {/**/}
          <td
            hidden={isMobile ? !showFree : false}
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue>Free</CompareValue>
          </td>
          <td
            hidden={isMobile ? !showPayg : false}
            className="bg-emerald-300/10 px-4 py-0"
          >
            <CompareValue
              after={
                <Tooltip content="Free up to 200GB per month. Beyond that, $0.03 per GB.">
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
            hidden={isMobile ? !showPro2 : false}
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue
              after={
                <Tooltip content="Price can change depending on cloud provider's fee. $0.03 is when the client is in the same region.">
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
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0"
          >
            <CompareValue
              after={
                <Tooltip content="Price can change depending on cloud provider's fee. $0.03 is when the client is in the same region.">
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
          <th hidden={isMobile ? !showFree : false} className="p-0">
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
          </th>
          <th hidden={isMobile ? !showPayg : false} className="p-0">
            <div className="bg-emerald-300/10 py-4 text-text-mute">
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
          </th>
          <th hidden={isMobile ? !showPro2 : false} className="p-0">
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
          </th>
          <th hidden={isMobile ? !showPro10 : false} className="p-0">
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
          </th>
        </tr>
      </tbody>
    </table>
  );
}
