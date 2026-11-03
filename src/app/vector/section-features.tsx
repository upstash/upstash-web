import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconArrowsMaximize,
  IconBrain,
  IconCoin,
  IconFilter,
  IconFolders,
  IconPlugConnected,
  IconSearch,
  IconWorldWww,
} from "@tabler/icons-react";
import React from "react";

export default function SectionFeatures() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">Why Upstash Vector</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          A vector database that scales from a prototype to billions of vectors
          without a cluster to size.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:gap-4 xl:grid-cols-4">
          {FEATURES.map(({ title, desc, icon }) => (
            <div
              key={title}
              className={cx(
                "flex flex-col gap-3 p-5 md:p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
              )}
            >
              <span
                className={cx(
                  "inline-flex size-10 shrink-0 items-center justify-center",
                  "rounded-full bg-primary text-white dark:bg-white/10",
                )}
              >
                {icon}
              </span>
              <h3 className="whitespace-nowrap font-display text-lg font-semibold">
                {title}
              </h3>
              <p className="text-text-mute">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const FEATURES = [
  {
    icon: <IconBrain className="size-5" stroke={1.5} />,
    title: "Built-in embeddings",
    desc: "Pick an embedding model when you create the index, then upsert and query plain text. No separate embedding API to call.",
  },
  {
    icon: <IconSearch className="size-5" stroke={1.5} />,
    title: "Hybrid search",
    desc: "Combine dense semantic vectors with sparse keyword vectors in one index for results that match both meaning and exact terms.",
  },
  {
    icon: <IconFilter className="size-5" stroke={1.5} />,
    title: "Metadata filtering",
    desc: "Attach metadata to each vector and filter queries with a familiar SQL-like syntax.",
  },
  {
    icon: <IconFolders className="size-5" stroke={1.5} />,
    title: "Namespaces",
    desc: "Partition one index into isolated namespaces, one per tenant, user, or dataset, and query each on its own.",
  },
  {
    icon: <IconArrowsMaximize className="size-5" stroke={1.5} />,
    title: "Scales on disk",
    desc: "A disk-based index keeps large datasets fast and affordable, from thousands to billions of vectors.",
  },
  {
    icon: <IconWorldWww className="size-5" stroke={1.5} />,
    title: "REST API",
    desc: "Connectionless HTTP access from serverless and edge runtimes, with SDKs for TypeScript, Python, and Go.",
  },
  {
    icon: <IconPlugConnected className="size-5" stroke={1.5} />,
    title: "AI framework ready",
    desc: "First-class integrations with LangChain, LlamaIndex, the Vercel AI SDK, Flowise, and Langflow.",
  },
  {
    icon: <IconCoin className="size-5" stroke={1.5} />,
    title: "Pay per request",
    desc: "Scale to zero on pay as you go: $0.40 per 100K requests and $0.25 per GB stored, with a free tier to start.",
  },
];
