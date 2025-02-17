"use client";

import Button from "@/components/button";
import Tooltip from "@/components/tooltip";
import useIsMobile from "@/hooks/use-is-mobile";
import cx from "@/utils/cx";
import { PricingRedis } from "@/utils/type";
import { IconCoin, IconInfoCircle } from "@tabler/icons-react";
import * as React from "react";
import CompareValue from "../compare-value";

export default function CompareTable({
  selectedPlan,
  selectedFixed,
  onChangePlan,
}: {
  selectedPlan: PricingRedis;
  selectedFixed: PricingRedis;
  onChangePlan: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  const showFree = selectedPlan === PricingRedis.Free;
  const showPayg = selectedPlan === PricingRedis.PayAsYouGo;
  const showFixed250MB = selectedPlan === PricingRedis.Fixed250MB;
  const showFixed1GB = selectedPlan === PricingRedis.Fixed1GB;
  const showFixed5GB = selectedPlan === PricingRedis.Fixed5GB;
  const showFixed10GB = selectedPlan === PricingRedis.Fixed10GB;
  const showFixed50GB = selectedPlan === PricingRedis.Fixed50GB;
  const showFixed100GB = selectedPlan === PricingRedis.Fixed100GB;
  const showFixed500GB = selectedPlan === PricingRedis.Fixed500GB;
  const showEnterprise = selectedPlan === PricingRedis.Enterprise;

  const showFixed =
    showFixed250MB ||
    showFixed1GB ||
    showFixed5GB ||
    showFixed10GB ||
    showFixed50GB ||
    showFixed100GB ||
    showFixed500GB;

  const selectedFixed250MB = selectedFixed === PricingRedis.Fixed250MB;
  const selectedFixed1GB = selectedFixed === PricingRedis.Fixed1GB;
  const selectedFixed5GB = selectedFixed === PricingRedis.Fixed5GB;
  const selectedFixed10GB = selectedFixed === PricingRedis.Fixed10GB;
  const selectedFixed50GB = selectedFixed === PricingRedis.Fixed50GB;
  const selectedFixed100GB = selectedFixed === PricingRedis.Fixed100GB;
  const selectedFixed500GB = selectedFixed === PricingRedis.Fixed500GB;

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
          // mobile
          "hidden",
          plan && "table-cell",

          // desktop
          "md:table-cell",

          // other
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
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Limit of 1 Free DB
          </Col>
          <Col
            plan={showPayg}
            feature
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Usage Based Pricing
          </Col>
          <Col
            plan={showFixed}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
          <Col
            plan={showEnterprise}
            className="border-b-2 border-b-bg px-0 py-3 text-xs font-medium uppercase tracking-wider text-text-mute"
          >
            Fixed Pricing
          </Col>
        </tr>

        <tr className="sticky top-20 z-20 md:top-0">
          <td className="" />

          <Col plan={showFree} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden py-1 text-lg font-bold text-primary-text md:block">
                Free
              </h4>

              <MobileSelectCol
                onChange={onChangePlan}
                value={PricingRedis.Free}
              />

              <h5 className="mt-1 flex items-baseline text-text-mute">-</h5>
            </div>
          </Col>

          <Col plan={showPayg} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-emerald-600/20 dark:bg-emerald-800/20">
              <h4 className="hidden py-1 text-lg font-bold text-primary-text md:block">
                Pay as you go
              </h4>

              <MobileSelectCol
                onChange={onChangePlan}
                value={PricingRedis.PayAsYouGo}
              />

              <h5 className="mt-1 flex items-baseline font-semibold">
                $0.2
                <span className="ml-1 text-base font-normal opacity-40">
                  / 100K commands
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showFixed} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <MobileSelectCol
                onChange={onChangePlan}
                value={selectedFixed}
                className="mb-0 hidden py-1 text-lg font-bold text-primary-text shadow-sm md:block"
              >
                <option value={PricingRedis.Fixed250MB}>Fixed 250MB</option>
                <option value={PricingRedis.Fixed1GB}>Fixed 1GB</option>
                <option value={PricingRedis.Fixed5GB}>Fixed 5GB</option>
                <option value={PricingRedis.Fixed10GB}>Fixed 10GB</option>
                <option value={PricingRedis.Fixed50GB}>Fixed 50GB</option>
                <option value={PricingRedis.Fixed100GB}>Fixed 100GB</option>
                <option value={PricingRedis.Fixed500GB}>Fixed 500GB</option>
              </MobileSelectCol>

              <MobileSelectCol onChange={onChangePlan} value={selectedFixed} />

              <h5 className="mt-1 flex items-baseline font-semibold">
                {selectedFixed250MB && <>$10</>}
                {selectedFixed1GB && <>$20</>}
                {selectedFixed5GB && <>$100</>}
                {selectedFixed10GB && <>$200</>}
                {selectedFixed50GB && <>$400</>}
                {selectedFixed100GB && <>$800</>}
                {selectedFixed500GB && <>$1500</>}
                <span className="ml-1 text-base font-normal opacity-40">
                  / month
                </span>
              </h5>
            </div>
          </Col>

          <Col plan={showEnterprise} className="border-b border-b-bg bg-bg p-0">
            <div className="flex h-24 flex-col items-center justify-center bg-bg-mute">
              <h4 className="hidden py-1 text-lg font-bold text-primary-text md:block">
                Enterprise
              </h4>

              <MobileSelectCol
                onChange={onChangePlan}
                value={PricingRedis.Enterprise}
              />

              <h5 className="mt-1 flex items-baseline text-text-mute">-</h5>
            </div>
          </Col>
        </tr>
      </thead>

      {/**/}

      <tbody>
        <tr>
          <StickyRow>Capacity</StickyRow>
        </tr>

        {/*MAX COMMANDS PER SECOND*/}

        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="This is the number of commands that your database can process per second.">
              Max commands per second
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">1000</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="number"
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
                            <td>2000</td>
                            <td>$150</td>
                          </tr>
                          <tr>
                            <td>5000</td>
                            <td>$200</td>
                          </tr>
                          <tr>
                            <td>10000</td>
                            <td>$300</td>
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
              1000
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            {selectedFixed250MB && (
              <CompareValue type="number">1000</CompareValue>
            )}
            {selectedFixed1GB && (
              <CompareValue type="number">1000</CompareValue>
            )}
            {selectedFixed5GB && (
              <CompareValue type="number">2000</CompareValue>
            )}
            {selectedFixed10GB && (
              <CompareValue type="number">2000</CompareValue>
            )}
            {selectedFixed50GB && (
              <CompareValue type="number">2000</CompareValue>
            )}
            {selectedFixed100GB && (
              <CompareValue type="number">10000</CompareValue>
            )}
            {selectedFixed500GB && (
              <CompareValue type="number">10000</CompareValue>
            )}
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="plain">Custom</CompareValue>
          </Col>
        </tr>

        {/*MAX REQUEST SIZE*/}
        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="The max size of a single request/command.">
              Max request size
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
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
          <Col plan={showFixed}>
            {selectedFixed250MB && (
              <CompareValue type="size" suffix="MB">
                1
              </CompareValue>
            )}
            {selectedFixed1GB && (
              <CompareValue type="size" suffix="MB">
                1
              </CompareValue>
            )}
            {selectedFixed5GB && (
              <CompareValue type="size" suffix="MB">
                5
              </CompareValue>
            )}
            {selectedFixed10GB && (
              <CompareValue type="size" suffix="MB">
                5
              </CompareValue>
            )}
            {selectedFixed50GB && (
              <CompareValue type="size" suffix="MB">
                10
              </CompareValue>
            )}
            {selectedFixed100GB && (
              <CompareValue type="size" suffix="MB">
                10
              </CompareValue>
            )}
            {selectedFixed500GB && (
              <CompareValue type="size" suffix="MB">
                10
              </CompareValue>
            )}
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </Col>
        </tr>

        {/*MAX RECORD SIZE*/}
        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="This is the maximum size per your entry. The entry can be String, List, Set, Hash etc.">
              Max record size
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
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
                            <td>250MB</td>
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
          <Col plan={showFixed}>
            {selectedFixed250MB && (
              <CompareValue type="size" suffix="MB">
                100
              </CompareValue>
            )}
            {selectedFixed1GB && (
              <CompareValue type="size" suffix="MB">
                100
              </CompareValue>
            )}
            {selectedFixed5GB && (
              <CompareValue type="size" suffix="MB">
                200
              </CompareValue>
            )}
            {selectedFixed10GB && (
              <CompareValue type="size" suffix="MB">
                200
              </CompareValue>
            )}
            {selectedFixed50GB && (
              <CompareValue type="size" suffix="MB">
                500
              </CompareValue>
            )}
            {selectedFixed100GB && (
              <CompareValue type="size" suffix="GB">
                1
              </CompareValue>
            )}
            {selectedFixed500GB && (
              <CompareValue type="size" suffix="GB">
                1
              </CompareValue>
            )}
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="size" suffix="GB">
              5
            </CompareValue>
          </Col>
        </tr>

        {/*MAX DATA SIZE*/}
        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="When limit is reached, if eviction is enabled, some entries will be evicted to allow new writes. Otherwise, write commands will be rejected.">
              Max data size
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="MB">
              256
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="size" suffix="GB">
              100
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            {selectedFixed250MB && (
              <CompareValue type="size" suffix="MB">
                250
              </CompareValue>
            )}
            {selectedFixed1GB && (
              <CompareValue type="size" suffix="GB">
                1
              </CompareValue>
            )}
            {selectedFixed5GB && (
              <CompareValue type="size" suffix="GB">
                5
              </CompareValue>
            )}
            {selectedFixed10GB && (
              <CompareValue type="size" suffix="GB">
                10
              </CompareValue>
            )}
            {selectedFixed50GB && (
              <CompareValue type="size" suffix="GB">
                50
              </CompareValue>
            )}
            {selectedFixed100GB && (
              <CompareValue type="size" suffix="GB">
                100
              </CompareValue>
            )}
            {selectedFixed500GB && (
              <CompareValue type="size" suffix="GB">
                500
              </CompareValue>
            )}
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="size" suffix="TB">
              10
            </CompareValue>
          </Col>
        </tr>

        {/*MAX CONCURRENT CONNECTIONS*/}
        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="When the limit is reached, your idle connections may be terminated. You will not experience any issue unless all of your connections are active. Even in that case; most Redis clients reconnect automatically. You can use REST API if you expect very high number of concurrent connections.">
              Max concurrent connections
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="number">100</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="number"
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
                            <td>2000</td>
                            <td>$200</td>
                          </tr>
                          <tr>
                            <td>5000</td>
                            <td>$400</td>
                          </tr>
                          <tr>
                            <td>10000</td>
                            <td>$600</td>
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
              1000
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            {selectedFixed250MB && (
              <CompareValue type="number">256</CompareValue>
            )}
            {selectedFixed1GB && (
              <CompareValue type="number">1000</CompareValue>
            )}
            {selectedFixed5GB && (
              <CompareValue type="number">5000</CompareValue>
            )}
            {selectedFixed10GB && (
              <CompareValue type="number">10000</CompareValue>
            )}
            {selectedFixed50GB && (
              <CompareValue type="number">10000</CompareValue>
            )}
            {selectedFixed100GB && (
              <CompareValue type="number">10000</CompareValue>
            )}
            {selectedFixed500GB && (
              <CompareValue type="number">100000</CompareValue>
            )}
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="number">100000</CompareValue>
          </Col>
        </tr>

        {/*MAX MONTHLY BANDWIDTH*/}
        <tr>
          <th className="px-0 text-left font-normal">
            <Tooltip content="The max data transfer (bandwidth) limit per month.">
              Max monthly bandwidth
            </Tooltip>
          </th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="size" suffix="GB" className="border-b-0">
              10
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="size"
              className="border-b-0"
              after={
                <Tooltip content="Free up to 200GB per month. Beyond that $0.03 per GB.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              Unlimited
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            {selectedFixed250MB && (
              <CompareValue
                type="size"
                suffix="GB"
                className="border-b-0"
                after={
                  <Tooltip content="Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                50
              </CompareValue>
            )}
            {selectedFixed1GB && (
              <CompareValue
                type="size"
                suffix="GB"
                className="border-b-0"
                after={
                  <Tooltip content="Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                100
              </CompareValue>
            )}
            {selectedFixed5GB && (
              <CompareValue
                type="size"
                suffix="GB"
                className="border-b-0"
                after={
                  <Tooltip content="Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                500
              </CompareValue>
            )}
            {selectedFixed10GB && (
              <CompareValue
                type="size"
                suffix="TB"
                className="border-b-0"
                after={
                  <Tooltip content="Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                1
              </CompareValue>
            )}
            {selectedFixed50GB && (
              <CompareValue
                type="size"
                suffix="TB"
                className="border-b-0"
                after={
                  <Tooltip content="Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                5
              </CompareValue>
            )}
            {selectedFixed100GB && (
              <CompareValue
                type="size"
                suffix="TB"
                className="border-b-0"
                after={
                  <Tooltip content="Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                10
              </CompareValue>
            )}
            {selectedFixed500GB && (
              <CompareValue
                type="size"
                suffix="TB"
                className="border-b-0"
                after={
                  <Tooltip content="Upon hitting this limit, the DB will either be upgraded or limited depending on auto-upgrade setting.">
                    <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                  </Tooltip>
                }
              >
                20
              </CompareValue>
            )}
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="size" className="border-b-0">
              Unlimited
            </CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow>Features</StickyRow>
        </tr>

        {/*SUPPORTED PLATFORMS*/}
        <tr>
          <th className="px-0 text-left font-normal">Supported platforms</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>Vercel</span>
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
              <span>Vercel</span>
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
              <span>Vercel</span>
            </CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
              <span>FLY</span>
              <span>Vercel</span>
            </CompareValue>
          </Col>
        </tr>

        {/*PERSISTENCE*/}
        <tr>
          <th className="px-0 text-left font-normal">Persistence</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/*REST API*/}
        <tr>
          <th className="px-0 text-left font-normal">REST API</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/*GLOBAL REPLICATION*/}
        <tr>
          <th className="px-0 text-left font-normal">Global replication</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue
              type="boolean"
              after={
                <Tooltip content="Free tier allows max one read replica.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/*STRONG CONSISTENCY*/}
        <tr>
          <th className="px-0 text-left font-normal">Strong consistency</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
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
          <th className="px-0 text-left font-normal">High Availability</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Primary Replicas</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>Primary Replicas</CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue>Primary Replicas</CompareValue>
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue>Primary and Read Replicas</CompareValue>
          </Col>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal">Uptime SLA</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
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
          <StickyRow>Security and Privacy</StickyRow>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">TLS Encryption</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">IP Allowlist</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Role based access</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
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
          <th className="px-0 text-left font-normal">Encryption at REST</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
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
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
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
          <th className="px-0 text-left font-normal">Private Link</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>

          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        {/**/}
        <tr>
          <th className="px-0 text-left font-normal">VPC Peering</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Single Sign-On (SSO)</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>

          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">HIPAA Compliance</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow>Observability</StickyRow>
        </tr>

        {/**/}

        <tr>
          <th className="px-0 text-left font-normal">Grafana Integration</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
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
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
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
          <th className="px-0 text-left font-normal">New Relic Integration</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Access Logging</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        {/**/}

        <tr>
          <StickyRow>Support</StickyRow>
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
          <Col plan={showFixed}>
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
          <Col plan={showFixed}>
            <CompareValue type="boolean" />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" />
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Uptime SLA</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showFixed}>
            <CompareValue
              type="boolean"
              valid={false}
              after={
                <Tooltip content="Available with Prod Pack.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>
              <div>99.99%</div>
            </CompareValue>
          </Col>
        </tr>

        {/**/}

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
          <Col plan={showFixed}>
            <CompareValue type="boolean" valid={false} />
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue type="boolean" valid={true} />
          </Col>
        </tr>

        <tr>
          <StickyRow>Price</StickyRow>
        </tr>

        {/* MONTHLY PRICE */}
        <tr>
          <th className="px-0 text-left font-normal">Monthly price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>
              Free
              <br />
              &nbsp;
            </CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>
              -
              <br />
              &nbsp;
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            {selectedFixed250MB && (
              <CompareValue>
                $10 <br />
                +($5 ✕ read region)
              </CompareValue>
            )}
            {selectedFixed1GB && (
              <CompareValue>
                $20 <br />
                +($10 ✕ read region)
              </CompareValue>
            )}
            {selectedFixed5GB && (
              <CompareValue>
                $100 <br />
                +($50 ✕ read region)
              </CompareValue>
            )}
            {selectedFixed10GB && (
              <CompareValue>
                $200 <br />
                +($100 ✕ read region)
              </CompareValue>
            )}
            {selectedFixed50GB && (
              <CompareValue>
                $400 <br />
                +($200 ✕ read region)
              </CompareValue>
            )}
            {selectedFixed100GB && (
              <CompareValue>
                $800 <br />
                +($400 ✕ read region)
              </CompareValue>
            )}
            {selectedFixed500GB && (
              <CompareValue>
                $1500 <br />
                +($750 ✕ read region)
              </CompareValue>
            )}
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Request price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="The write commands are replicated to all read regions in addition to primary region so the replications are counted as commands. For example, if you have one primary and one read region, 100K writes will cost $0.4 ($0.2 x 2).">
                  <IconInfoCircle
                    className="ml-1 opacity-60"
                    stroke={1.2}
                    aria-label="Info"
                  />
                </Tooltip>
              }
            >
              $0.2 per 100K
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue>-</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>
        <tr>
          <th className="px-0 text-left font-normal">Storage price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue>$0.25 per GB</CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue>-</CompareValue>
          </Col>
          <Col plan={showEnterprise}>
            <CompareValue>Custom</CompareValue>
          </Col>
        </tr>

        <tr>
          <th className="px-0 text-left font-normal">Bandwidth price</th>
          {/**/}
          <Col plan={showFree}>
            <CompareValue>Free</CompareValue>
          </Col>
          <Col plan={showPayg} feature>
            <CompareValue
              after={
                <Tooltip content="Free up to 200GB per month. Beyond that, $0.03 per GB.">
                  <IconInfoCircle className="ml-1" stroke={1.5} size={24} />
                </Tooltip>
              }
            >
              Free
            </CompareValue>
          </Col>
          <Col plan={showFixed}>
            <CompareValue>-</CompareValue>
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
          <Col plan={showFixed} className="py-4">
            <Button asChild variant="primary">
              <a target="_self" href="https://console.upstash.com">
                Start Now
              </a>
            </Button>
          </Col>
          <Col plan={showEnterprise} className="py-4">
            <Button asChild variant="secondary">
              <a target="_self" href="https://upstash.com/contact">
                Contact Us
              </a>
            </Button>
          </Col>
        </tr>
      </tbody>
    </table>
  );
}

function MobileSelectCol({
  children,
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cx(
        "mb-2 bg-white px-4 py-2 font-semibold md:hidden dark:bg-bg-mute",
        className,
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <>
          <option value={PricingRedis.Free}>Free</option>
          <option value={PricingRedis.PayAsYouGo}>Pay as you go</option>
          <option value={PricingRedis.Fixed250MB}>Fixed 250MB</option>
          <option value={PricingRedis.Fixed1GB}>Fixed 1GB</option>
          <option value={PricingRedis.Fixed5GB}>Fixed 5GB</option>
          <option value={PricingRedis.Fixed10GB}>Fixed 10GB</option>
          <option value={PricingRedis.Fixed50GB}>Fixed 50GB</option>
          <option value={PricingRedis.Fixed100GB}>Fixed 100GB</option>
          <option value={PricingRedis.Fixed500GB}>Fixed 500GB</option>
          <option value={PricingRedis.Enterprise}>Enterprise</option>
        </>
      )}
    </select>
  );
}

function StickyRow({ children, ...props }: React.ComponentProps<"th">) {
  const isMobile = useIsMobile();

  return (
    <th
      className="sticky top-20 z-10 border-y-2 border-bg bg-bg p-0 text-left md:top-0"
      colSpan={isMobile ? 2 : 5}
      {...props}
    >
      <div className="-ml-4 flex h-24 items-center bg-gradient-to-r from-bg-mute to-bg px-4 text-lg font-semibold md:h-16">
        {children}
      </div>
    </th>
  );
}
