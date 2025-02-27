"use client";

import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import cx from "@/utils/cx";
import Image from "next/image";
import { Dispatch, HTMLProps, SetStateAction } from "react";

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
        "group flex flex-col gap-2 border p-6 dark:border-none",
        "rounded-xl bg-white/30 dark:bg-white/5",
        "transition hover:bg-emerald-300/10",
        className,
      )}
      {...props}
    >
      <h3
        className={cx(
          "text-balance font-display text-2xl font-semibold",
          className,
        )}
      >
        <a className="hover:text-emerald-400" href={`/examples/${slug}`}>
          {title}
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
            <IconRedis
              key={product}
              width={24}
              aria-label="Upstash Redis Icon"
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

function Pill({
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
          "rounded border border-black/5 px-2 py-1 leading-none text-black/60 dark:border-white/5 dark:text-white/60",
          selected
            ? "bg-emerald-400/20 text-black/80 dark:bg-emerald-400/10 dark:text-white"
            : "",
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
