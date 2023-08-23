"use client";

import cx from "@/utils/cx";
import { Children, cloneElement, HTMLProps, ReactElement } from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

export function Example({
  className,
  children,
  products,
  author,
  title,
  stack,
  ...props
}: HTMLProps<HTMLDivElement> & {
  products: string[];
  author: {
    name: string;
    image: string;
  };
  title: string;
  stack: string[];
}) {
  return (
    <article
      className={cx(
        "group/example-box p-6",
        "flex flex-col gap-4",
        "rounded-3xl bg-white/03",
        "border border-white/5",
        "transition hover:bg-white/5",
        className
      )}
      {...props}
    >
      <ExampleProducts products={products} />
      <ExampleTitle title={title} />
      <ExampleAuthor author={author} />
      <ExampleStack stack={stack} />
    </article>
  );
}

function ExampleTitle({
  className,
  children,
  title,
  ...props
}: HTMLProps<HTMLHeadingElement> & {
  title: string;
}) {
  return (
    <h3
      className={cx(
        "font-display text-xl font-medium md:leading-tight",
        className
      )}
      {...props}
    >
      <a href={`/examples/${title.toLowerCase().replace(/ /g, "-")}`}>
        <Balancer>{title}</Balancer>
      </a>
    </h3>
  );
}

function ExampleProducts({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & { products?: string[] }) {
  if (!props.products) return null;

  return (
    <div
      className={cx("flex items-center justify-start gap-2", className)}
      {...props}
    >
      {props.products.map((product) => {
        if (product === "redis") {
          return <IconRedis key={product} width={24} className="" />;
        } else if (product === "kafka") {
          return (
            <IconKafka
              key={product}
              width={24}
              aria-label="Upstash Kafka Icon"
              className=""
            />
          );
        } else if (product === "qstash") {
          return (
            <IconQStash
              key={product}
              width={24}
              aria-label="Upstash QStash Icon"
              className=""
            />
          );
        }
      })}
    </div>
  );
}

function ExampleAuthor({
  className,
  children,
  author,
  ...props
}: HTMLProps<HTMLDivElement> & {
  author: {
    name: string;
    image: string;
  };
}) {
  return (
    <div
      className={cx("mt-auto flex items-center", className)}
      {...props}
    ></div>
  );
}

function ExampleStack({
  className,
  children,
  stack,
  ...props
}: HTMLProps<HTMLDivElement> & { stack: string[] }) {
  return (
    <div className={cx("grid auto-cols-min grid-flow-col gap-2", className)}>
      {stack.slice(0, 3).map((stackTitle) => {
        return (
          <>
            <div className="py-0.2 w-min cursor-default rounded-xl border border-[#34D399] bg-[#34D399] bg-opacity-30 px-2 transition ease-in-out hover:bg-opacity-60">
              <p className="whitespace-nowrap text-sm " key={stackTitle}>
                {stackTitle}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
}
