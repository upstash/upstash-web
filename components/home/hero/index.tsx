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
    <section className="relative z-10 py-20">
      <HomeHeroBg activeProduct={activeProduct} />

      <Container>
        <HomeHeroSlogan activeProduct={activeProduct} />

        <HomeHeroProducts
          activeProduct={activeProduct}
          setActiveProduct={setActiveProduct}
        />
      </Container>

      <div className="mt-20">
        <Container className="max-w-screen-md">
          <HomeHeroCustomer />
        </Container>
      </div>
    </section>
  );
}
