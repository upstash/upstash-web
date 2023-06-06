"use client";

import { docsConfig, SidebarNavItem } from "./redis/config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLProps } from "react";
import * as React from "react";
import cx from "@/utils/cx";
import Icon, { ICON_NAMES } from "@/components/icon";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";

export const ProductsLabel = {
  redis: "Redis",
  kafka: "Kafka",
  qstash: "QStash",
};

function Item({
  value,
  icon,
  label,
  className,
  checked,
  onChange = () => {},
}: HTMLProps<HTMLLabelElement> & {
  icon?: React.ReactNode;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label
      className={cx(
        "flex cursor-pointer select-none items-center gap-2",
        "-mx-2 rounded-lg px-2 py-1.5 text-zinc-400",
        "hover:bg-white/5",
        checked && "bg-white/5 text-zinc-50",
        className
      )}
    >
      <input
        type="checkbox"
        value={value}
        onChange={onChange}
        className="pointer-events-none absolute opacity-0"
      />
      {icon ? (
        icon
      ) : (
        <span
          className={cx(
            "relative h-5 w-5 rounded border border-white/10",
            checked && "border-emerald-400"
          )}
        >
          <Icon
            icon={ICON_NAMES.Check}
            className={cx(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              "text-lg opacity-0 transition duration-100",
              checked && "text-emerald-400 opacity-100"
            )}
          />
        </span>
      )}
      <span className="grow">{label}</span>
    </label>
  );
}

export default function DocSidebar() {
  const pathname = usePathname();
  const selectedProducts = pathname?.split("/")[2] || "redis";

  return (
    <div className="">
      <div className="space-y-1">
        {["redis", "kafka", "qstash"].map((key) => {
          const isRedis = key === "redis";
          const isKafka = key === "kafka";
          const isQStash = key === "qstash";
          const isActive = selectedProducts.includes(key);

          return (
            <Item
              key={key}
              value={key}
              checked={selectedProducts.includes(key)}
              label={ProductsLabel[key]}
              onChange={(e) => {
                const { value, checked } = e.target;
              }}
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
            />
          );
        })}
      </div>

      <div className="mt-8 grid gap-6">
        {docsConfig.map((item, index) => (
          <div key={index} className="">
            <h4 className="font-medium">{item.title}</h4>
            {item.items ? (
              <DocsSidebarNavItems items={item.items} pathname={pathname} />
            ) : (
              <span />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="mt-2 grid gap-2 text-sm text-white/60">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            className=""
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
          </Link>
        ) : (
          <span className="">{item.title}</span>
        )
      )}
    </div>
  ) : null;
}
