import cx from "@/utils/cx";
import * as React from "react";
import Icon, { ICON_NAMES } from "@/components/icon";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Link, { LinkProps } from "next/link";

export default function PricingToggle({
  selectedProducts,
}: {
  selectedProducts: string;
}) {
  return (
    <div className="flex w-[100%] flex-row items-center justify-between gap-1 space-y-0.5 sm:block">
      {["redis", "kafka", "qstash"].map((key) => {
        const isRedis = key === "redis";
        const isKafka = key === "kafka";
        const isQStash = key === "qstash";
        const isActive = selectedProducts === key;

        return (
          <PricingToggleItem
            key={key}
            href={isRedis ? `/pricing` : `/pricing/${key}`}
            className={cx(
              isRedis && isActive && "bg-red-200/10",
              isKafka && isActive && "bg-blue-200/10",
              isQStash && isActive && "bg-purple-200/10",
              " w-[100%] justify-center pl-0 sm:pl-4"
            )}
            icon={
              <>
                {isRedis && (
                  <IconRedis
                    width={20}
                    className={cx("grayscale", isActive && "grayscale-0")}
                  />
                )}
                {isKafka && (
                  <IconKafka
                    width={20}
                    className={cx("grayscale", isActive && "grayscale-0")}
                  />
                )}
                {isQStash && (
                  <IconQStash
                    width={20}
                    className={cx("grayscale", isActive && "grayscale-0")}
                  />
                )}
              </>
            }
          >
            {isRedis && "Redis"}
            {isKafka && "Kafka"}
            {isQStash && "QStash"}
          </PricingToggleItem>
        );
      })}
    </div>
  );
}

export function PricingToggleItem({
  icon,
  href,
  className,
  children,
}: LinkProps & {
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cx(
        " flex cursor-pointer select-none items-center gap-2",
        "rounded-lg bg-white/03  px-4 py-3 text-zinc-400",
        "  hover:bg-white/5",
        className
      )}
    >
      {icon ? (
        icon
      ) : (
        <span className={cx("relative h-5 w-5 rounded border border-white/10")}>
          <Icon
            icon={ICON_NAMES.Check}
            className={cx(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "text-lg opacity-0 transition duration-100"
            )}
          />
        </span>
      )}
      <span className="grow">{children}</span>
    </Link>
  );
}
