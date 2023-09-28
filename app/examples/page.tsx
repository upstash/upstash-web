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
  const languages: Record<string, number> = {};
  const platforms: Record<string, number> = {};
  for (const e of examples) {
    for (const s of e.stack) {
      stack[s] = (stack[s] || 0) + 1;
    }
    for (const s of e.useCases) {
      useCases[s] = (useCases[s] || 0) + 1;
    }
    for (const s of e.languages) {
      languages[s] = (languages[s] || 0) + 1;
    }
    if (e.platforms) {
      for (const s of e.platforms) {
        platforms[s] = (platforms[s] || 0) + 1;
      }
    }
  }

  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="pb-4 pt-8 sm:pb-6 sm:pt-12 md:pb-8 md:pt-16">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>Examples</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              Jumpstart your development with our pre-built solutions.
            </PageHeaderDesc>
          </header>
        </Container>
      </section>

      {/* body */}
      <section className="mt-2 sm:mt-6">
        <Container>
          <Client
            examples={examples}
            stack={stack}
            useCases={useCases}
            languages={languages}
            platforms={platforms}
          />
        </Container>
      </section>
    </main>
  );
}
