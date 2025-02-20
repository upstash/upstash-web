"use client";

import Bg from "@/components/bg";
import Statistic from "@/components/home/fast/statistic";
import { HOME_SECTIONS } from "@/utils/const";
import cx from "@/utils/cx";

export default function Fast() {
  return (
    <section
      id={HOME_SECTIONS.FAST}
      className="relative -z-10 mt-20 h-[320px] overflow-hidden sm:h-[400px] md:mt-32 xl:h-[500px]"
    >
      <Bg className="!top-24" />

      {/* slogan */}
      <h5
        style={{
          animationDuration: "4s",
        }}
        className={cx(
          "absolute inset-x-0 -z-20",
          "font-display text-[12vw] font-bold leading-tight xl:text-[180px]",
          "whitespace-nowrap",
          "bg-gradient-to-br bg-clip-text text-transparent",
          "animate-pulse from-primary-text via-primary to-yellow-300",
        )}
      >
        Fast Anywhere
      </h5>

      {/* globe */}
      <img
        src="/globe-light.png"
        alt="upstash region map"
        className={cx(
          "absolute inset-x-0 left-1/2 top-[8vw] -z-10 -translate-x-1/2 xl:top-[110px] dark:hidden",
          "w-full max-w-screen-2xl rounded-full",
          "shadow-[0px_0px_80px_rgba(16,185,129,.3)]",
        )}
      />
      <img
        src="/globe-dark.png"
        alt="upstash region map"
        className={cx(
          "absolute inset-x-0 left-1/2 top-[8vw] -z-10 hidden -translate-x-1/2 xl:top-[110px] dark:block",
          "w-full max-w-screen-2xl rounded-full",
          "shadow-[0px_0px_80px_rgba(16,185,129,.3)]",
        )}
      />

      {/* bottom-bg */}
      <div
        className={cx(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[260px]",
          "bg-gradient-to-b from-transparent to-bg",
          "dark:from-transparent dark:to-bg",
        )}
      />

      {/* data */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col items-center justify-center">
        <Statistic />
        <p className="mt-2 italic">* weekly average</p>
      </div>
    </section>
  );
}
