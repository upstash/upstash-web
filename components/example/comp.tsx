"use client";

import { Dispatch, HTMLProps, SetStateAction } from "react";
import Image from "next/image";

import cx from "@/utils/cx";
import Balancer from "react-wrap-balancer";

import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";

export function Example({
  className,
  children,
  products,
  author,
  title,
  slug,
  stack,
  selectedStacks,
  setSelectedStacks,
  ...props
}: HTMLProps<HTMLDivElement> & {
  products: string[];
  author: {
    name: string;
    image: string;
  };
  title: string;
  slug: string;
  stack: string[];
  selectedStacks: string[];
  setSelectedStacks: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <article
      className={cx(
        "group/example-box p-6",
        "flex flex-col gap-2",
        "rounded-xl bg-white/5",
        "transition hover:bg-emerald-300/10",
        className,
      )}
      {...props}
    >
      <h3 className={cx("font-display text-2xl font-semibold", className)}>
        <a className="hover:text-emerald-400" href={`/examples/${slug}`}>
          <Balancer>{title}</Balancer>
        </a>
      </h3>

      <div className="mb-4 flex items-center gap-2">
        <Image
          alt={author.name}
          src={author.image}
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="opacity-60">{author.name}</span>
      </div>

      <div className="mt-auto flex items-center gap-2">
        <ExampleProducts products={products} />
        <ExampleStack
          stack={stack}
          selectedStacks={selectedStacks}
          setSelectedStacks={setSelectedStacks}
        />
      </div>
    </article>
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
          return (
            <>
              <IconRedis
                key={product}
                width={24}
                aria-label="Upstash Redis Icon"
                className=""
              />
            </>
          );
        } else if (product === "kafka") {
          return (
            <>
              <IconKafka
                key={product}
                width={24}
                aria-label="Upstash Kafka Icon"
                className=""
              />
            </>
          );
        } else if (product === "qstash") {
          return (
            <div>
              <IconQStash
                key={product}
                width={24}
                aria-label="Upstash QStash Icon"
                className=""
              />
            </div>
          );
        }
      })}
    </div>
  );
}

function ExampleStack({
  className,
  children,
  stack,
  selectedStacks,
  setSelectedStacks,
  ...props
}: HTMLProps<HTMLDivElement> & {
  stack: string[];
  selectedStacks: string[];
  setSelectedStacks: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className={cx("flex-cols mt-auto flex flex-wrap gap-1.5", className)}>
      {stack.slice(0, 4).map((stackTitle) => {
        return (
          <Pill
            key={stackTitle}
            stackTitle={stackTitle}
            selected={selectedStacks.includes(stackTitle)}
            selectedStacks={selectedStacks}
            setSelectedStacks={setSelectedStacks}
          />
        );
      })}
    </div>
  );
}

export function Pill({
  stackTitle,
  selected,
  selectedStacks,
  setSelectedStacks,
}: {
  stackTitle: string;
  selected: boolean;
  selectedStacks: string[];
  setSelectedStacks: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <>
      <button
        className={cx(
          "rounded border border-white/5 px-2 py-1 leading-none text-white/60",
          selected ? "bg-emerald-400/10 text-white" : "",
        )}
        onClick={(e) => {
          if (!selected) {
            setSelectedStacks([...selectedStacks, stackTitle]);
          } else {
            setSelectedStacks(
              selectedStacks.filter((item) => item !== stackTitle),
            );
          }
        }}
      >
        {stackTitle}
      </button>
    </>
  );
}
