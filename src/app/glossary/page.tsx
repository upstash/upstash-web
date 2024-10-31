import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { LETTERS } from "@/utils/const";
import cx from "@/utils/cx";
import type { Glossary } from "@content";
import { allGlossaries } from "@content";
import Link from "next/link";

export default function HomePage() {
  const glossary = allGlossaries.filter((o) => !o.draft);

  const glossarySorted = glossary.sort((a, b) =>
    a.title.localeCompare(b.title),
  );
  const glossaryGrouped = glossarySorted.reduce((acc, item) => {
    const letter = item.title[0].toUpperCase();
    if (!LETTERS.includes(letter)) {
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

      <div className="sticky top-20 z-10 mx-12 mt-2 inline-flex flex-wrap justify-center gap-[1ch] bg-zinc-950 px-4 py-2 font-mono text-xl">
        {["#", ...LETTERS].map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className={cx(
              glossaryGrouped[letter]
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
                className="grid scroll-mt-32 scroll-mt-44 grid-cols-4 gap-4 border-t border-t-zinc-800 py-8 sm:grid"
              >
                {/* title */}
                <div className="py-4">
                  <h2 className="sticky top-24 text-7xl opacity-20">
                    {letter}
                  </h2>
                </div>

                {/* list */}
                <ul className="col-span-3 grid grid-cols-2 gap-4">
                  {items.map((glossary) => (
                    <li key={glossary.slug} className="py-4">
                      <h3>
                        <Link
                          href={`/glossary/${glossary.slug}`}
                          className="font-display text-xl font-semibold text-emerald-400 group-hover/job-item:underline"
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
  );
}
