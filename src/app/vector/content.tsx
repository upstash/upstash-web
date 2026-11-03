import IconVector from "@/components/icon-vector";
import type {
  SectionCtaProps,
  SectionFeaturesProps,
  SectionHeroProps,
  SectionUseCasesProps,
  SectionWhatIsProps,
} from "@/components/product-page/types";
import {
  IconArrowsMaximize,
  IconBrain,
  IconCoin,
  IconFilter,
  IconFolders,
  IconPlugConnected,
  IconPlus,
  IconSearch,
  IconWorldWww,
} from "@tabler/icons-react";

export const HERO: SectionHeroProps = {
  icon: IconVector,
  title: (
    <>
      <span className="block">Serverless vector database</span>{" "}
      <span className="block">for AI and search</span>
    </>
  ),
  description: (
    <>
      Upstash Vector stores embeddings and finds the closest matches in
      milliseconds. Upsert raw text and let a built-in model embed it, combine
      semantic and keyword search, filter on metadata, and pay per request with
      no idle cost.
    </>
  ),
  gradient: "to-orange-300",
  primaryAction: {
    href: "https://console.upstash.com/vector",
    label: "Create Index",
    icon: <IconPlus size={24} />,
  },
  docsHref: "https://upstash.com/docs/vector/overall/getstarted",
  pricingHref: "/pricing/vector",
};

export const FEATURES: SectionFeaturesProps = {
  title: "Why Upstash Vector",
  description:
    "A vector database that scales from a prototype to billions of vectors without a cluster to size.",
  items: [
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
  ],
};

// Internal links into the Vector docs build a vector database topic cluster.
export const USE_CASES: SectionUseCasesProps = {
  title: "What can you build with Vector?",
  description:
    "Common vector database use cases, with a guide to build each one.",
  items: [
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
  ],
};

export const WHAT_IS: SectionWhatIsProps = {
  title: "What is a vector database?",
  description: "A database that finds things by meaning, not by matching text.",
  children: (
    <>
      <p>
        A <strong>vector database</strong> stores embeddings: lists of numbers
        that an AI model produces to represent the meaning of text, images, or
        other data. Items with similar meaning end up close together, so the
        database can answer &ldquo;what is most like this?&rdquo; by finding the
        nearest vectors to a query.
      </p>
      <p>
        That is the retrieval step behind RAG, semantic search, recommendations,
        and agent memory. Doing it well at scale takes an approximate nearest
        neighbor index, metadata filters, and a way to keep embeddings in sync
        with the source data, which is a lot to run yourself.
      </p>
      <p>
        <strong>Upstash Vector</strong> is that database as a serverless
        service. Create an index, choose an embedding model or bring your own
        vectors, and query over HTTP from any runtime. Storage scales on disk,
        and on pay as you go you are billed per request, so an index that is not
        being queried costs only its storage.
      </p>
    </>
  ),
};

export const CTA: SectionCtaProps = {
  title: "Create your first index in seconds",
  description:
    "Start on the free tier with 10,000 queries a day and 1 GB of data. No credit card required.",
  gradient: "to-orange-400",
  primaryAction: {
    href: "https://console.upstash.com/vector",
    label: "Create Index",
    icon: <IconPlus size={24} />,
  },
  pricingHref: "/pricing/vector",
};
