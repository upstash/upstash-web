"use client";

import IconBlob from "@/components/icon-blob";
import IconBox from "@/components/icon-box";
import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconSearch from "@/components/icon-search";
import IconVector from "@/components/icon-vector";
import IconWorkflow from "@/components/icon-workflow";
import type { KbTopic } from "@/lib/kb";
import cx from "@/utils/cx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode, SVGProps } from "react";

const TOPIC_ICONS: Record<
  string,
  (props: SVGProps<SVGSVGElement>) => ReactNode
> = {
  redis: IconRedis,
  "redis-search": IconSearch,
  search: IconSearch,
  vector: IconVector,
  qstash: IconQStash,
  workflow: IconWorkflow,
  box: IconBox,
  blob: IconBlob,
};

export function TopicIcon({
  slug,
  width = 20,
}: {
  slug: string;
  width?: number;
}) {
  const Icon = TOPIC_ICONS[slug];
  return Icon ? <Icon width={width} className="shrink-0" /> : null;
}

// The pricing page's product toggle, for the knowledge base's topics: All,
// then one per product with its icon, each its own page. It sits in the
// index's layout, so the thumb slides from tab to tab.
export default function KbTopicToggle({ topics }: { topics: KbTopic[] }) {
  const active =
    /^\/kb\/topics\/([^/]+)/.exec(usePathname() ?? "")?.[1] ?? null;
  const items = [
    { slug: null, name: "All", href: "/kb" },
    ...topics.map((topic) => ({
      slug: topic.slug,
      name: topic.name,
      href: `/kb/topics/${topic.slug}`,
    })),
  ];

  return (
    <nav aria-label="Topics" className="flex items-center justify-center">
      <div className="flex flex-wrap justify-center gap-0 rounded-xl border-2 border-bg-mute p-1 sm:gap-3 md:flex-nowrap">
        {items.map((item) => {
          const isActive = item.slug === active;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cx(
                "relative flex cursor-pointer select-none items-center gap-0 sm:gap-1",
                "rounded-lg px-1.5 py-1.5 transition sm:px-3",
                "hover:bg-bg-mute",
                isActive && "text-black",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="kb-topic"
                  className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white shadow"
                  transition={{ duration: 0.2 }}
                />
              )}
              {item.slug && <TopicIcon slug={item.slug} />}
              <span className="grow px-1 font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
