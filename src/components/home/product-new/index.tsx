import Button from "@/components/button";
import Container from "@/components/container";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import { HeroTabQStash } from "@/components/home/hero/hero-tab-qstash";
import { HeroTabRedis } from "@/components/home/hero/hero-tab-redis";
import { HeroTabVector } from "@/components/home/hero/hero-tab-vector";
import { HeroTabWorkflow } from "@/components/home/hero/hero-tab-workflow";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { IconArrowUpRight, IconNotes, IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";

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
} as const;

const HeroProductTagline = ({ activeProduct }: { activeProduct: Product }) => {
  const { title, docsLink, consoleLink } = taglines[activeProduct];

  return (
    <div className="mb-8 flex flex-col items-center gap-4 py-4">
      <h2 className="text-2xl font-medium text-emerald-800 dark:text-text">
        {title}
      </h2>
      <div className="flex justify-center gap-3">
        <a href={docsLink} target="_blank">
          <Button variant={"defaultDark"} className="h-[42px] px-5">
            Documents
            <IconNotes size={24} />
          </Button>
        </a>
        <a href={consoleLink} target="_blank">
          <Button variant={"primary"} className="h-[42px] px-5">
            {activeProduct === Product.REDIS
              ? "Create Database"
              : activeProduct === Product.VECTOR
                ? "Create Index"
                : "Upstash Console"}
            {activeProduct === Product.REDIS ||
            activeProduct === Product.VECTOR ? (
              <IconPlus size={24} />
            ) : (
              <IconArrowUpRight size={24} />
            )}
          </Button>
        </a>
      </div>
    </div>
  );
};

export default function HomeProductNew() {
  const [activeProduct, setActiveProduct] = useState<Product>(Product.REDIS);

  return (
    <section className="relative z-10 sm:mt-4">
      <Container>
        <div className="flex items-end justify-center md:gap-2">
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
          </div>
        </div>
      </Container>
    </section>
  );
}
