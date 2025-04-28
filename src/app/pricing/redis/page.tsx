"use client";

import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import Enterprise from "@/components/pricing/enterprise";
import ProductToggle from "@/components/pricing/product-toggle";
import CompareTable from "@/components/pricing/redis/compare-table";
import PricingTable from "@/components/pricing/redis/pricing-table";
import { PROD_PACK_SECTION_ID } from "@/constants";
import cx from "@/utils/cx";
import { PricingRedis } from "@/utils/type";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const ProdPackButton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cx(
        "w-fit rounded-xl bg-purple-200 px-4 py-2 font-medium text-purple-950 dark:bg-purple-50",
        className,
      )}
    >
      +$200 per database
    </div>
  );
};

export default function PricingRedisPage() {
  const [selectedPlan, setSelectedPlan] = useState(PricingRedis.Free);
  const [selectedFixed, setSelectedFixed] = useState(PricingRedis.Fixed250MB);

  const onChangePlan = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as PricingRedis;
    setSelectedPlan(value);

    if (
      [
        PricingRedis.Fixed250MB,
        PricingRedis.Fixed1GB,
        PricingRedis.Fixed5GB,
        PricingRedis.Fixed10GB,
        PricingRedis.Fixed50GB,
        PricingRedis.Fixed100GB,
        PricingRedis.Fixed500GB,
      ].includes(value)
    ) {
      setSelectedFixed(value);
    }
  };

  return (
    <>
      <section>
        <Container className="max-w-screen-lg">
          <ProductToggle product={"/redis"} />

          <div className="mt-12 md:mt-20">
            <PricingTable
              selectedFixed={selectedFixed}
              onChangePlan={onChangePlan}
            />
          </div>

          {/* PROD PACK */}
          <div
            id={PROD_PACK_SECTION_ID}
            className="mt-6 rounded-4xl bg-white p-4 md:mt-16 dark:bg-bg-mute"
          >
            <div className="mb-4 grid grid-cols-1 gap-4 rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white px-16 py-10 text-center text-purple-800 md:grid-cols-2 md:flex-row md:items-start md:gap-0 md:text-left dark:border-purple-600/20 dark:bg-gradient-to-r dark:from-purple-950/10 dark:to-purple-900/10 dark:text-purple-200">
              <header>
                <h3 className="text-xl font-semibold">Prod Pack</h3>
                <h5 className="whitespace-normal opacity-80 lg:whitespace-nowrap">
                  Recommended for production use
                </h5>
                <ProdPackButton className="mt-3 hidden md:block" />
              </header>

              <div className="h-full w-full lg:pl-8">
                <ul className="flex flex-shrink flex-wrap items-center justify-center gap-1 md:items-start md:justify-start">
                  {[
                    "Uptime SLA",
                    "RBAC",
                    "Encryption at Rest",
                    "SOC-2",
                    "Prometheus",
                    "Datadog",
                  ].map((value) => {
                    return (
                      <li
                        key={value}
                        className="flex items-center gap-1 whitespace-nowrap rounded-full border border-purple-300 bg-purple-50 py-1 pl-2 pr-3 text-purple-800 dark:border-purple-300 dark:bg-purple-200 dark:text-purple-950"
                      >
                        <IconCircleCheckFilled size={20} /> {value}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <ProdPackButton className="block justify-self-center md:hidden" />
            </div>

            <Enterprise />
          </div>
        </Container>
      </section>

      {/* Compare Table */}
      <section className="mt-32 md:mt-40">
        <Container className="max-w-screen-2xl">
          <header>
            <PageHeaderTitle as="h2" className="md:text-4xl">
              Compare Plans
            </PageHeaderTitle>
            <PageHeaderDesc className="mt-2 md:text-xl">
              Plans that scale to all sizes.
            </PageHeaderDesc>

            <Link
              className="text-emerald-950 underline opacity-60 dark:text-emerald-500 dark:opacity-100"
              href={"https://upstash.com/docs/redis/overall/pricing"}
            >
              Check Quotas & FAQ Docs
            </Link>
          </header>

          <div className="mt-12 md:mt-16">
            <CompareTable
              selectedPlan={selectedPlan}
              selectedFixed={selectedFixed}
              onChangePlan={onChangePlan}
            />
          </div>
        </Container>
      </section>
    </>
  );
}
