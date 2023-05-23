import { Metadata } from "next";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import Bg from "@/components/bg";
import Client from "./client";

export const metadata: Metadata = {
  title: "Brand Assets",
};

export default function HomePage() {
  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-16 md:pb-24 md:pt-16">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>Examples</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              Jumpstart your app development process with our pre-built
              solutions.
            </PageHeaderDesc>
          </header>
        </Container>
      </section>

      {/* body */}
      <section className="mt-6">
        <Container>
          <Client />
        </Container>
      </section>
    </main>
  );
}
