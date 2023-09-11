import { Metadata } from "next";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import Bg from "@/components/bg";
import * as React from "react";
import { ProductsLabel } from "@/components/example/filter";
import cx from "@/utils/cx";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import PricingToggle, { PricingToggleItem } from "./client";

export const metadata: Metadata = {
  title: "Pricing",
  description: "We manage everything for you.",
};

enum Products {
  redis = "redis",
  kafka = "kafka",
  qstash = "qstash",
}

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-16 md:pb-32 md:pt-20">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>Pricing</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              Pay only for what you use with per-request pricing.
            </PageHeaderDesc>
          </header>

          <div className="mt-10 grid gap-6 md:mt-20 md:grid-cols-3">
            {children}
          </div>
        </Container>
      </section>
    </main>
  );
}
