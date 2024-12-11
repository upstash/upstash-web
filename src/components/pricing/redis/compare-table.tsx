import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import cx from "@/utils/cx";
import { PricingPlans } from "@/utils/type";
import { IconCoin, IconCreditCard, IconInfoCircle } from "@tabler/icons-react";
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
  const showEnterprise = selectedPlans === PricingPlans.Enterprise;

  const onPlanChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingPlans;
    setSelectedPlans(value);
  };

  function Col({ plan, children, className, ...props }) {
    return (
      <td
        hidden={isMobile ? !plan : false}
        className={cx(className)}
        {...props}
      >
        {children}
      </td>
    );
  }

  return (
    <table className="w-full border-separate border-spacing-x-1 border-spacing-y-0">
      <colgroup>
        <col className="w-1/2 md:w-1/6" />
        <col className="w-1/2 md:w-1/6" />
        <col className="w-1/2 md:w-1/6" />
        <col className="w-1/2 md:w-1/6" />
        <col className="w-1/2 md:w-1/6" />
        <col className="w-1/2 md:w-1/6" />
      </colgroup>

      {/**/}

      <thead>
        <tr>
          <td className="p-0" />
          <Col
            plan={showFree}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Limit of 1 Free DB
          </Col>
          <Col
            plan={showPayg}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
          <Col
            plan={showPro2}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
          <Col
            plan={showPro10}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
          <Col
            plan={showEnterprise}
            className="border-b-2 border-b-bg bg-bg-mute px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
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
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pay as you go
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.PayAsYouGo}
              />

              <h5 className="flex items-baseline font-semibold">
                $0.2
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K commands
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showPro2} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pro 2K
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Pro2K}
              />

              <h5 className="flex items-baseline font-semibold">
                $280
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showPro10} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden text-lg font-semibold text-primary-text md:block">
                Pro 10K
              </h4>

              <MobileSelectCol
                onChange={onPlanChange}
                value={PricingPlans.Pro10K}
              />

              <h5 className="flex items-baseline font-semibold">
                $680
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

              <h5 className="flex items-baseline font-semibold">
                -
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </Col>
        </tr>
      </thead>

      {/**/}

      <tbody>
        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Capacity</StickyRow>
        </tr>

        {/*MAX COMMANDS PER SECOND*/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="This is the number of commands that your database can process per second.">
              Max commands per second
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">1000</CompareValue>
          </Col>
          <Col
            plan={showPayg}
            className="bg-emerald-300/10 px-4 py-0 align-top"
          >
            <CompareValue type="number">1000</CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">2000</CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">10000</CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">10000</CompareValue>
          </Col>
        </tr>

        {/*DAILY COMMAND LIMIT*/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Daily command limit
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">10000</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>Unlimited</CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>Unlimited</CompareValue>
          </Col>
        </tr>

        {/*MAX REQUEST SIZE*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="The max size of a single request/command.">
              Max request size
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
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
                  <IconCoin className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              1
            </CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </Col>
        </tr>

        {/*MAX RECORD SIZE*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="This is the maximum size per your entry. The entry can be String, List, Set, Hash etc.">
              Max record size
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
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
                  <IconCoin className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              100
            </CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              500
            </CompareValue>
<<<<<<< HEAD
          </td>
          <td
            hidden={isMobile ? !showPro10 : false}
            className="bg-bg-mute px-4 py-0 align-top"
          >
            <CompareValue type="size" suffix="GB">
              1
=======
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              500
>>>>>>> bf616a9 (fix redis pricing)
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              500
            </CompareValue>
          </Col>
        </tr>

        {/*MAX DATA SIZE*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="When limit is reached, if eviction is enabled, some entries will be evicted to allow new writes. Otherwise, write commands will be rejected.">
              Max data size
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="MB">
              256
            </CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="GB">
              100
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="GB">
              100
            </CompareValue>
          </Col>
        </tr>

        {/*MAX CONCURRENT CONNECTIONS*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="When the limit is reached, your idle connections may be terminated. You will not experience any issue unless all of your connections are active. Even in that case; most Redis clients reconnect automatically. You can use REST API if you expect very high number of concurrent connections.">
              Max concurrent connections
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">1000</CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">2000</CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">5000</CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="number">5000</CompareValue>
          </Col>
        </tr>

        {/*MAX MONTHLY BANDWIDTH*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="The max data transfer (bandwidth) limit per month.">
              Max monthly bandwidth
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="size" suffix="GB" className="border-b-0">
              50
            </CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="size"
              suffix="GB"
              className="border-b-0"
              after={
<<<<<<< HEAD
                <Tooltip content="Free up to 200GB per month. Beyond that, we'll prompt you to upgrade and start charging at rate $0.03 per GB.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
=======
                <Tooltip content="Free up to 200GB per month. Beyond that, $0.03 per GB.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
>>>>>>> bf616a9 (fix redis pricing)
                </Tooltip>
              }
            >
              200
            </CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="size"
              suffix="TB"
              className="border-b-0"
              after={
<<<<<<< HEAD
                <Tooltip content="Upon hitting this limit, we'll prompt you to upgrade and increase your bandwidth rate from $0.03 to $0.10 per GB.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
=======
                <Tooltip content="Upon hitting this limit, we'll prompt you to upgrade without stopping your traffic.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
>>>>>>> bf616a9 (fix redis pricing)
                </Tooltip>
              }
            >
              5
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="size"
              suffix="TB"
              className="border-b-0"
              after={
<<<<<<< HEAD
                <Tooltip content="Upon hitting this limit, we'll prompt you to upgrade and increase your bandwidth rate from $0.03 to $0.10 per GB.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
=======
                <Tooltip content="Upon hitting this limit, we'll prompt you to upgrade without stopping your traffic.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
>>>>>>> bf616a9 (fix redis pricing)
                </Tooltip>
              }
            >
              10
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="size"
              suffix="TB"
              className="border-b-0"
              after={
                <Tooltip content="Upon hitting this limit, we'll prompt you to upgrade without stopping your traffic.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              10
            </CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Features</StickyRow>
        </tr>

        {/*SUPPORTED PLATFORMS*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Supported platforms
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
            </CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
            </CompareValue>
          </Col>
        </tr>

        {/*PERSISTENCE*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Persistence
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/*REST API*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            REST API
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/*GLOBAL REPLICATION*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Global replication
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Free tier allows max one read replica.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/*STRONG CONSISTENCY*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Strong consistency
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        {/*HIGH AVAILABILITY*/}
        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            High Availability
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>Primary Replicas</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>Primary Replicas</CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>All Replicas</CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>All Replicas</CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>All Replicas</CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Uptime SLA
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>
              <div>99.99%</div>
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>
              <div>99.99%</div>
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>
              <div>99.99%</div>
            </CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Security and Privacy</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            TLS Encryption
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            IP Allowlist
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Single Sign-On (SSO)
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Role based access
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            VPC Peering
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Private Link
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Encryption at REST
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            <Tooltip content="Upstash Global regions are SOC-2 certified.">
              SOC-2 Compliance
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            HIPAA Compliance
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Observability</StickyRow>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Grafana Integration
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Datadog Integration
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            New Relic Integration
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Coming soon.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Access Logging
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow colSpan={isMobile ? 2 : 6}>Support</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Community Support
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Email Support
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Dedicated support and Slack channel
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal text-text-mute">
            Uptime SLA
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Enterprise subscription.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>
              <div>99.99%</div>
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>
              <div>99.99%</div>
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0 align-top">
            <CompareValue>
              <div>99.99%</div>
            </CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <th
            colSpan={isMobile ? 2 : 6}
            className="sticky top-20 z-10 border-y border-bg bg-bg p-0 text-left md:top-0"
          >
            <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 md:h-16">
              <span className="flex items-center gap-2 text-lg font-semibold">
                <span className="flex items-center rounded-full bg-white/10 p-2">
                  <IconCreditCard size={24} strokeWidth={1.5} />
                </span>
                <span>Price</span>
              </span>
            </div>
          </th>
        </tr>

        {/* MONTHLY PRICE */}
        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Monthly price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0">
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0">
            <CompareValue>
              $280 <br />
              +($100 ✕ read region)
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0">
            <CompareValue>
              $680 <br />
              +($200 ✕ read region)
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0">
            <CompareValue>
              $680 <br />
              +($200 ✕ read region)
            </CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Request price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0">
            <CompareValue>$0.2 per 100K</CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0">
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0">
            <CompareValue>None</CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0">
            <CompareValue>None</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Storage price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0">
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0">
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0">
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0">
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 py-4 text-left font-normal text-text-mute">
            Bandwidth price
          </th>
          {/**/}
          <Col plan={showFree} className="bg-bg-mute px-4 py-0">
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} className="bg-bg-mute px-4 py-0">
            <CompareValue
              after={
<<<<<<< HEAD
                <Tooltip content="Free up to 200GB per month. Beyond that, we'll prompt you to upgrade and start charging at rate $0.03 per GB.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
=======
                <Tooltip content="Free up to 200GB per month. Beyond that, $0.03 per GB.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
>>>>>>> bf616a9 (fix redis pricing)
                </Tooltip>
              }
            >
              Free
            </CompareValue>
          </Col>
          <Col plan={showPro2} className="bg-bg-mute px-4 py-0">
            <CompareValue
              after={
<<<<<<< HEAD
                <Tooltip content="Price can change depending on cloud provider's fee. $0.03 is when the client is in the same region until plan's limit, $0.10 beyond that.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
=======
                <Tooltip content="Price can change depending on cloud provider's fee. $0.03 is when the client is in the same region.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
>>>>>>> bf616a9 (fix redis pricing)
                </Tooltip>
              }
            >
              $0.03 per GB
            </CompareValue>
          </Col>
          <Col plan={showPro10} className="bg-bg-mute px-4 py-0">
            <CompareValue
              after={
<<<<<<< HEAD
                <Tooltip content="Price can change depending on cloud provider's fee. $0.03 is when the client is in the same region until plan's limit, $0.10 beyond that.">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
=======
                <Tooltip content="Price can change depending on cloud provider's fee. $0.03 is when the client is in the same region.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
>>>>>>> bf616a9 (fix redis pricing)
                </Tooltip>
              }
            >
              $0.03 per GB
            </CompareValue>
          </Col>
          <Col plan={showEnterprise} className="bg-bg-mute px-4 py-0">
            <CompareValue
              after={
                <Tooltip content="Price can change depending on cloud provider's fee. $0.03 is when the client is in the same region.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              $0.03 per GB
            </CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <td className="p-0" />
          <Col plan={showFree} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-primary"
              >
                Start Now
              </Button>
            </div>
          </Col>
          <Col plan={showPayg} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-primary"
              >
                Start Now
              </Button>
            </div>
          </Col>
          <Col plan={showPro2} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-primary"
              >
                Start Now
              </Button>
            </div>
          </Col>
          <Col plan={showPro10} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-primary"
              >
                Start Now
              </Button>
            </div>
          </Col>
          <Col plan={showEnterprise} className="p-0">
            <div className="bg-bg-mute py-4 text-text-mute">
              <Button
                target="_self"
                type="button"
                hideIcon
                href="https://console.upstash.com"
                className="bg-primary"
              >
                Start Now
              </Button>
            </div>
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
      <option value={PricingPlans.Pro2K}>Pro 2K</option>
      <option value={PricingPlans.Pro10K}>Pro 10K</option>
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
