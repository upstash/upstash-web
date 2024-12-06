import Button, { IButton } from "@/components/button";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { Children, cloneElement, HTMLProps, ReactElement } from "react";

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
        href="https://console.upstash.com"
        activeProduct={activeProduct}
        onMouseEnter={() => setActiveProduct(Product.REDIS)}
      >
        <HeroProductTitle>
          <span>Redis</span>
          <span className="text-[.9em] opacity-20">®*</span>
        </HeroProductTitle>
        <HeroProductDesc>Serverless database with Redis API</HeroProductDesc>
        <HeroProductCta
          className={cx(
            activeProduct === Product.REDIS && "!bg-red-500 !text-white",
          )}
        >
          Create Database
        </HeroProductCta>
      </HomeHeroProduct>

      <HomeHeroProduct
        href="https://console.upstash.com"
        activeProduct={activeProduct}
        onMouseEnter={() => setActiveProduct(Product.VECTOR)}
      >
        <HeroProductTitle>
          <span>Vector</span>
          <span className="ml-0.5 rounded bg-orange-500 px-1.5 py-1 text-xs font-semibold leading-none tracking-wide">
            NEW
          </span>
        </HeroProductTitle>
        <HeroProductDesc>Serverless Vector Database</HeroProductDesc>
        <HeroProductCta
          className={cx(
            activeProduct === Product.VECTOR && "!bg-orange-500 !text-white",
          )}
        >
          Create Index
        </HeroProductCta>
      </HomeHeroProduct>

      <HomeHeroProduct
        href="https://console.upstash.com"
        activeProduct={activeProduct}
        onMouseEnter={() => setActiveProduct(Product.QSTASH)}
      >
        <HeroProductTitle>
          <span>QStash</span>
        </HeroProductTitle>
        <HeroProductDesc>Messaging for the Serverless</HeroProductDesc>
        <HeroProductCta
          className={cx(
            activeProduct === Product.QSTASH && "!bg-purple-500 !text-white",
          )}
        >
          Publish Messages
        </HeroProductCta>
      </HomeHeroProduct>
    </div>
  );
}

function HomeHeroProduct({
  children,
  className,
  href,
  activeProduct,
  ...props
}: HTMLProps<HTMLDivElement> & {
  href?: string;
  activeProduct?: Product;
}) {
  const childs = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      activeProduct,
      href,
    });
  });

  return (
    <div
      className={cx(
        "group/hero-product",
        "relative flex flex-col items-center p-6 md:p-8",
        "cursor-default bg-white/5 backdrop-blur transition",
        "rounded-lg",
        "xl:first:!rounded-l-4xl xl:last:!rounded-r-4xl",
        "hover:scale-[1.02] hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {href && <a className="absolute inset-0 z-10" href={href} />}
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
        "flex items-center gap-1 text-zinc-50",
        "font-display text-xl font-medium leading-none md:text-2xl",
        className,
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
  return (
    <p className={cx("mt-2 grow opacity-60 xl:mx-4", className)}>{children}</p>
  );
}

function HeroProductCta({
  children,
  className,
  activeProduct,
  ...props
}: IButton & {
  activeProduct?: Product;
}) {
  return (
    <Button
      type="button"
      className={cx(
        "mt-4 hidden md:inline-flex",
        activeProduct ? "bg-white/3 text-zinc-50" : "bg-zinc-50 text-zinc-950",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
