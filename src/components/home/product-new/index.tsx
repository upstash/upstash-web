import Container from "@/components/container";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import { HeroTabQStash } from "@/components/home/hero/hero-tab-qstash";
import { HeroTabRedis } from "@/components/home/hero/hero-tab-redis";
import { HeroTabVector } from "@/components/home/hero/hero-tab-vector";
import { HeroTabWorkflow } from "@/components/home/hero/hero-tab-workflow";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import React, { useState } from "react";

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
            "grid gap-2 sm:grid-cols-3 sm:place-items-center sm:gap-8",
            "bg-white shadow sm:rounded-4xl",
            "dark:bg-white/10",
          )}
        >
          {activeProduct === Product.REDIS && <HeroTabRedis />}
          {activeProduct === Product.VECTOR && <HeroTabVector />}
          {activeProduct === Product.QSTASH && <HeroTabQStash />}
          {activeProduct === Product.WORKFLOW && <HeroTabWorkflow />}
        </div>
      </Container>
    </section>
  );
}
