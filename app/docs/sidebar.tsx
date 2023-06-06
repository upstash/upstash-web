"use client";

import { SidebarNavItem } from "./redis/config";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import cx from "@/utils/cx";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import { motion } from "framer-motion";

export default function DocSidebar({ menu = [] }: { menu: SidebarNavItem[] }) {
  const pathname = usePathname();
  const selectedProducts = pathname?.split("/")[2] || "redis";

  const animContainer = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: 0.06,
        staggerChildren: 0.06,
      },
    },
  };

  const animItem = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div className="pt-1">
      <div className="space-y-1">
        <Item
          href="/docs/redis"
          className={cx(
            "grayscale",
            selectedProducts === "redis" &&
              "bg-red-200/5 text-red-300 grayscale-0"
          )}
        >
          <IconRedis width={20} />
          <span>Redis</span>
        </Item>
        <Item
          href="/docs/kafka"
          className={cx(
            "grayscale",
            selectedProducts === "kafka" &&
              "bg-blue-200/5 text-blue-300 grayscale-0"
          )}
        >
          <IconKafka width={20} />
          <span>Kafka</span>
        </Item>
        <Item
          href="/docs/qstash"
          className={cx(
            "grayscale",
            selectedProducts === "qstash" &&
              "bg-purple-200/5 text-purple-300 grayscale-0"
          )}
        >
          <IconQStash width={20} />
          <span>QStash</span>
        </Item>
      </div>

      <motion.div
        variants={animContainer}
        initial="hidden"
        animate="visible"
        className="sticky top-6 mt-8 grid gap-8"
      >
        {menu.map((item, index) => (
          <motion.div key={index} variants={animItem}>
            <h4 className="text-xs font-medium uppercase opacity-40">
              {item.title}
            </h4>
            {item.items ? <DocsSidebarNavItems items={item.items} /> : <span />}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
}

function DocsSidebarNavItems({ items }: DocsSidebarNavItemsProps) {
  const pathname = usePathname();

  return items?.length ? (
    <div className="mt-2">
      {items.map((item, index) => {
        const active = pathname?.includes(item.href as string);

        return item.href ? (
          <Link
            key={index}
            href={item.href}
            className={cx(
              "-mx-3 flex rounded-lg px-3 py-2 text-sm text-white/80",
              "hover:bg-white/5",
              active && "bg-red-200/5 text-red-300"
            )}
          >
            {item.title}
          </Link>
        ) : (
          <span className="">{item.title}</span>
        );
      })}
    </div>
  ) : null;
}

function Item({
  className,
  children,
  ...props
}: LinkProps & {
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname?.includes(props.href as string);

  return (
    <Link
      className={cx(
        "flex cursor-pointer select-none items-center gap-2",
        "-mx-3 rounded-lg px-3 py-1.5 text-zinc-400",
        "hover:bg-white/5",
        active && "bg-white/10 text-zinc-50",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
