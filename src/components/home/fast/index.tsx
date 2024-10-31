"use client";

import Bg from "@/components/bg";
import Statistic from "@/components/home/fast/statistic";
import { HOME_SECTIONS } from "@/utils/const";
import cx from "@/utils/cx";

export default function Fast() {
  return (
    <section
      id={HOME_SECTIONS.FAST}
      className="relative z-0 my-10 hidden h-[400px] overflow-hidden md:block md:h-[500px]"
    >
      <Bg className="top-44 h-1/2" />

      {/* slogan */}
      <h5
        className={cx(
          "pointer-events-none absolute inset-x-0 -top-8 -z-20",
          "font-display text-[13vw] font-bold leading-tight",
          "bg-gradient-to-t bg-clip-text text-transparent",
          "from-emerald-300/5 to-emerald-200/[0.03]",
        )}
      >
        Fast Anywhere
      </h5>

      {/* globe */}
      <img
        src="/globe.png"
        className="absolute inset-x-0 left-1/2 top-[14%] -z-10 w-full max-w-screen-xl -translate-x-1/2 xl:top-[26%]"
        alt="upstash region map"
      />

      {/* bottom-bg */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[200px] bg-gradient-to-b from-transparent to-zinc-950" />

      {/* data */}
      <div className="group/source-box absolute inset-x-0 bottom-0 z-20">
        <Statistic />
      </div>
    </section>
  );
}
