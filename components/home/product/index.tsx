import { HTMLProps } from "react";

import { HOME_SECTIONS } from "@/utils/const";

import Bg from "@/components/bg";
import Container from "@/components/container";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";

import Kafka from "./kafka";
import QStash from "./qstash";
import Redis from "./redis";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  return (
    <section id={HOME_SECTIONS.PRODUCTS} className="relative py-16 md:py-28">
      <Bg className="top-32 h-1/2" />

      <Container>
        {/* header */}
        <SectionHeader>
          <SectionHeaderTitle>Products</SectionHeaderTitle>
          <SectionHeaderSummary>
            True serverless data platform
          </SectionHeaderSummary>
        </SectionHeader>

        {/* table */}
        <div className="mt-10 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
          <Redis />
          <Kafka />
          <QStash />
        </div>
      </Container>
    </section>
  );
}
