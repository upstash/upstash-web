import Container from "@/components/container";
import Statistic from "@/components/home/fast/statistic";
import Link from "next/link";
import Icon, { ICON_NAMES } from "@/components/icon";
import cx from "@/utils/cx";
import Bg from "@/components/bg";
import dynamic from "next/dynamic";
import { HOME_SECTIONS } from "@/utils/const";

const Globe = dynamic(() => import("./globe"), {
  ssr: false,
});

export default function Fast() {
  return (
    <section
      id={HOME_SECTIONS.FAST}
      className="relative z-0 mt-10 hidden h-[600px] overflow-hidden md:block"
    >
      <Bg className="top-44 h-1/2" />

      {/* slogan */}
      <h5
        className={cx(
          "pointer-events-none absolute inset-x-0 top-[40px] -z-10",
          "font-display text-[13vw] font-bold leading-none",
          "bg-gradient-to-t bg-clip-text text-transparent",
          "from-emerald-200/5 to-emerald-100/[0.02]"
        )}
      >
        Fast Anywhere
      </h5>

      {/* globe */}
      <div className="absolute left-1/2 top-[-180px] z-0 -translate-x-1/2">
        <Globe />
      </div>

      {/* bottom-bg */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10
      h-[200px] bg-gradient-to-b from-transparent to-zinc-950"
      />

      {/* data */}
      <div className="absolute inset-x-0 bottom-0 z-20 group/source-box">
        <Container className="max-w-screen-lg">
          <Statistic />

          {/* test */}
          <p className="mt-6">
            <Link
              href="/fast"
              className="inline-flex items-center gap-1 text-yellow-200 underline transition opacity-60 hover:opacity-100"
            >
              <Icon icon={ICON_NAMES.Bolt} className="text-2xl" />
              Test the speed
            </Link>
          </p>
        </Container>
      </div>
    </section>
  );
}
