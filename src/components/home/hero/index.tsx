"use client";

import Button from "@/components/button";
import Container from "@/components/container";
import HomeHeroBg from "@/components/home/hero/hero-bg";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import HomeHeroSlogan from "@/components/home/hero/hero-slogan";
import { HeroTabQStash } from "@/components/home/hero/hero-tab-qstash";
import { HeroTabRedis } from "@/components/home/hero/hero-tab-redis";
import { HeroTabVector } from "@/components/home/hero/hero-tab-vector";
import { HeroTabWorkflow } from "@/components/home/hero/hero-tab-workflow";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { IconArrowRight } from "@tabler/icons-react";
import React, { useState } from "react";

export default function HomeHero() {
  const [activeProduct, setActiveProduct] = useState<Product>(Product.REDIS);

  return (
    <>
      <section className="relative z-10 py-20">
        <HomeHeroBg activeProduct={activeProduct} />

        <Container>
          <HomeHeroSlogan activeProduct={activeProduct} />

          <h2
            className={cx(
              "mt-2 text-lg md:mt-4 md:text-3xl md:font-light",
              "bg-gradient-to-r from-20% bg-clip-text text-transparent",
              "from-white/30 to-white/60",
            )}
          >
            The single platform to all your data needs
          </h2>

          <Button
            type="button"
            className={cx(
              "mt-6 text-lg",
              activeProduct === Product.REDIS && "bg-red-500",
              activeProduct === Product.VECTOR && "bg-orange-500",
              activeProduct === Product.QSTASH && "bg-blue-500",
              activeProduct === Product.WORKFLOW && "bg-purple-500",
            )}
            href="https://console.upstash.com"
            icon={<IconArrowRight stroke={1.5} size={24} />}
          >
            {activeProduct === Product.REDIS && "Create Database"}
            {activeProduct === Product.VECTOR && "Create Index"}
            {activeProduct === Product.QSTASH && "Publish Message"}
            {activeProduct === Product.WORKFLOW && "Start Workflow"}
          </Button>
        </Container>
      </section>

      <section>
        <Container>
          <div className="relative flex items-end justify-center gap-2 md:mt-6">
            <HomeHeroProducts
              activeProduct={activeProduct}
              setActiveProduct={setActiveProduct}
            />
          </div>

          {activeProduct === Product.REDIS && <HeroTabRedis />}
          {activeProduct === Product.VECTOR && <HeroTabVector />}
          {activeProduct === Product.QSTASH && <HeroTabQStash />}
          {activeProduct === Product.WORKFLOW && <HeroTabWorkflow />}
        </Container>
      </section>
    </>
  );
}
