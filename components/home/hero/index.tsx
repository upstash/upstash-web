"use client";

import { useState } from "react";
import Container from "@/components/container";
import HomeHeroBg from "@/components/home/hero/hero-bg";
import HomeHeroProducts from "@/components/home/hero/hero-products";
import HomeHeroCustomer from "@/components/home/hero/hero-customer";
import HomeHeroSlogan from "@/components/home/hero/hero-slogan";
import { Product } from "@/utils/type";

export default function HomeHero() {
  const [activeProduct, setActiveProduct] = useState<Product>();

  return (
    <section className="relative z-10 py-10">
      <HomeHeroBg activeProduct={activeProduct} />

      <Container>
        <HomeHeroSlogan activeProduct={activeProduct} />

        <HomeHeroProducts
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />
      </Container>

      <Container className="max-w-screen-sm">
        <HomeHeroCustomer />
      </Container>
    </section>
  );
}
