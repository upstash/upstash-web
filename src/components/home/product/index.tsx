import Bg from "@/components/bg";
import Container from "@/components/container";
import { HOME_SECTIONS } from "@/utils/const";
import { Product } from "@/utils/type";
import { HTMLProps, useState } from "react";
import QStash from "./qstash";
import Redis from "./redis";
import Vector from "./vector";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {}

export default function HomeServerless({}: ISectionHeader) {
  const [activeProduct, setActiveProduct] = useState<Product>();

  return (
    <section id={HOME_SECTIONS.PRODUCTS} className="relative py-16 md:py-28">
      <Bg className="top-32 h-1/2" />

      <Container>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <Redis />
          <Vector />
          <QStash />
        </div>
      </Container>
    </section>
  );
}
