import "./page.css";
import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "We manage everything for you.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
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
        </Container>

        <div className="mt-6 md:mt-8">{children}</div>
      </section>
    </main>
  );
}
