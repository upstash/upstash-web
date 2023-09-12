"use client";

import cx from "@/utils/cx";
import * as React from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Link from "next/link";
import { motion } from "framer-motion";

export function PricingToggle({ product }: { product: string }) {
  return (
    <div className="flex justify-center">
      <div className=" flex gap-2 rounded-xl bg-white/5 p-2">
        {["/", "/kafka", "/qstash"].map((key) => {
          const isActive = product === key;

          const isRedis = key === "/";
          const isKafka = key === "/kafka";
          const isQStash = key === "/qstash";

          return (
            <Link
              key={key}
              href={`/pricing${key}`}
              className={cx(
                "relative flex cursor-pointer select-none items-center gap-2",
                "rounded-lg px-2 py-1.5 text-zinc-400",
                "transition-colors hover:bg-white/10",
                isActive && "!text-zinc-950"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bg"
                  className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white"
                  transition={{
                    duration: 0.2,
                  }}
                />
              )}
              <>
                {isRedis && <IconRedis width={20} />}
                {isKafka && <IconKafka width={20} />}
                {isQStash && <IconQStash width={20} />}
              </>
              <span className="grow">
                {isRedis && "Redis"}
                {isKafka && "Kafka"}
                {isQStash && "QStash"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function PricingBadge({ children }: { children: React.ReactNode }) {
  return (
    <h5
      className={cx(
        "inline-flex rounded border px-2 py-1 uppercase  leading-none"
      )}
    >
      {children}
    </h5>
  );
}

export function PricingTableBody({ children }: { children: React.ReactNode }) {
  return (
    <div className={cx("rounded-3xl bg-white/5 px-4 py-6")}>{children}</div>
  );
}

export function PricingTableRow({ children }: { children: React.ReactNode }) {
  return <div className={cx("")}>{children}</div>;
}
