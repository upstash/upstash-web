"use client";

import cx from "@/utils/cx";
import {
  Children,
  cloneElement,
  HTMLProps,
  ReactElement,
  useState,
} from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Balancer from "react-wrap-balancer";
import Button, { IButton } from "@/components/button";

enum Products {
  redis = "redis",
  kafka = "kafka",
  qstash = "qstash",
}

enum UseCases {
  ai_ml = "ai_ml",
  analytics = "analytics",
  cron = "cron",
  web3 = "web3",
  edge = "edge",
  global = "global",
}

enum Frameworks {
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

export default function HomePage() {
  const [product, setProduct] = useState<"all" | Products>("all");
  const [useCase, setUseCase] = useState<"all" | UseCases>("all");
  const [framework, setFramework] = useState<"all" | Frameworks>("all");

  return (
    <>
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

      <div className="mt-16 grid gap-4 md:grid-cols-3 md:gap-6">
        {DATA.map((item) => (
          <Example key={item.title} products={item.products}>
            <Example.Title>{item.title}</Example.Title>
            <Example.Description>{item.description}</Example.Description>
            <Example.Products />
            <Example.Link>
              {item.github_url && (
                <Example.LinkItem href={item.github_url}>
                  View Repo
                </Example.LinkItem>
              )}
              {item.blog_url && (
                <Example.LinkItem href={item.blog_url}>
                  Read Post
                </Example.LinkItem>
              )}
            </Example.Link>
          </Example>
        ))}
      </div>
    </>
  );
}

function Example({
  className,
  children,
  products,
  ...props
}: HTMLProps<HTMLDivElement> & {
  products: Products[];
}) {
  const childs = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      products,
    });
  });

  return (
    <article
      className={cx(
        "group/example-box p-6 text-left md:p-8",
        "flex flex-col gap-1",
        "rounded-3xl bg-white/03",
        "border border-white/5",
        className
      )}
      {...props}
    >
      {childs}
    </article>
  );
}

Example.Title = function ExampleTitle({
  className,
  children,
  ...props
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cx("font-display text-xl font-semibold", className)}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h3>
  );
};

Example.Description = function ExampleDescription({
  className,
  children,
  ...props
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <p className={cx("opacity-60", className)} {...props}>
      {children}
    </p>
  );
};

Example.Products = function ExampleProducts({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & { products?: Products[] }) {
  if (!props.products) return null;

  return (
    <div
      className={cx(
        "mt-auto flex items-center justify-start gap-2 pt-4",
        className
      )}
      {...props}
    >
      {props.products.map((product) => {
        if (product === Products.redis) {
          return (
            <span
              key={product}
              className="inline-flex items-center gap-1.5
             rounded bg-red-400/10 px-2 py-1 text-red-200"
            >
              <IconRedis
                width={16}
                aria-label="Upstash Redis Icon"
                className=""
              />
              Redis
            </span>
          );
        } else if (product === Products.kafka) {
          return (
            <span
              key={product}
              className="inline-flex items-center gap-1.5
             rounded bg-blue-400/10 px-2 py-1 text-blue-200"
            >
              <IconKafka
                width={16}
                aria-label="Upstash Kafka Icon"
                className=""
              />
              Kafka
            </span>
          );
        } else if (product === Products.qstash) {
          return (
            <span
              key={product}
              className="inline-flex items-center gap-1.5
             rounded bg-purple-400/10 px-2 py-1 text-purple-200"
            >
              <IconQStash
                width={16}
                aria-label="Upstash QStash Icon"
                className=""
              />
              QStash
            </span>
          );
        }
      })}
    </div>
  );
};

Example.Link = function ExampleLink({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cx("mt-6 flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
};

Example.LinkItem = function ExampleLinkItem({
  className,
  children,
  ...props
}: IButton) {
  return (
    <Button
      type="button"
      className={cx("grow text-white/60", className)}
      {...props}
    >
      {children}
    </Button>
  );
};

const DATA = [
  {
    title: "Serverless API with AWS CDK and AWS Lambda",
    description:
      "Serverless API using AWS Lambda and we will deploy it using AWS CDK.",
    products: [Products.kafka, Products.qstash],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    github_url: "dasd",
  },
  {
    title: "Autocomplete API with Serverless Redis",
    description:
      "This example implements an autocomplete API powered by serverless Redis.",
    products: [Products.redis],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    blog_url: "dasd",
  },
  {
    title: "Benchmark Your Serverless Database with Thundra",
    description:
      "We benchmarked two AWS Lambda functions which fetch records from two different Serverless databases",
    products: [Products.redis],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Serverless Histogram API with Redis",
    description:
      "This example implements a Serverless Histogram API powered by serverless Upstash Redis",
    products: [Products.kafka],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    blog_url: "dasd",
  },
  {
    title: "Next.js with Redis",
    description:
      "A sample web application which uses Redis as state store in Next.js application.",
    products: [Products.qstash],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Benchmark Your Serverless Database with Thundra",
    description:
      "We benchmarked two AWS Lambda functions which fetch records from two different Serverless databases",
    products: [Products.redis, Products.qstash],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Serverless Histogram API with Redis",
    description:
      "This example implements a Serverless Histogram API powered by serverless Upstash Redis",
    products: [Products.redis, Products.kafka],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    blog_url: "dasd",
  },
  {
    title: "Next.js with Redis",
    description:
      "A sample web application which uses Redis as state store in Next.js application.",
    products: [Products.kafka],
    framework: [Frameworks.nextjs],
    usecase: [UseCases.ai_ml],
    github_url: "dasd",
    blog_url: "dasd",
  },
];
