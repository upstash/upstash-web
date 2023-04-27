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
import ServerlessRedis from "@/components/home/serverless/redis";
import ServerlessQStash from "@/components/home/serverless/qstash";
import ServerlessKafka from "@/components/home/serverless/kafka";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  return (
    <section className="py-20">
      <Container>
        <SectionHeader>
          <SectionHeaderTitle>Serverless & Edge</SectionHeaderTitle>
          <SectionHeaderSummary>
            Built on cutting-edge serverless technology
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-24 grid grid-cols-6 gap-6 text-left">
          <GlobalLowLatency />
          <PriceScaleToZero />
          <HttpRestApi />
          <DesignedForTheEdge />
          <ServerlessRedis />
          <ServerlessKafka />
          <ServerlessQStash />
        </div>
      </Container>
    </section>
  );
}
