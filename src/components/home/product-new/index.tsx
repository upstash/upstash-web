import Container from "@/components/container";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import { HeroTabQStash } from "@/components/home/hero/hero-tab-qstash";
import { HeroTabRedis } from "@/components/home/hero/hero-tab-redis";
import { HeroTabVector } from "@/components/home/hero/hero-tab-vector";
import { HeroTabWorkflow } from "@/components/home/hero/hero-tab-workflow";
import { Product } from "@/utils/type";
import React, { useState } from "react";

export default function HomeProductNew() {
  const [activeProduct, setActiveProduct] = useState<Product>(Product.REDIS);

  return (
    <section>
      <Container>
        <div className="relative z-10 flex items-end justify-center gap-1 md:mt-6">
          <HomeHeroProducts
            activeProduct={activeProduct}
            setActiveProduct={setActiveProduct}
          />
        </div>

        <div className="relative z-0 -mt-1 grid place-items-center gap-6 rounded-3xl border-2 border-bg-mute bg-white p-8">
          {activeProduct === Product.REDIS && <HeroTabRedis />}
          {activeProduct === Product.VECTOR && <HeroTabVector />}
          {activeProduct === Product.QSTASH && <HeroTabQStash />}
          {activeProduct === Product.WORKFLOW && <HeroTabWorkflow />}
        </div>
      </Container>
    </section>
  );
}
