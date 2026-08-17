import Button from "@/components/button";
import Container from "@/components/container";
import CopyButton from "@/components/copy-button";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import { HeroTabQStash } from "@/components/home/hero/hero-tab-qstash";
import { HeroTabRedis } from "@/components/home/hero/hero-tab-redis";
import { HeroTabVector } from "@/components/home/hero/hero-tab-vector";
import { HeroTabWorkflow } from "@/components/home/hero/hero-tab-workflow";
import SectionViewTracker from "@/components/section-view-tracker";
import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { IconArrowUpRight, IconNotes, IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { HeroTabBox } from "../hero/hero-tab-box";
import { PRODUCT_TAGLINES } from "./product-features";
import ProductSeoData from "./product-seo-data";

const UPSTASH_SKILL_COMMAND =
  "npx skills add https://github.com/upstash/skills --skill upstash";

const HeroProductTagline = ({ activeProduct }: { activeProduct: Product }) => {
  const { title, docsLink, consoleLink } = PRODUCT_TAGLINES[activeProduct];

  return (
    <div className="mb-8 flex flex-col items-center gap-4 py-4">
      <h2 className="text-2xl font-medium text-emerald-800 dark:text-text">
        {title}
      </h2>
      <div className="flex flex-col justify-center gap-3 xs:flex-row">
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

      <div className="mt-3 flex w-full flex-col items-center">
        <div
          className={cx(
            "flex w-fit max-w-full items-center gap-3 overflow-x-auto",
            "rounded-xl border border-white/10 bg-pre-bg py-2 pl-4 pr-6",
          )}
        >
          <code className="whitespace-nowrap font-mono text-xs text-zinc-200 md:text-sm">
            {UPSTASH_SKILL_COMMAND}
          </code>
          <CopyButton
            code={UPSTASH_SKILL_COMMAND}
            eventName="skill_copy"
            className="shrink-0 text-zinc-400 hover:text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default function HomeProductNew() {
  const [activeProduct, setActiveProduct] = useState<Product>(Product.REDIS);

  const handleProductChange = (product: Product) => {
    if (product !== activeProduct) {
      trackEvent("home_product_switch", { product: product.toLowerCase() });
    }
    setActiveProduct(product);
  };

  return (
    <section className="relative z-10 sm:mt-4">
      <SectionViewTracker section="products" />
      <Container>
        <div className="md:text-ba flex items-end justify-center md:gap-1 lg:gap-2">
          <HomeHeroProducts
            activeProduct={activeProduct}
            setActiveProduct={handleProductChange}
          />
        </div>

        <div
          data-area="home_products"
          data-product={activeProduct.toLowerCase()}
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

        <ProductSeoData />
      </Container>
    </section>
  );
}
