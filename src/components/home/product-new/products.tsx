import { HeroTabBlob } from "@/components/home/hero/hero-tab-blob";
import { HeroTabBox } from "@/components/home/hero/hero-tab-box";
import { HeroTabQStash } from "@/components/home/hero/hero-tab-qstash";
import { HeroTabRedis } from "@/components/home/hero/hero-tab-redis";
import { HeroTabVector } from "@/components/home/hero/hero-tab-vector";
import { HeroTabWorkflow } from "@/components/home/hero/hero-tab-workflow";
import IconBlob from "@/components/icon-blob";
import IconBox from "@/components/icon-box";
import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconVector from "@/components/icon-vector";
import IconWorkflow from "@/components/icon-workflow";
import { Product } from "@/utils/type";
import type { ComponentType } from "react";

type HomeProduct = {
  product: Exclude<Product, Product.SEARCH>;
  Icon: ComponentType<{ className?: string }>;
  Panel: ComponentType;
  activeClassName: string;
  consoleLabel: string;
  exploreHref?: string;
};

export const HOME_PRODUCTS: HomeProduct[] = [
  {
    product: Product.REDIS,
    Icon: IconRedis,
    Panel: HeroTabRedis,
    activeClassName: "text-red-600",
    consoleLabel: "Create Database",
    exploreHref: "/redis",
  },
  {
    product: Product.VECTOR,
    Icon: IconVector,
    Panel: HeroTabVector,
    activeClassName: "text-orange-600",
    consoleLabel: "Create Index",
  },
  {
    product: Product.QSTASH,
    Icon: IconQStash,
    Panel: HeroTabQStash,
    activeClassName: "text-blue-600",
    consoleLabel: "Upstash Console",
  },
  {
    product: Product.WORKFLOW,
    Icon: IconWorkflow,
    Panel: HeroTabWorkflow,
    activeClassName: "text-purple-600",
    consoleLabel: "Upstash Console",
  },
  {
    product: Product.BOX,
    Icon: IconBox,
    Panel: HeroTabBox,
    activeClassName: "text-emerald-500",
    consoleLabel: "Create Box",
  },
  {
    product: Product.BLOB,
    Icon: IconBlob,
    Panel: HeroTabBlob,
    activeClassName: "text-sky-500",
    consoleLabel: "Create Bucket",
    exploreHref: "/blob",
  },
];
