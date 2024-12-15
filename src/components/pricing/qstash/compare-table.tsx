import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import cx from "@/utils/cx";
import { PricingPlans } from "@/utils/type";
import { IconInfoCircle } from "@tabler/icons-react";
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
        <col className="w-1/1 md:w-1/5" />
        <col className="w-1/1 md:w-1/5" />
        <col className="w-1/1 md:w-1/5" />
        <col className="w-1/1 md:w-1/5" />
        <col className="w-1/1 md:w-1/5" />
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
            plan={showPro1}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
          <Col
            plan={showPro10}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
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
          <Col plan={showPro1} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pro 1M
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

          <Col plan={showPro10} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pro 10M
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
        </tr>
      </thead>

      <tbody>
        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Capacity</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Messages per Day
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">500</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">500000</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>1M</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>10M</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Requests per Second
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>500</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>1000</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Message Size
          </th>
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
          <Col plan={showPro1}>
            <CompareValue type="size" suffix="MB">
              50
            </CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue type="size" suffix="MB">
              50
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Number of URL Groups
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>1</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>100</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>2000</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Number of Endpoints per URL Group
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>100</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>100</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>2000</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Retry Count
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>3</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>5</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>20</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>100</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Delay
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>7 days</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>1 year</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max HTTP Connection Timeout
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>15 minutes</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>2 hours</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>6 hours</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>12 hours</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max DLQ Retention
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>3 days</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>7 days</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>30 days</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>3 months</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
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
          <Col plan={showPro1}>
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
          <Col plan={showPro10}>
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
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Queue Count
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">10</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>1000</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>1000</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Queue Parallelism
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">2</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">10</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>10</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>10</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Max Events Size
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">10000</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="number">10000</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue type="number">100000</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue type="number">100000</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Uptime SLA
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro1}>
            <CompareValue className="">
              <div>99.99%</div>
            </CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue className="">
              <div>99.99%</div>
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 5}>Price</StickyRow>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Monthly price
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>$180</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>$420</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Message price
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$1 per 100K</CompareValue>
          </Col>
          <Col plan={showPro1}>
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showPro10}>
            <CompareValue>None</CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <td className="p-0" />
          <Col plan={showFree} className="py-4">
            <Button
              target="_self"
              type="button"
              hideIcon
              href="https://console.upstash.com"
              className="bg-primary"
            >
              Start Now
            </Button>
          </Col>
          <Col plan={showPayg} feature className="py-4">
            <Button
              target="_self"
              type="button"
              hideIcon
              href="https://console.upstash.com"
              className="bg-primary"
            >
              Start Now
            </Button>
          </Col>
          <Col plan={showPro1} className="py-4">
            <Button
              target="_self"
              type="button"
              hideIcon
              href="https://console.upstash.com"
              className="bg-primary"
            >
              Start Now
            </Button>
          </Col>
          <Col plan={showPro10} className="py-4">
            <Button
              target="_self"
              type="button"
              hideIcon
              href="https://console.upstash.com"
              className="bg-primary"
            >
              Start Now
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
      <option value={PricingPlans.Pro1M}>Pro 1M</option>
      <option value={PricingPlans.Pro10M}>Pro 10M</option>
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
