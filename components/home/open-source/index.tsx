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

export default function HomeOpenSource({}: ISectionHeader) {
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
          <SectionHeaderTitle>Open Source & Integrations</SectionHeaderTitle>
          <SectionHeaderSummary>
            It is the perfect for your serverless applications thanks to its
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-24 grid grid-cols-3 gap-6">
          <div>box</div>
          <div>box</div>
          <div>box</div>
        </div>

        <div className="mt-10 text-zinc-600">github link</div>
      </Container>
    </section>
  );
}
