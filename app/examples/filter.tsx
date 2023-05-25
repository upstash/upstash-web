"use client";

import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import { IconArrow } from "@/components/post/toc";
import * as React from "react";
import { HTMLProps } from "react";
import cx from "@/utils/cx";
import Icon, { ICON_NAMES } from "@/components/icon";

export const Products = {
  redis: "Redis",
  kafka: "Kafka",
  qstash: "QStash",
};

export const UseCases = {
  ai_ml: "AI/ML",
  analytics: "Analytics",
  cron: "Cron",
  web3: "Web3",
  edge: "Edge",
  global: "Global",
};

export const Stack = {
  nextjs: "Next.js",
  react: "React",
  nuxtjs: "Nuxt",
  vuejs: "Vue",
  svelte: "Svelte",
  gatsby: "Gatsby",
  remix: "Remix",
  astro: "Astro",
};

export type IProducts = keyof typeof Products;
export type IUseCases = keyof typeof UseCases;
export type IStack = keyof typeof Stack;

export default function ExampleFilter({
  product,
  setProduct,
  useCase,
  setUseCase,
  stack,
  setStack,
}) {
  return (
    <form className="grid gap-4">
      {/*onChange={(e) => setProduct(e.target.value as Products)}*/}

      <div className="border-b border-b-white/5 pb-4">
        <input
          type="search"
          className="rounded bg-white px-4 py-2 text-zinc-950"
        />
      </div>

      <div className="border-b border-b-white/5 pb-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            value={Products.redis}
            className="pointer-events-none absolute opacity-0"
          />
          <IconRedis width={16} aria-label="Upstash Redis Icon" className="" />
          <span>Redis</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" value={Products.kafka} />
          <IconKafka width={16} aria-label="Upstash Kafka Icon" className="" />
          <span>Kafka</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" value={Products.qstash} />
          <IconQStash
            width={16}
            aria-label="Upstash QStash Icon"
            className=""
          />
          <span>QStash</span>
        </label>
      </div>

      <Toc>
        <Toc.Summary>Stack</Toc.Summary>
        <div className="space-y-px">
          {Object.keys(Stack).map((key) => {
            return <Item key={key} value={key} label={Stack[key]} />;
          })}
        </div>
      </Toc>

      <Toc>
        <Toc.Summary>Use Cases</Toc.Summary>
        <div className="space-y-px">
          {Object.keys(UseCases).map((key) => {
            return <Item key={key} value={key} label={UseCases[key]} />;
          })}
        </div>
      </Toc>
    </form>
  );
}

function Toc({ className, children, ...props }: HTMLProps<HTMLDetailsElement>) {
  return (
    <details
      open
      role="navigation"
      aria-label="Use Cases"
      className={cx("group/toc border-b border-b-white/5 pb-4", className)}
      {...props}
    >
      {children}
    </details>
  );
}

Toc.Summary = function TocSummary({
  className,
  children,
  ...props
}: HTMLProps<HTMLDetailsElement>) {
  return (
    <summary
      className={cx(
        "flex select-none list-none items-center justify-between",
        "mb-px h-10 rounded text-white/40 hover:bg-white/03",
        className
      )}
      {...props}
    >
      <IconArrow className="rotate-0 group-open/toc:rotate-90" />
      <span className="grow text-sm uppercase tracking-wide">{children}</span>
    </summary>
  );
};

function Item({
  value,
  label,
  checked,
}: {
  value: string;
  label: string;
  checked?: boolean;
}) {
  return (
    <label
      className="flex select-none items-center gap-2
     rounded bg-white/03 px-4 py-2"
    >
      <input
        type="checkbox"
        value={value}
        className="pointer-events-none absolute opacity-0"
      />
      <span className="h-4 w-4 rounded border border-white/10">
        <Icon
          icon={ICON_NAMES.Check}
          className={cx(
            "opacity-0 transition",
            checked && "text-emerald-400 opacity-100"
          )}
        />
      </span>
      <span className="grow">{label}</span>
    </label>
  );
}
