import { HTMLProps } from "react";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Container from "@/components/container";
import GlobalLowLatency from "@/components/home/serverless/global-low-latency";
import PriceScaleToZero from "@/components/home/serverless/price-scale-to-zero";
import HttpRestApi from "@/components/home/serverless/http-rest-api";
import DesignedForTheEdge from "@/components/home/serverless/designed-for-the-edge";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader>
          <SectionHeaderTitle>Serverless & Edge</SectionHeaderTitle>
          <SectionHeaderSummary>
            Built on cutting-edge serverless technology, Upstash can withstand
            any traffic spike, with automatic failover and global replication of
            assets.
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-20 grid grid-cols-6 gap-8 text-left">
          <GlobalLowLatency />
          <PriceScaleToZero />
          <HttpRestApi />
          <DesignedForTheEdge />
        </div>
      </Container>
    </section>
  );
}
