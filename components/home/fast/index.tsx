"use client";

import Container from "@/components/container";
import Statistic from "@/components/home/fast/statistic";
import Link from "next/link";
import Icon, { ICON_NAMES } from "@/components/icon";
import cx from "@/utils/cx";
import Bg from "@/components/bg";
import dynamic from "next/dynamic";
import { HOME_SECTIONS } from "@/utils/const";
import useIsMobile from "@/hooks/use-is-mobile";

const Globe = dynamic(() => import("./globe2"), {
  ssr: false,
});

export default function Fast() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
    // return (
    //   <section id={HOME_SECTIONS.FAST} className="relative z-0 py-16">
    //     <Bg className="top-44 h-1/2" />
    //
    //     <Statistic />
    //   </section>
    // );
  }

  return (
    <section
      id={HOME_SECTIONS.FAST}
      className="relative z-0 my-10 h-[300px] overflow-hidden md:mb-0 md:h-[500px]"
    >
      <Bg className="top-44 h-1/2" />

      {/* slogan */}
      <h5
        className={cx(
          "hidden md:block",
          "pointer-events-none absolute inset-x-0 -top-8 -z-10",
          "font-display text-[13vw] font-bold leading-tight",
          "bg-gradient-to-t bg-clip-text text-transparent",
          "from-emerald-300/5 to-emerald-200/[0.02]"
        )}
      >
        Fast Anywhere
      </h5>

      {/* globe */}
      <div className="absolute inset-x-0 -top-8 z-0">
        <Container>
          <div className="-mx-40">
            <Globe />
          </div>
        </Container>
      </div>

      {/* bottom-bg */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10
      h-[200px] bg-gradient-to-b from-transparent to-zinc-950"
      />

      {/* data */}
      <div className="group/source-box absolute inset-x-0 bottom-0 z-20">
        <Statistic />
      </div>
    </section>
  );
}
