import { Metadata } from "next";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import Bg from "@/components/bg";
import { Client } from "@/components/example/client";
import type { Example } from "@/utils/type";
import getData from "./get-data";

// TODO: set canonical url

// this page is statically generated and cached for 1 minute
export const revalidate = 60;

export default async function ExamplesPage() {
  const examples: Example[] = await getData();

  // counting occurences of each stack
  const stack: Record<string, number> = {};
  const useCases: Record<string, number> = {};

  for (const e of examples) {
    for (const s of e.stack) {
      stack[s] = (stack[s] || 0) + 1;
    }
    for (const s of e.useCases) {
      useCases[s] = (useCases[s] || 0) + 1;
    }
  }

  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-16 md:py-20">
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
          <Client examples={examples} stack={stack} useCases={useCases} />
        </Container>
      </section>
    </main>
  );
}
