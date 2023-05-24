"use client";

export enum Products {
  redis = "redis",
  kafka = "kafka",
  qstash = "qstash",
}

export enum UseCases {
  ai_ml = "ai_ml",
  analytics = "analytics",
  cron = "cron",
  web3 = "web3",
  edge = "edge",
  global = "global",
}

export enum Frameworks {
  nextjs = "nextjs",
  nuxtjs = "nuxtjs",
  svelte = "svelte",
  gatsby = "gatsby",
  vuejs = "vuejs",
  react = "react",
  remix = "remix",
  angular = "angular",
  astro = "astro",
}

export default function ExampleFilter({
  product,
  setProduct,
  useCase,
  setUseCase,
  framework,
  setFramework,
}) {
  return (
    <form className="flex flex-wrap items-center justify-center gap-4">
      <select
        name="product"
        className="rounded-full bg-white px-4 py-2 text-zinc-950"
        value={product}
        onChange={(e) => setProduct(e.target.value as Products)}
      >
        <option value="all">All Products</option>
        <option value={Products.redis}>Redis</option>
        <option value={Products.kafka}>Kafka</option>
        <option value={Products.qstash}>QStash</option>
      </select>

      <select
        name="use-case"
        className="rounded-full bg-white px-4 py-2 text-zinc-950"
        value={useCase}
        onChange={(e) => setUseCase(e.target.value as UseCases)}
      >
        <option value="all">All Use Case</option>
        <option value={UseCases.ai_ml}>AI/ML</option>
        <option value={UseCases.analytics}>Analytics</option>
        <option value={UseCases.cron}>Cron</option>
        <option value={UseCases.web3}>Web3</option>
        <option value={UseCases.edge}>Edge</option>
        <option value={UseCases.global}>Global</option>
      </select>

      <select
        name="framework"
        className="rounded-full bg-white px-4 py-2 text-zinc-950"
        value={framework}
        onChange={(e) => setFramework(e.target.value as Frameworks)}
      >
        <option value="all">All Framework</option>
        <option value={Frameworks.nextjs}>Next.JS</option>
        <option value={Frameworks.nuxtjs}>Nuxt.JS</option>
        <option value={Frameworks.svelte}>Svelte</option>
        <option value={Frameworks.remix}>Remix</option>
        <option value={Frameworks.astro}>Astro</option>
        <option value={Frameworks.gatsby}>Gatsby</option>
        <option value={Frameworks.vuejs}>Vue</option>
        <option value={Frameworks.react}>React</option>
        <option value={Frameworks.angular}>Angular</option>
      </select>
    </form>
  );
}
