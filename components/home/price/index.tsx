import { HTMLProps } from "react";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Container from "@/components/container";
import PriceRedis from "@/components/home/price/redis";
import PriceKafka from "@/components/home/price/kafka";
import PriceQStash from "@/components/home/price/qstash";
import Icon, { ICON_NAMES } from "@/components/icon";
import cx from "@/utils/cx";
import Button from "@/components/button";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  return (
    <section id="pricing" className="relative py-32">
      <div
        className={cx(
          "absolute left-1/2 top-32 -z-10 h-1/2 w-4/5",
          "-translate-x-1/2",
          "bg-emerald-500 opacity-5 blur-[100px]"
        )}
      />

      <Container>
        <SectionHeader>
          <SectionHeaderTitle>Pricing</SectionHeaderTitle>
          <SectionHeaderSummary>
            Pay only for what you use with per-request pricing.
          </SectionHeaderSummary>
          <div className="mt-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-emerald-950/40 px-4 py-2 text-emerald-600">
              <Icon icon={ICON_NAMES.CreditCard} />
              No credit card required to get started
            </p>
          </div>
        </SectionHeader>

        <div className="mt-24 grid grid-cols-3 gap-2">
          <PriceRedis />
          <PriceKafka />
          <PriceQStash />
        </div>

        <div className="mt-10 text-zinc-600">
          See{" "}
          <Button
            href="https://docs.upstash.com/redis/overall/pricing"
            className="underline"
            hideIcon
          >
            pricing page
          </Button>{" "}
          for more information.
        </div>
      </Container>
    </section>
  );
}
