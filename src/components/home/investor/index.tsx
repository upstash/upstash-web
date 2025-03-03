import Bg from "@/components/bg";
import Container from "@/components/container";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Investors from "@/components/investor/investors";
import { HOME_SECTIONS } from "@/utils/const";
import Link from "next/link";

export default function HomeInvestors() {
  return (
    <section id={HOME_SECTIONS.INVESTORS} className="relative py-16 md:py-28">
      <Bg className="top-32 h-1/2" />

      <Container>
        {/* header */}
        <SectionHeader>
          <SectionHeaderTitle>Investors</SectionHeaderTitle>
          <SectionHeaderSummary>
            We are fortunate to work with some of the best investors in the
            world.
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-10 md:mt-20">
          <Investors short />
        </div>

        {/* about link */}
        <div className="mt-10 text-zinc-400">
          <Link href="/about" className="underline hover:text-emerald-400">
            See the full list
          </Link>
        </div>
      </Container>
    </section>
  );
}
