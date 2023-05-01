import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Container from "@/components/container";
import cx from "@/utils/cx";
import Investors from "@/components/investor/investors";
import Button from "@/components/button";
import Link from "next/link";

export default function HomeInvestors() {
  return (
    <section className="relative py-16 md:py-32">
      {/* bg */}
      <div
        className={cx(
          "absolute left-1/2 top-32 -z-10 h-1/2 w-4/5",
          "-translate-x-1/2",
          "bg-emerald-500 opacity-5 blur-[100px]"
        )}
      />

      <Container>
        {/* header */}
        <SectionHeader>
          <SectionHeaderTitle>Investors</SectionHeaderTitle>
          <SectionHeaderSummary>
            We are fortunate to work with some of the best investors in the
            world.
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-12 md:mt-24">
          <Investors short />
        </div>

        {/* about link */}
        <div className="mt-10 text-zinc-600">
          <Link
            href="https://docs.upstash.com/redis/overall/pricing"
            className="underline hover:text-emerald-400"
          >
            See the full list
          </Link>
        </div>
      </Container>
    </section>
  );
}
