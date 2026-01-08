"use client";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import cx from "@/utils/cx";
import { PricingPlans } from "@/utils/type";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import CompareValue from "../compare-value";

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState(PricingPlans.Free);

  const showFree = selectedPlans === PricingPlans.Free;
  const showPayg = selectedPlans === PricingPlans.PayAsYouGo;
  const showFixed1 = selectedPlans === PricingPlans.Pro1M;
  const showFixed10 = selectedPlans === PricingPlans.Pro10M;
  const showEnterprise = selectedPlans === PricingPlans.Enterprise;

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
        <col className="w-1/1 md:w-1/6" />
        <col className="w-1/1 md:w-1/6" />
        <col className="w-1/1 md:w-1/6" />
        <col className="w-1/1 md:w-1/6" />
        <col className="w-1/1 md:w-1/6" />
        <col className="w-1/1 md:w-1/6" />
      </colgroup>

      {/**/}

      <thead>
        <tr>
          <td className="p-0" />
          <Col
            plan={showFree}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Free
          </Col>
          <Col
            plan={showPayg}
            feature
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
          <Col
            plan={showFixed1}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
          <Col
            plan={showFixed10}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
          <Col
            plan={showEnterprise}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Enterprise
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
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-600/20 dark:bg-emerald-800/20">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pay as you go
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.PayAsYouGo}
              />

              <h5 className="flex items-baseline font-semibold">
                $1
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K messages
                </span>
              </h5>
            </div>
          </Col>
          <Col plan={showFixed1} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Fixed 1M
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Pro1M}
              />

              <h5 className="flex items-baseline font-semibold">
                $180
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showFixed10} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Fixed 10M
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Pro10M}
              />

              <h5 className="flex items-baseline font-semibold">
                $420
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showEnterprise} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Enterprise
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Enterprise}
              />

              <h5 className="flex items-baseline text-text-mute">-</h5>
            </div>
          </Col>
        </tr>
      </thead>

      <tbody>
        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Capacity</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max Messages per Day
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">1000</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showFixed1}>
              <CompareValue
                type="size"
                suffix="M"
                className="border-b-0"
                after={
                  <Tooltip content="We'll reach out for an upgrade if the quota is exceeded consistently.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                1
              </CompareValue>
          </Col>
          <Col plan={showFixed10}>
              <CompareValue
                type="size"
                suffix="M"
                className="border-b-0"
                after={
                  <Tooltip content="We'll reach out for an upgrade if the quota is exceeded consistently.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                10
              </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">100M+</CompareValue>
          </Col>
        </tr>

         {/*MAX MONTHLY BANDWIDTH*/}
        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="The max total data size going out from QStash to user endpoints per month.">
              Max Monthly Bandwidth
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="GB" className="border-b-0">
              50
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="size"
              suffix="GB"
              className="border-b-0"
              after={
                <Tooltip content="Free up to 50GB per month. Beyond that $0.05 per GB.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              50
            </CompareValue>
          </Col>
          <Col plan={showFixed1}>
              <CompareValue
                type="size"
                suffix="TB"
                className="border-b-0"
                after={
                  <Tooltip content="We'll reach out for an upgrade if the quota is exceeded consistently.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                1
              </CompareValue>
          </Col>
          <Col plan={showFixed10}>
              <CompareValue
                type="size"
                suffix="TB"
                className="border-b-0"
                after={
                  <Tooltip content="We'll reach out for an upgrade if the quota is exceeded consistently">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                5
              </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Max Message Size</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue type="size" suffix="MB">
              50
            </CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue type="size" suffix="MB">
              50
            </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max Number of URL Groups
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>1</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>100</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>2000</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max Number of Endpoints per URL Group
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>100</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>100</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>2000</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Max Delay</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>7 days</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>1 year</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max HTTP Response Duration
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>15 minutes</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>2 hours</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>6 hours</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>12 hours</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Max DLQ Retention</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>3 days</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>7 days</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>30 days</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>3 months</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max Logs Retention
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>3 days</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>7 days</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>14 days</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>14 days</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal">
            Max Active Schedules
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">10</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="number"
              after={
                <Tooltip content="Free up to 1000. Beyond that, $0.01 per active schedule.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              1000
            </CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue
              after={
                <Tooltip content="Free up to 10K. Beyond that, $0.01 per active schedule.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              10000
            </CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue
              after={
                <Tooltip content="Free up to 50K. Beyond that, $0.01 per active schedule.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              50000
            </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Max Queue Count</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">10</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="Max Parallelism that can be set per Queue">
              Max Queue Parallelism
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">2</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">10</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>10</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>10</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="Excess publishes will be delayed until old publishes finish. They will not be rejected.">
              Max Parallelism
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>10</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>100</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>200</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Features</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Uptime SLA</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed1}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Security and Privacy</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Encryption at rest</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed1}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="Upstash Global regions are SOC-2 certified.">
              SOC-2 Compliance
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed1}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">SAML Single Sign-On (SSO)</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed1}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Observability</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Prometheus Integration</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed1}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Datadog Integration</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed1}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Support</StickyRow>
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
          <Col plan={showFixed1}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise}>
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
          <Col plan={showFixed1}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">
            Dedicated support and Slack channel
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed1}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed10}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Price</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Monthly price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>$180</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>$420</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal">Message price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$1 per 100K</CompareValue>
          </Col>
          <Col plan={showFixed1}>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showFixed10}>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <td className="p-0" />
          <Col plan={showFree} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com/qstash">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showPayg} feature className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com/qstash">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showFixed1} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showFixed10} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com/qstash">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showEnterprise} className="py-4">
            <Button asChild variant="secondary">
              <Link href="/enterprise">Learn More</Link>
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
      <option value={PricingPlans.Pro1M}>Fixed 1M</option>
      <option value={PricingPlans.Pro10M}>Fixed 10M</option>
      <option value={PricingPlans.Enterprise}>Enterprise</option>
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
