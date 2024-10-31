import Bg from "@/components/bg";
import Container from "@/components/container";
import PriceQStash from "@/components/home/price/qstash";
import PriceRedis from "@/components/home/price/redis";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Icon, { ICON_NAMES } from "@/components/icon";
import { HOME_SECTIONS } from "@/utils/const";

export default function HomeServerless() {
  return (
    <section id={HOME_SECTIONS.PRICING} className="relative py-16 md:py-28">
      <Bg className="top-32 h-1/2" />

      <Container>
        {/* header */}
        <SectionHeader>
          <SectionHeaderTitle>Pricing</SectionHeaderTitle>

          <SectionHeaderSummary>
            Pay only for what you use with per-request pricing.
          </SectionHeaderSummary>

          <div className="mt-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-950/20 px-4 py-2 text-sm text-emerald-400/80 md:text-base">
              <Icon icon={ICON_NAMES.CreditCard} />
              No credit card required to get started
            </p>
          </div>
        </SectionHeader>

        {/* table */}
        <div className="mt-10 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
          <PriceRedis />
          <PriceQStash />
        </div>
      </Container>
    </section>
  );
}
