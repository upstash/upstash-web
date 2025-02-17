import Link from "next/link";
import type { Glossary } from "../../.content-collections/generated";
import { allGlossaries } from "../../.content-collections/generated";
import Bg from "../../src/components/bg";
import Container from "../../src/components/container";
import PageHeaderDesc from "../../src/components/page-header-desc";
import PageHeaderTitle from "../../src/components/page-header-title";
import { LETTERS } from "../../src/utils/const";
import cx from "../../src/utils/cx";

type GlossaryGrouped = {
  [key: string]: Glossary[];
};

export default function HomePage() {
  const glossary = allGlossaries.filter((o) => !o.draft);

  const glossarySorted = glossary.sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  const glossaryGrouped = glossarySorted.reduce<GlossaryGrouped>(
    (acc, item) => {
      const letter = item.title[0].toUpperCase();
      if (!LETTERS.includes(letter)) {
        acc["#"] = acc["#"] || [];
        acc["#"].push(item);
        return acc;
      }
      acc[letter] = acc[letter] || [];
      acc[letter].push(item);
      return acc;
    },
    {},
  );

  return (
    <>
      <span
        id="↑"
        className="pointer-events-none absolute top-0 size-4 opacity-0"
      />

      <main className="relative z-0 text-center">
        <Bg />

        <section className="mt-10 md:mt-20">
          <Container className="max-w-screen-lg">
            <header>
              <PageHeaderTitle>Glossary</PageHeaderTitle>
              <PageHeaderDesc className="mt-2">
                A glossary of terms and concepts used in the world of software
                development.
              </PageHeaderDesc>
            </header>
          </Container>
        </section>

        <div className="sticky top-20 z-10 mx-12 mt-4 inline-flex flex-wrap justify-center gap-[1ch] rounded-xl bg-zinc-950 px-4 py-2 font-mono text-lg">
          {["#", ...LETTERS, "↑"].map((letter) => (
            <a
              key={letter}
              href={`#${letter}`}
              className={cx(
                glossaryGrouped[letter] || letter === "↑"
                  ? "text-emerald-400"
                  : "pointer-events-none opacity-20",
              )}
            >
              {letter}
            </a>
          ))}
        </div>

        <section className="mt-8 pb-40 md:mt-20">
          <Container className="max-w-screen-lg text-left">
            {Object.entries(glossaryGrouped).map(
              ([letter, items]: [string, Glossary[]]) => (
                <div
                  key={letter}
                  id={letter}
                  className="scroll-mt-44 gap-4 border-t border-t-zinc-800 py-8 sm:grid sm:scroll-mt-32 sm:grid-cols-5"
                >
                  {/* title */}
                  <div className="py-4">
                    <h2 className="sticky top-32 text-6xl font-bold opacity-10 sm:text-8xl">
                      {letter}
                    </h2>
                  </div>

                  {/* list */}
                  <ul className="col-span-4 grid gap-6 sm:grid-cols-2">
                    {items.map((glossary) => (
                      <li key={glossary.slug} className="py-2 sm:py-4">
                        <h3>
                          <Link
                            passHref
                            href={`/archive/glossary/${glossary.slug}`}
                            className="font-display text-lg font-semibold text-emerald-400"
                          >
                            {glossary.title}
                          </Link>
                        </h3>
                        <p className="opacity-60">{glossary.summary}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </Container>
        </section>
      </main>
    </>
  );
}
