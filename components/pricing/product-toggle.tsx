import cx from "@/utils/cx";
import * as React from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProductToggle({ product }: { product: string }) {
  return (
    <div className="flex justify-center">
      <div className="flex gap-3 rounded-xl border border-white/5 p-2">
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
                "relative flex cursor-pointer select-none items-center gap-1",
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
              <span className="grow px-1 font-medium">
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
