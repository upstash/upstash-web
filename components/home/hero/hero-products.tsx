import cx from "@/utils/cx";
import React, { Children, cloneElement, HTMLProps, ReactElement } from "react";
import { Product } from "@/utils/type";
import Button, { IButton } from "@/components/button";
import Icon, { ICON_NAMES } from "@/components/icon";
import IconRedis from "@/components/icon-redis";
import IconQStash from "@/components/icon-qstash";
import IconKafka from "@/components/icon-kafka";

export default function HomeHeroProducts({
  activeProduct,
  setActiveProduct,
}: {
  activeProduct?: Product;
  setActiveProduct: (product?: Product) => void;
}) {
  return (
    <div
      className="mt-8 grid gap-2 md:mt-16 md:grid-cols-3"
      onMouseLeave={() => setActiveProduct(undefined)}
    >
      <HomeHeroProduct
        active={activeProduct === Product.REDIS}
        activeProduct={activeProduct}
        onMouseEnter={() => setActiveProduct(Product.REDIS)}
      >
        <HeroProductTitle>
          {/*<span className="block">
            <IconRedis className="mb-3 inline-flex grayscale group-hover/hero-product:grayscale-0" />
          </span>*/}
          <span>Redis</span>
          <span className="text-[.9em] opacity-20">®*</span>
        </HeroProductTitle>
        <HeroProductDesc>Serverless database with Redis API</HeroProductDesc>
        <HeroProductCta href="https://console.upstash.com">
          Create Database
        </HeroProductCta>
      </HomeHeroProduct>

      <HomeHeroProduct
        active={activeProduct === Product.KAFKA}
        activeProduct={activeProduct}
        onMouseEnter={() => setActiveProduct(Product.KAFKA)}
      >
        <HeroProductTitle>
          {/*<span className="block">
            <IconKafka className="mb-3 inline-flex grayscale group-hover/hero-product:grayscale-0" />
          </span>*/}
          <span>Kafka</span>
          <span className="text-[.9em] opacity-20">®</span>
        </HeroProductTitle>
        <HeroProductDesc>Serverless Kafka and Connectors</HeroProductDesc>
        <HeroProductCta href="https://console.upstash.com">
          Create Cluster
        </HeroProductCta>
      </HomeHeroProduct>

      <HomeHeroProduct
        active={activeProduct === Product.QSTASH}
        activeProduct={activeProduct}
        onMouseEnter={() => setActiveProduct(Product.QSTASH)}
      >
        <HeroProductTitle>
          {/*<span className="block">
            <IconQStash className="mb-3 inline-flex grayscale group-hover/hero-product:grayscale-0" />
          </span>*/}
          <span>QStash</span>
        </HeroProductTitle>
        <HeroProductDesc>Messaging for the Serverless</HeroProductDesc>
        <HeroProductCta href="https://console.upstash.com">
          Publish Messages
        </HeroProductCta>
      </HomeHeroProduct>
    </div>
  );
}

function HomeHeroProduct({
  children,
  className,
  activeProduct,
  active,
  ...props
}: HTMLProps<HTMLDivElement> & {
  active?: boolean;
  activeProduct?: Product;
}) {
  const childs = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      activeProduct,
      active,
    });
  });

  return (
    <div
      className={cx(
        "group/hero-product",
        "flex flex-col items-center p-6 md:p-8",
        "cursor-default bg-white/5 backdrop-blur transition",
        "rounded-lg first:rounded-t-3xl last:rounded-b-3xl",
        "md:first:rounded-t-lg md:last:rounded-b-lg",
        "md:first:!rounded-l-4xl md:last:!rounded-r-4xl",
        "hover:scale-[1.02] hover:bg-white/10",
        className
      )}
      {...props}
    >
      {childs}
    </div>
  );
}

function HeroProductTitle({
  children,
  className,
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cx(
        "flex items-center gap-1 font-display text-xl font-medium leading-none text-zinc-50 md:text-2xl",
        className
      )}
    >
      {children}
    </h3>
  );
}

function HeroProductDesc({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className={cx("opacity-60", className)}>{children}</p>;
}

function HeroProductCta({
  children,
  className,
  activeProduct,
  active,
  ...props
}: IButton & {
  activeProduct?: Product;
  active?: boolean;
}) {
  return (
    <Button
      type="button"
      className={cx(
        "mt-5",
        activeProduct ? "bg-white/03 text-zinc-50" : "bg-zinc-50 text-zinc-950",
        activeProduct === Product.REDIS && active && "!bg-red-500 !text-white",
        activeProduct === Product.KAFKA && active && "!bg-blue-500 !text-white",
        activeProduct === Product.QSTASH &&
          active &&
          "!bg-purple-500 !text-white",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
