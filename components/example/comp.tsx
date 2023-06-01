"use client";

import cx from "@/utils/cx";
import { Children, cloneElement, HTMLProps, ReactElement } from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Balancer from "react-wrap-balancer";
import authors from "@/utils/authors";
import Image from "next/image";

export function Example({
  className,
  children,
  products,
  author,
  title,
  ...props
}: HTMLProps<HTMLDivElement> & {
  products: string[];
  author: keyof typeof authors;
  title: string;
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
  author: keyof typeof authors;
}) {
  const { image, name } = authors[author];
  return (
    <div
      className={cx("mt-auto flex items-center grayscale", className)}
      {...props}
    >
      <Image
        className="rounded-full"
        src={`/authors/${image}`}
        alt={name}
        width={30}
        height={30}
      />
      <span className="ml-2 opacity-60">{name}</span>
    </div>
  );
}
