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

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  return (
    <section id="pricing" className="py-20">
      <Container>
        <SectionHeader>
          <SectionHeaderTitle>Pricing</SectionHeaderTitle>
          <SectionHeaderSummary>
            Pay only for what you use with per-request pricing.
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-24 grid grid-cols-3 gap-10">
          <PriceRedis />
          <PriceKafka />
          <PriceQStash />
        </div>
      </Container>
    </section>
  );
}
