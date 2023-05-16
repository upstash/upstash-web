import { HTMLProps } from "react";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Container from "@/components/container";
import Icon, { ICON_NAMES } from "@/components/icon";
import Bg from "@/components/bg";
import { HOME_SECTIONS } from "@/utils/const";
import Redis from "./redis";
import Kafka from "./kafka";
import QStash from "./qstash";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  return (
    <section
      id={`#${HOME_SECTIONS.PRICING}`}
      className="relative py-16 md:py-28"
    >
      <Bg className="top-32 h-1/2" />

      <Container>
        {/* header */}
        <SectionHeader>
          <SectionHeaderTitle>Products</SectionHeaderTitle>
          <SectionHeaderSummary>
            Pay only for what you use with per-request pricing.
          </SectionHeaderSummary>
        </SectionHeader>

        {/* table */}
        <div className="mt-10 grid gap-2 md:mt-20 md:grid-cols-3">
          <Redis />
          <Kafka />
          <QStash />
        </div>
      </Container>
    </section>
  );
}
