"use client";

import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconVector from "@/components/icon-vector";
import IconWorkflow from "@/components/icon-workflow";
import cx from "@/utils/cx";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";
import {IconSearch} from "@tabler/icons-react";

const productConfig = {
  "/redis": { name: "Redis", Icon: IconRedis },
  "/vector": { name: "Vector", Icon: IconVector },
  "/qstash": { name: "QStash", Icon: IconQStash },
    "/workflow": { name: "Workflow", Icon: IconWorkflow },
    "/search": { name: "Search", Icon: IconSearch },
} as const;

type Product = keyof typeof productConfig;

export default function ProductToggle({ product }: { product: Product }) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-0 rounded-xl border-2 border-bg-mute p-1 sm:gap-3">
        {(Object.keys(productConfig) as Product[]).map((key) => {
          const isActive = product === key;
          const { name, Icon } = productConfig[key];

          return (
            <Link
              key={key}
              href={`/pricing${key}`}
              className={cx(
                "relative flex cursor-pointer select-none items-center gap-0 sm:gap-1",
                "rounded-lg px-1.5 py-1.5 transition sm:px-3",
                "hover:bg-bg-mute",
                isActive && "text-black",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="bg"
                  className="absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white shadow"
                  transition={{
                    duration: 0.2,
                  }}
                />
              )}
              <>
                <Icon width={20} />
              </>
              <span className="grow px-1 font-medium">{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
