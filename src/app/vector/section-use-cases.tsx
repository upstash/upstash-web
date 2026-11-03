import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function SectionUseCases() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">
          What can you build with Vector?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Common vector database use cases, with a guide to build each one.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-4">
          {USE_CASES.map(({ title, desc, href }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={cx(
                "group flex flex-col gap-2 p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
                "hover:border-primary/40 transition hover:bg-white dark:hover:bg-white/5",
              )}
            >
              <h3 className="flex items-center gap-1 font-display text-lg font-semibold">
                {title}
                <IconArrowUpRight
                  size={18}
                  className="opacity-40 transition group-hover:opacity-100"
                />
              </h3>
              <p className="text-text-mute">{desc}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Internal links into the Vector docs build a vector database topic cluster.
const USE_CASES = [
  {
    title: "RAG chatbots",
    desc: "Ground LLM answers in your own documents by retrieving the most relevant chunks for every question.",
    href: "https://upstash.com/docs/vector/integrations/ai-sdk",
  },
  {
    title: "Semantic search",
    desc: "Search by meaning instead of exact words across docs, products, or support articles.",
    href: "https://upstash.com/docs/vector/tutorials/semantic_search",
  },
  {
    title: "Hybrid search",
    desc: "Blend semantic and keyword relevance in one query so exact names and codes still rank first.",
    href: "https://upstash.com/docs/vector/features/hybridindexes",
  },
  {
    title: "Multi-tenant AI apps",
    desc: "Keep each customer's data in its own namespace inside a single index.",
    href: "https://upstash.com/docs/vector/features/namespaces",
  },
  {
    title: "LangChain pipelines",
    desc: "Use Upstash Vector as the vector store behind LangChain retrievers and agents.",
    href: "https://upstash.com/docs/vector/tutorials/langchain",
  },
  {
    title: "Document parsing",
    desc: "Parse PDFs and other files with LlamaParse and index the results for retrieval.",
    href: "https://upstash.com/docs/vector/tutorials/llamaparse",
  },
];
