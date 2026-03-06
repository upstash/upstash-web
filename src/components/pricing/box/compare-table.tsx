"use client";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import cx from "@/utils/cx";
import { IconInfoCircle } from "@tabler/icons-react";
import * as React from "react";
import { ChangeEvent, useState } from "react";
import CompareValue from "../compare-value";

enum BoxPlan {
  Free = "free",
  PayAsYouGo = "payg",
  Enterprise = "enterprise",
}

export default function CompareTable() {
  const isMobile = useIsMobile();

  const [selectedPlans, setSelectedPlans] = useState(BoxPlan.Free);

  const showFree = selectedPlans === BoxPlan.Free;
  const showPayg = selectedPlans === BoxPlan.PayAsYouGo;
  const showEnterprise = selectedPlans === BoxPlan.Enterprise;

  const onPlanChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as BoxPlan;
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
        <col className="w-1/1 md:w-1/4" />
        <col className="w-1/1 md:w-1/4" />
        <col className="w-1/1 md:w-1/4" />
        <col className="w-1/1 md:w-1/4" />
      </colgroup>

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
            plan={showEnterprise}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Enterprise (Coming Soon)
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
                value={BoxPlan.Free}
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
                value={BoxPlan.PayAsYouGo}
              />

              <h5 className="flex items-baseline font-semibold">
                $0.1
                <span className="ml-1 text-base font-normal opacity-40">
                  / CPU hour
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
                value={BoxPlan.Enterprise}
              />

              <h5 className="flex items-baseline font-semibold">
                Custom
              </h5>
            </div>
          </Col>
        </tr>
      </thead>

      <tbody>
        <tr>
          <StickyRow colSpan={isMobile ? 2 : 4}>Capacity</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="Default quota that can be increased on request, similar to AWS service quotas.">
              Concurrent Boxes
            </Tooltip>
          </th>
          <Col plan={showFree}>
            <CompareValue type="number">10</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Default quota. Request an increase anytime.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              100 (default)
            </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">CPU Cores / Box</th>
          <Col plan={showFree}>
            <CompareValue>2</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>2</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Memory / Box</th>
          <Col plan={showFree}>
            <CompareValue type="size" suffix="GB">
              2
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="GB">
              2
            </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Max Storage / Box</th>
          <Col plan={showFree}>
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">CPU Hours / Month</th>
          <Col plan={showFree}>
            <CompareValue>5</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="After 30 minutes of inactivity, the box freezes automatically. On the next request, it wakes up on demand — like a Lambda cold start.">
              Idle Timeout
            </Tooltip>
          </th>
          <Col plan={showFree}>
            <CompareValue>30 minutes</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>30 minutes</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Runtimes</th>
          <Col plan={showFree}>
            <CompareValue>Node.js, Python, Go, Ruby, Rust</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Node.js, Python, Go, Ruby, Rust</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Node.js, Python, Go, Ruby, Rust</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="Bring your own Docker image or custom runtime environment.">
              Custom Runtimes
            </Tooltip>
          </th>
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Coming Soon</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Coming Soon</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="Bring Your Own Key — use your own API keys from any LLM provider like OpenAI, Anthropic, etc.">
              LLM BYOK
            </Tooltip>
          </th>
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 4}>Price</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Monthly Price</th>
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">
            <Tooltip content="Billed by actual CPU consumption. For example, using 100% of 2 cores for 1 hour costs $0.2. Using 10% of 1 core for 1 hour costs $0.01. No charge when idle.">
              CPU Price
            </Tooltip>
          </th>
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$0.1 / active hour per core</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Memory Price</th>
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Storage Price</th>
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$0.1 / GB per month</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <td className="p-0" />
          <Col plan={showFree} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showPayg} feature className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showEnterprise} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="/contact">
                Contact Us
              </a>
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
      <option value={BoxPlan.Free}>Free</option>
      <option value={BoxPlan.PayAsYouGo}>Pay as you go</option>
      <option value={BoxPlan.Enterprise}>Enterprise</option>
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
