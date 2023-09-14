"use client";

import cx from "@/utils/cx";
import * as React from "react";
import { HTMLProps } from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Link from "next/link";
import { motion } from "framer-motion";

export function PricingToggle({ product }: { product: string }) {
  return (
    <div className="flex justify-center">
      <div className=" flex gap-3 rounded-xl p-2 border border-white/5">
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
                "rounded-lg px-2 py-1.5 text-zinc-400 transition",
                "hover:bg-white/10",
                isActive && "!text-zinc-950 hover:bg-transparent",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bg"
                  className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-2xl"
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

/*export function PricingBadge({ children }: HTMLProps<HTMLHeadingElement> & {}) {
  return (
    <h5
      className={cx(
        "inline-flex rounded-md border border-white/10 px-3 py-1.5",
        "uppercase text-sm leading-none",
        "bg-gradient-to-r from-white/0 to-white/5",
      )}
    >
      {children}
    </h5>
  );
}*/

export function PricingTableBody({
  children,
  className,
}: HTMLProps<HTMLDivElement> & {}) {
  return (
    <div
      className={cx(
        "rounded-3xl bg-white/5 px-4 py-8 flex flex-col gap-6 items-center",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PricingTableRow({
  children,
  className,
}: HTMLProps<HTMLDivElement> & {}) {
  return <div className={cx("", className)}>{children}</div>;
}

export function PricingTableHR({ className }: HTMLProps<HTMLHRElement> & {}) {
  return (
    <hr className={cx("border-0 border-b border-b-white/5 w-2/3", className)} />
  );
}
