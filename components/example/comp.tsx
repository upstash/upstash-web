"use client";

import { Dispatch, HTMLProps, SetStateAction } from "react";

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
  stack: string[];
  selectedStacks: string[];
  setSelectedStacks: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <article
      className={cx(
        "group/example-box p-6",
        "flex flex-col gap-4",
        "rounded-3xl bg-white/3",
        "border border-white/5",
        "transition hover:bg-white/5",
        className,
      )}
      {...props}
    >
      <ExampleProducts products={products} />
      <ExampleTitle title={title} />
      <ExampleAuthor author={author} />
      <ExampleStack
        stack={stack}
        selectedStacks={selectedStacks}
        setSelectedStacks={setSelectedStacks}
      />
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
        className,
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
  selectedStacks,
  setSelectedStacks,
  ...props
}: HTMLProps<HTMLDivElement> & {
  stack: string[];
  selectedStacks: string[];
  setSelectedStacks: Dispatch<SetStateAction<string[]>>;
}) {
  return (
    <div className={cx("flex-cols flex flex-wrap gap-1.5", className)}>
      {stack.slice(0, 3).map((stackTitle) => {
        return (
          <>
            <Pill
              stackTitle={stackTitle}
              selected={selectedStacks.includes(stackTitle)}
              selectedStacks={selectedStacks}
              setSelectedStacks={setSelectedStacks}
            />
          </>
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
        className={`py-0.2 w-min cursor-default rounded-xl border border-[#34D399] bg-[#34D399] bg-opacity-30 px-2 transition ease-in-out hover:bg-opacity-60 ${
          selected ? "bg-opacity-60" : "bg-opacity-30"
        }`}
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
        <p className="whitespace-nowrap text-sm " key={stackTitle}>
          {stackTitle}
        </p>
      </button>
    </>
  );
}
