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
import cx from "@/utils/cx";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  return (
    <section className="relative z-10 mt-20 py-32">
      <div
        className={cx(
          "absolute left-1/2 top-32 -z-10 h-1/2 w-4/5",
          "-translate-x-1/2",
          "bg-emerald-500 opacity-5 blur-[100px]"
        )}
      />

      <Container>
        <SectionHeader>
          <SectionHeaderTitle>Serverless & Edge</SectionHeaderTitle>
          <SectionHeaderSummary>
            Built on cutting-edge serverless technology
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-24 grid grid-cols-6 gap-6 text-left">
          {/* features */}
          <GlobalLowLatency />
          <PriceScaleToZero />
          <HttpRestApi />
          <DesignedForTheEdge />

          {/* products */}
          <ServerlessRedis />
          <ServerlessKafka />
          {/*<ServerlessQStash />*/}
        </div>
      </Container>
    </section>
  );
}
