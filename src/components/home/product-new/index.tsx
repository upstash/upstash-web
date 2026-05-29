import Button from "@/components/button";
import Container from "@/components/container";
import CopyButton from "@/components/copy-button";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import { HeroTabQStash } from "@/components/home/hero/hero-tab-qstash";
import { HeroTabRedis } from "@/components/home/hero/hero-tab-redis";
import { HeroTabVector } from "@/components/home/hero/hero-tab-vector";
import { HeroTabWorkflow } from "@/components/home/hero/hero-tab-workflow";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { IconArrowUpRight, IconNotes, IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { HeroTabBox } from "../hero/hero-tab-box";

const UPSTASH_SKILL_COMMAND =
  "npx skills add https://github.com/upstash/skills --skill upstash";

const taglines = {
  [Product.REDIS]: {
    title: "Low-latency, serverless key-value store",
    docsLink: "https://upstash.com/docs/redis",
    consoleLink: "https://console.upstash.com/redis",
  },
  [Product.VECTOR]: {
    title: "Serverless Vector database for high-performance search at scale",
    docsLink: "https://upstash.com/docs/vector",
    consoleLink: "https://console.upstash.com/vector",
  },
  [Product.QSTASH]: {
    title: "Serverless messaging and scheduling via HTTP",
    docsLink: "https://upstash.com/docs/qstash",
    consoleLink: "https://console.upstash.com/qstash",
  },
  [Product.WORKFLOW]: {
    title: "Durable, reliable and performant serverless functions",
    docsLink: "https://upstash.com/docs/workflow",
    consoleLink: "https://console.upstash.com/workflow",
  },
  [Product.SEARCH]: {
    title: "Serverless AI search at scale",
    docsLink: "https://upstash.com/docs/search",
    consoleLink: "https://console.upstash.com/search",
  },
  [Product.BOX]: {
    title: "Secure cloud containers for AI agents",
    docsLink: "https://upstash.com/docs/box",
    consoleLink: "https://console.upstash.com/box",
  },
} as const;

const HeroProductTagline = ({ activeProduct }: { activeProduct: Product }) => {
  const { title, docsLink, consoleLink } = taglines[activeProduct];

  return (
    <div className="mb-8 flex flex-col items-center gap-4 py-4">
      <h2 className="text-2xl font-medium text-emerald-800 dark:text-text">
        {title}
      </h2>
      <div className="xs:flex-row flex flex-col justify-center gap-3">
        {activeProduct === Product.REDIS && (
          <Link href="/redis">
            <Button variant={"default"} className="h-[42px] px-5">
              Learn more
            </Button>
          </Link>
        )}
        <a href={docsLink} target="_blank">
          <Button variant={"defaultDark"} className="h-[42px] px-5">
            Documentation
            <IconNotes size={24} />
          </Button>
        </a>
        <a href={consoleLink} target="_blank">
          <Button variant={"primary"} className="h-[42px] px-5">
            {activeProduct === Product.REDIS || activeProduct === Product.SEARCH
              ? "Create Database"
              : activeProduct === Product.VECTOR
                ? "Create Index"
                : activeProduct === Product.BOX
                  ? "Create Box"
                  : "Upstash Console"}
            {activeProduct === Product.REDIS ||
            activeProduct === Product.VECTOR ||
            activeProduct === Product.SEARCH ||
            activeProduct === Product.BOX ? (
              <IconPlus size={24} />
            ) : (
              <IconArrowUpRight size={24} />
            )}
          </Button>
        </a>
      </div>

      <div className="mt-3 flex w-full flex-col items-center gap-2">
        <div className="flex w-fit max-w-full items-center gap-3 overflow-x-auto rounded-xl bg-bg-mute py-2 pl-4 pr-6">
          <code className="whitespace-nowrap font-mono text-xs text-text md:text-sm">
            {UPSTASH_SKILL_COMMAND}
          </code>
          <CopyButton
            code={UPSTASH_SKILL_COMMAND}
            className="shrink-0 text-text-mute hover:text-primary"
          />
        </div>
        <span className="text-xs text-text-mute">
          Add the Upstash skill to your AI coding agent
        </span>
      </div>
    </div>
  );
};

export default function HomeProductNew() {
  const [activeProduct, setActiveProduct] = useState<Product>(Product.REDIS);

  return (
    <section className="relative z-10 sm:mt-4">
      <Container>
        <div className="md:text-ba flex items-end justify-center md:gap-1 lg:gap-2">
          <HomeHeroProducts
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
          />
        </div>

        <div
          className={cx(
            "-mx-6 p-6 sm:mx-auto sm:p-8",
            "bg-white shadow sm:rounded-4xl",
            "dark:bg-white/10",
          )}
        >
          <HeroProductTagline activeProduct={activeProduct} />
          <div className="grid gap-2 sm:grid-cols-3 sm:place-items-center sm:gap-8">
            {activeProduct === Product.REDIS && <HeroTabRedis />}
            {activeProduct === Product.VECTOR && <HeroTabVector />}
            {activeProduct === Product.QSTASH && <HeroTabQStash />}
            {activeProduct === Product.WORKFLOW && <HeroTabWorkflow />}
            {activeProduct === Product.BOX && <HeroTabBox />}
          </div>
        </div>
      </Container>
    </section>
  );
}
