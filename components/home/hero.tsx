"use client";

import { useState } from "react";
import Container from "@/components/container";
import HomeHeroBg from "@/components/home/hero-bg";
import HomeHeroProducts from "@/components/home/hero-products";
import HomeHeroPartner from "@/components/home/hero-partner";
import HomeHeroSlogan from "@/components/home/hero-slogan";

export enum HeroProduct {
  REDIS = "redis",
  KAFKA = "kafka",
  QSTASH = "qstash",
}

export default function HomeHero() {
  const [activeProduct, setActiveProduct] = useState<HeroProduct>();

  return (
    <section className="relative z-0 py-10">
      <Container>
        <HomeHeroSlogan activeProduct={activeProduct} />

        <HomeHeroProducts
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />
        <HomeHeroPartner />
      </Container>

      <HomeHeroBg activeProduct={activeProduct} />
    </section>
  );
}
