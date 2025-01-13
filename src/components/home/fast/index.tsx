"use client";

import Bg from "@/components/bg";
import Statistic from "@/components/home/fast/statistic";
import { HOME_SECTIONS } from "@/utils/const";
import cx from "@/utils/cx";

export default function Fast() {
  return (
    <section
      id={HOME_SECTIONS.FAST}
      className="relative z-0 mt-20 h-[400px] overflow-hidden md:mt-32 md:h-[560px]"
    >
      <Bg className="!top-24" />

      {/* slogan */}
      <h5
        style={{
          backgroundSize: "200% 200%",
          animation: "animate-gradient 12s infinite alternate",
        }}
        className={cx(
          "pointer-events-none absolute inset-x-0 -top-4 -z-20",
          "font-display text-[13vw] font-bold leading-tight",
          "text-bg-mute",
          "bg-gradient-to-br bg-clip-text text-transparent",
          "from-primary via-yellow-300 to-primary",
        )}
      >
        Fast Anywhere
      </h5>

      {/* globe */}
      <img
        src="/globe-light.png"
        alt="upstash region map"
        className={cx(
          "absolute inset-x-0 left-1/2 top-[14%] -z-10 -translate-x-1/2 xl:top-[26%]",
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
      <div className="absolute inset-x-0 -bottom-4 z-20 flex items-center justify-center md:bottom-16">
        <Statistic />
      </div>
    </section>
  );
}
