import Button from "@/components/button";
import Container from "@/components/container";
import CopyButton from "@/components/copy-button";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import SectionViewTracker from "@/components/section-view-tracker";
import { trackEvent } from "@/lib/analytics";
import cx from "@/utils/cx";
import type { Product } from "@/utils/type";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconNotes,
  IconPlus,
} from "@tabler/icons-react";
import Link from "next/link";
import React, { useState } from "react";
import { PRODUCT_TAGLINES } from "./product-features";
import ProductSeoData from "./product-seo-data";
import { HOME_PRODUCTS } from "./products";

const UPSTASH_SKILL_COMMAND =
  "npx skills add https://github.com/upstash/skills --skill upstash";

const HeroProductTagline = ({ activeProduct }: { activeProduct: Product }) => {
  const { title, docsLink, consoleLink } = PRODUCT_TAGLINES[activeProduct];
  const { exploreHref, consoleLabel } =
    HOME_PRODUCTS.find(({ product }) => product === activeProduct) ??
    HOME_PRODUCTS[0];

  return (
    <div className="mb-8 flex flex-col items-center gap-4 py-4">
      <h2 className="text-2xl font-medium text-emerald-800 dark:text-text">
        {title}
      </h2>
      <div className="flex flex-col flex-wrap justify-center gap-3 xs:flex-row">
        {exploreHref && (
          <Link href={exploreHref}>
            <Button variant="default" className="h-[42px] px-5">
              Explore {activeProduct}
              <IconArrowRight size={24} />
            </Button>
          </Link>
        )}
        <a href={docsLink} target="_blank" rel="noreferrer">
          <Button variant={"defaultDark"} className="h-[42px] px-5">
            Documentation
            <IconNotes size={24} />
          </Button>
        </a>
        <a href={consoleLink} target="_blank" rel="noreferrer">
          <Button variant={"primary"} className="h-[42px] px-5">
            {consoleLabel}
            {consoleLabel === "Upstash Console" ? (
              <IconArrowUpRight size={24} />
            ) : (
              <IconPlus size={24} />
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
            eventName="skill_copy"
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
  const [activeProduct, setActiveProduct] = useState<Product>(
    HOME_PRODUCTS[0].product,
  );
  const { Panel } =
    HOME_PRODUCTS.find(({ product }) => product === activeProduct) ??
    HOME_PRODUCTS[0];

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
        <HomeHeroProducts
          activeProduct={activeProduct}
          setActiveProduct={handleProductChange}
        />

        <div
          id="home-product-panel"
          role="tabpanel"
          aria-labelledby={`product-tab-${activeProduct.toLowerCase()}`}
          data-area="home_products"
          data-product={activeProduct.toLowerCase()}
          className={cx(
            "-mx-6 p-6 sm:mx-auto sm:p-8",
            "bg-white shadow sm:rounded-b-4xl",
            "dark:bg-white/10",
          )}
        >
          <HeroProductTagline activeProduct={activeProduct} />
          <div className="grid min-w-0 gap-2 sm:grid-cols-3 sm:gap-3 lg:gap-8 [&>article]:min-w-0 [&>article]:sm:p-4 [&>article]:lg:p-8">
            <Panel />
          </div>
        </div>

        <ProductSeoData />
      </Container>
    </section>
  );
}
