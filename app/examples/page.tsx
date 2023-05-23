import { Metadata } from "next";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import Bg from "@/components/bg";
import cx from "@/utils/cx";
import { Children, cloneElement, HTMLProps, ReactElement } from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Balancer from "react-wrap-balancer";
import Button, { IButton } from "@/components/button";

export const metadata: Metadata = {
  title: "Brand Assets",
};

enum ExampleProducts {
  redis = "redis",
  kafka = "kafka",
  qstash = "qstash",
}

const DATA = [
  {
    title: "Serverless API with AWS CDK and AWS Lambda",
    description:
      "Serverless API using AWS Lambda and we will deploy it using AWS CDK.",
    products: [ExampleProducts.kafka, ExampleProducts.qstash],
    github_url: "dasd",
  },
  {
    title: "Autocomplete API with Serverless Redis",
    description:
      "This example implements an autocomplete API powered by serverless Redis.",
    products: [ExampleProducts.redis],
    blog_url: "dasd",
  },
  {
    title: "Benchmark Your Serverless Database with Thundra",
    description:
      "We benchmarked two AWS Lambda functions which fetch records from two different Serverless databases",
    products: [ExampleProducts.redis],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Serverless Histogram API with Redis",
    description:
      "This example implements a Serverless Histogram API powered by serverless Upstash Redis",
    products: [ExampleProducts.kafka],
    blog_url: "dasd",
  },
  {
    title: "Next.js with Redis",
    description:
      "A sample web application which uses Redis as state store in Next.js application.",
    products: [ExampleProducts.qstash],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Benchmark Your Serverless Database with Thundra",
    description:
      "We benchmarked two AWS Lambda functions which fetch records from two different Serverless databases",
    products: [ExampleProducts.redis, ExampleProducts.qstash],
    github_url: "dasd",
    blog_url: "dasd",
  },
  {
    title: "Serverless Histogram API with Redis",
    description:
      "This example implements a Serverless Histogram API powered by serverless Upstash Redis",
    products: [ExampleProducts.redis, ExampleProducts.kafka],
    blog_url: "dasd",
  },
  {
    title: "Next.js with Redis",
    description:
      "A sample web application which uses Redis as state store in Next.js application.",
    products: [ExampleProducts.kafka],
    github_url: "dasd",
    blog_url: "dasd",
  },
];

export default function HomePage() {
  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-16 md:pb-24 md:pt-16">
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
          <div className="flex items-center justify-center">
            <div>da</div>
            <div>da</div>
            <div>da</div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
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
        </Container>
      </section>
    </main>
  );
}

function Example({
  className,
  children,
  products,
  ...props
}: HTMLProps<HTMLDivElement> & {
  products: ExampleProducts[];
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

Example.Title = function ({
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

Example.Description = function ({
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

Example.Products = function ({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & { products?: ExampleProducts[] }) {
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
        if (product === ExampleProducts.redis) {
          return (
            <span
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
        } else if (product === ExampleProducts.kafka) {
          return (
            <span
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
        } else if (product === ExampleProducts.qstash) {
          return (
            <span
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

Example.Link = function ({
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

Example.LinkItem = function ({ className, children, ...props }: IButton) {
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
