import Link from "next/link";

import { allGlossaries } from "@content";
import type { Glossary } from "@content";

import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";

const keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

export default function HomePage() {
  const glossary = allGlossaries.filter((o) => !o.draft);

  const glossarySorted = glossary.sort((a, b) => a.title.localeCompare(b.title));
  const glossaryGrouped = glossarySorted.reduce((acc, item) => {
    const letter = item.title[0].toUpperCase();
    if (!keys.includes(letter)) {
      acc["#"] = acc["#"] || [];
      acc["#"].push(item);
      return acc;
    }
    acc[letter] = acc[letter] || [];
    acc[letter].push(item);
    return acc;
  }, {});

  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-10 md:py-20">
        <Container className="max-w-screen-lg">
          <header>
            <PageHeaderTitle>Glossary</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              A glossary of terms and concepts used in the world of software
              development.
            </PageHeaderDesc>
          </header>

          <div className="mt-6 text-xl font-mono inline-flex gap-[1ch]">
            {["#", ...keys].map((letter) => (
              <a key={letter}
                 href={`#${letter}`}
                 className={
                   cx(
                     glossaryGrouped[letter] ? "text-emerald-400" : "opacity-20 pointer-events-none",
                   )
                 }>
                {letter}
              </a>
            ))}
          </div>

        </Container>
      </section>

      <section className="pb-40">
        <Container className="max-w-screen-md space-y-6 text-left">
          {
            Object.entries(glossaryGrouped).map(([letter, items]: [string, Glossary[]]) => (
              <div key={letter} id={letter}>
                <h2 className="text-2xl font-bold mt-6 mb-2">
                  {letter}
                </h2>
                <ul className="space-y-4">
                  {
                    items.map((glossary) => (
                      <li key={glossary.slug}>
                        <Link href={`/glossary/${glossary.slug}`}
                              className="font-display text-xl font-semibold text-emerald-400 group-hover/job-item:underline">
                          {glossary.title}
                        </Link>
                        <p className="mt-1 opacity-80">
                          {glossary.summary}
                        </p>
                      </li>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </Container>
      </section>
    </main>
  );
}
