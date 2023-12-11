import { HOME_SECTIONS } from "@/utils/const";

import Bg from "@/components/bg";
import Container from "@/components/container";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import DesignedForTheEdge from "@/components/home/serverless/designed-for-the-edge";
import GlobalLowLatency from "@/components/home/serverless/global-low-latency";
import HttpRestApi from "@/components/home/serverless/http-rest-api";
import PriceScaleToZero from "@/components/home/serverless/price-scale-to-zero";

export default function HomeServerless() {
  return (
    <section
      id={HOME_SECTIONS.SERVERLESS}
      className="relative z-10 py-16 md:mt-20 md:py-28"
    >
      <Bg className="top-32 h-1/2" />

      <Container>
        <SectionHeader>
          <SectionHeaderTitle>Serverless & Edge</SectionHeaderTitle>
          <SectionHeaderSummary>
            The platform tailored for the serverless revolution
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-10 grid gap-4 text-left md:mt-20 md:grid-cols-6 md:gap-6">
          {/* features */}
          <GlobalLowLatency />
          <PriceScaleToZero />
          <HttpRestApi />
          <DesignedForTheEdge />
        </div>
      </Container>
    </section>
  );
}
