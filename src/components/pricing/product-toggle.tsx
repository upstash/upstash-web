import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconVector from "@/components/icon-vector";
import cx from "@/utils/cx";
import { motion } from "framer-motion";
import Link from "next/link";
import * as React from "react";

export default function ProductToggle({ product }: { product: string }) {
  return (
    <div className="flex justify-center">
      <div className="flex gap-3 rounded-xl border-2 border-bg-mute p-1">
        {["/redis", "/vector", "/qstash"].map((key) => {
          const isActive = product === key;

          const isRedis = key === "/redis";
          const isVector = key === "/vector";
          const isQStash = key === "/qstash";

          return (
            <Link
              key={key}
              href={`/pricing${key}`}
              className={cx(
                "relative flex cursor-pointer select-none items-center gap-1",
                "rounded-lg px-3 py-1.5 transition",
                "hover:bg-bg-mute",
                isActive && "!text-black",
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
                {isRedis && <IconRedis width={20} />}
                {isVector && <IconVector width={20} />}
                {isQStash && <IconQStash width={20} />}
              </>
              <span className="grow px-1 font-medium">
                {isRedis && "Redis"}
                {isVector && "Vector"}
                {isQStash && "QStash"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
