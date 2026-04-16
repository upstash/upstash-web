"use client";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import cx from "@/utils/cx";
import { IconInfoCircle } from "@tabler/icons-react";
import * as React from "react";
import CompareValue from "../compare-value";

enum BoxPlan {
  Free = "free",
  PayAsYouGo = "payg",
  Enterprise = "enterprise",
}

const BOX_SIZES = {
  small: {
    shortLabel: "S",
    label: "Small",
    cpu: "2",
    memory: "4",
    storage: "5",
    usagePrice: "$0.1",
    keepAlivePrice: "$8",
  },
  medium: {
    shortLabel: "M",
    label: "Medium",
    cpu: "4",
    memory: "8",
    storage: "10",
    usagePrice: "$0.2",
    keepAlivePrice: "$16",
  },
  large: {
    shortLabel: "L",
    label: "Large",
    cpu: "8",
    memory: "16",
    storage: "20",
    usagePrice: "$0.4",
    keepAlivePrice: "$32",
  },
} as const;

type BoxSize = keyof typeof BOX_SIZES;

export default function CompareTable() {
  const isMobile = useIsMobile();
  const [selectedPlan, setSelectedPlan] = React.useState(BoxPlan.Free);
  const [selectedSize, setSelectedSize] = React.useState<BoxSize>("small");

  const showFree = selectedPlan === BoxPlan.Free;
  const showPayg = selectedPlan === BoxPlan.PayAsYouGo;
  const showEnterprise = selectedPlan === BoxPlan.Enterprise;
  const selectedSpec = BOX_SIZES[selectedSize];

  const onPlanChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlan(event.target.value as BoxPlan);
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
        className={cx(
          "hidden",
          plan && "table-cell",
          "md:table-cell",
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
        <col className="w-1/2 md:w-1/4" />
        <col className="w-1/2 md:w-1/4" />
        <col className="w-1/2 md:w-1/4" />
        <col className="w-1/2 md:w-1/4" />
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
            Pay as you go
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
              <h4 className="hidden py-1 text-lg font-bold text-primary-text md:block">
                Free
              </h4>

              <MobilePlanSelect onChange={onPlanChange} value={BoxPlan.Free} />

              <h5 className="mt-1 flex items-baseline font-semibold">-</h5>
            </div>
          </Col>

          <Col
            plan={showPayg}
            feature
            className="border-b border-b-bg bg-bg p-0"
          >
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-600/20 dark:bg-emerald-800/20">
              <MobilePlanSelect
                onChange={onPlanChange}
                value={BoxPlan.PayAsYouGo}
              />

              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as BoxSize)}
                className="mb-0 bg-white px-4 py-2 font-semibold text-primary-text shadow-sm md:py-1 md:text-lg md:font-bold dark:bg-bg-mute"
              >
                {Object.entries(BOX_SIZES).map(([key, spec]) => (
                  <option key={key} value={key}>
                    {spec.label}
                  </option>
                ))}
              </select>

              <h5 className="mt-1 flex items-baseline font-semibold">
                {selectedSpec.usagePrice}
                <span className="ml-1 text-base font-normal opacity-40">
                  / active CPU hour
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showEnterprise} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden py-1 text-lg font-bold text-primary-text md:block">
                Enterprise
              </h4>

              <MobilePlanSelect
                onChange={onPlanChange}
                value={BoxPlan.Enterprise}
              />

              <h5 className="mt-1 flex items-baseline font-semibold">Custom</h5>
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
              1000 (default)
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
            <CompareValue>{selectedSpec.cpu}</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Memory / Box</th>
          <Col plan={showFree}>
            <CompareValue type="size" suffix="GB">
              4
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="GB">
              {selectedSpec.memory}
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
              5
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="GB">
              {selectedSpec.storage}
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
            <Tooltip content="Standard boxes auto-pause after inactivity. Keep-alive boxes stay on continuously and are billed separately with fixed monthly pricing.">
              Idle Timeout
            </Tooltip>
          </th>
          <Col plan={showFree}>
            <CompareValue>30 minutes</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>1 hour</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal">Keep Alive</th>
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              after={
                <Tooltip
                  content={
                    <>
                      <h4 className="font-semibold">Keep alive pricing</h4>
                      <table className="mini-table mt-2">
                        <thead>
                          <tr>
                            <th>Size</th>
                            <th>Monthly price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.values(BOX_SIZES).map((spec) => (
                            <tr key={spec.label}>
                              <td>{spec.label}</td>
                              <td>{spec.keepAlivePrice}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  }
                >
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
            <Tooltip content="Standard boxes are billed by active CPU usage. Keep-alive boxes use separate monthly pricing by size.">
              CPU Price
            </Tooltip>
          </th>
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>
              {selectedSpec.usagePrice} / active CPU hour
            </CompareValue>
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

function MobilePlanSelect({ ...props }: React.ComponentProps<"select">) {
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
