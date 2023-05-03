import cx from "@/utils/cx";
import React, {
  Children,
  cloneElement,
  HTMLProps,
  ReactElement,
  ReactNode,
} from "react";
import { Product } from "@/utils/type";
import Button, { IButton } from "@/components/button";
import Icon, { ICON_NAMES } from "@/components/icon";

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
          Redis<span className="opacity-40">®*</span>
        </HeroProductTitle>
        <HeroProductDesc>Serverless database with Redis API</HeroProductDesc>

        {/*
          Durable and fast with multi tier storage.
          Fast anywhere with global replication.
          Designed for Edge/Serverless with REST API.
        */}
        {/*<div className="mt-4 space-y-1">
          <HeroProductFeature>Durable and fast.</HeroProductFeature>
          <HeroProductFeature>Global replication.</HeroProductFeature>
          <HeroProductFeature>Designed for Edge/Serverless.</HeroProductFeature>
        </div>*/}

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
          Kafka<span className="opacity-40">®</span>
        </HeroProductTitle>
        <HeroProductDesc>Serverless Kafka and Connectors</HeroProductDesc>

        {/*
          Per message pricing with zero fixed cost.
          Managed Kafka Connectors with no cost.
          REST support in addition to Kafka API.
          */}
        {/*<div className="mt-4 space-y-1">
          <HeroProductFeature>Durable and fast.</HeroProductFeature>
          <HeroProductFeature>Global replication.</HeroProductFeature>
          <HeroProductFeature>Designed for Edge/Serverless.</HeroProductFeature>
        </div>*/}

        <HeroProductCta href="https://console.upstash.com">
          Create Cluster
        </HeroProductCta>
      </HomeHeroProduct>

      <HomeHeroProduct
        active={activeProduct === Product.QSTASH}
        activeProduct={activeProduct}
        onMouseEnter={() => setActiveProduct(Product.QSTASH)}
      >
        <HeroProductTitle>QStash</HeroProductTitle>
        <HeroProductDesc>Messaging for the Serverless</HeroProductDesc>

        {/*
          Serverless, HTTP based messaging.
          Scheduling via CRON.
          At-least-once delivery with auto retries.
          */}
        {/*<div className="mt-4 space-y-1">
          <HeroProductFeature>Durable and fast.</HeroProductFeature>
          <HeroProductFeature>Global replication.</HeroProductFeature>
          <HeroProductFeature>Designed for Edge/Serverless.</HeroProductFeature>
        </div>*/}

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
  const childs: ReactNode[] = Children.map(
    // @ts-ignore
    children,
    (child: ReactElement) => {
      return cloneElement(child, {
        ...child.props,
        activeProduct,
        active,
      });
    }
  );

  return (
    <div
      className={cx(
        "group/hero-product",
        "flex flex-col items-center p-6 md:p-8",
        "cursor-default bg-white/5 backdrop-blur transition",
        "rounded-lg first:rounded-t-3xl last:rounded-b-3xl",
        "md:first:rounded-t-lg md:last:rounded-b-lg",
        "md:first:!rounded-l-[2.2rem] md:last:!rounded-r-[2.2rem]",
        "hover:scale-[1.02] hover:bg-white/10",
        "text-emerald-100",
        activeProduct === Product.REDIS && "text-red-200",
        activeProduct === Product.KAFKA && "text-blue-200",
        activeProduct === Product.QSTASH && "text-purple-200",
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
  ...props
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cx(
        "font-display text-xl font-medium leading-none text-zinc-50 md:text-2xl",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function HeroProductDesc({
  children,
  className,
  ...props
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <p className={cx("mt-2", className)} {...props}>
      {children}
    </p>
  );
}

export function HeroProductFeature({
  children,
  className,
}: HTMLProps<HTMLLIElement>) {
  return (
    <div
      className={cx(
        "flex items-center justify-center gap-1 opacity-40 group-hover/hero-product:opacity-80",
        className
      )}
    >
      <Icon
        icon={ICON_NAMES.Check}
        className={cx("text-xl text-emerald-300")}
      />
      {children}
    </div>
  );
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
        "mt-6",
        activeProduct ? "bg-white/5 text-zinc-50" : "bg-zinc-50 text-zinc-950",
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
