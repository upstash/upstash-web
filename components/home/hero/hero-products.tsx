import cx from "@/utils/cx";
import { HTMLProps } from "react";
import { Product } from "@/utils/type";
import Button from "@/components/button";

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
        title="Redis"
        desc="Serverless database service compatible with Redis® API"
        onMouseEnter={() => setActiveProduct(Product.REDIS)}
        button={{
          href: "https://console.upstash.com",

          text: "Create Database",
          className: cx(
            activeProduct === Product.REDIS &&
              "bg-[#E5484D] group-hover/hero-product:bg-[#E5484D] group-hover/hero-product:text-white"
          ),
        }}
      />
      <HomeHeroProduct
        title="Kafka"
        desc="Serverless database service compatible with Redis® API"
        onMouseEnter={() => setActiveProduct(Product.KAFKA)}
        button={{
          href: "https://console.upstash.com",
          text: "Create Cluster",
          className: cx(
            activeProduct === Product.KAFKA &&
              "bg-[#0090FF] group-hover/hero-product:bg-[#0090FF] group-hover/hero-product:text-white"
          ),
        }}
      />
      <HomeHeroProduct
        title="QStash"
        desc="Serverless database service compatible with Redis® API"
        onMouseEnter={() => setActiveProduct(Product.QSTASH)}
        button={{
          href: "https://console.upstash.com",
          text: "Publish Messages",
          className: cx(
            activeProduct === Product.QSTASH &&
              "bg-[#6E56CF] group-hover/hero-product:bg-[#6E56CF] group-hover/hero-product:text-white"
          ),
        }}
      />
    </div>
  );
}

function HomeHeroProduct({
  title,
  desc,
  className,
  button: { href, text, className: btnClass, ...buttonProps },
  ...props
}: HTMLProps<HTMLDivElement> & {
  title: string;
  desc: string;
  className?: string;
  button: HTMLProps<HTMLAnchorElement> & { text: string };
}) {
  return (
    <div
      className={cx(
        "group/hero-product flex cursor-default flex-col items-center p-6 md:p-8",
        "bg-white/5 backdrop-blur transition",
        "rounded-lg first:rounded-t-3xl last:rounded-b-3xl",
        "md:first:rounded-t-lg md:last:rounded-b-lg",
        "md:first:!rounded-l-[2.2rem] md:last:!rounded-r-[2.2rem]",
        "hover:scale-[1.02] hover:bg-white/10",
        className
      )}
      {...props}
    >
      <h3 className="font-display text-xl font-medium leading-none md:text-2xl">
        {title}
      </h3>
      <p className="mt-2 opacity-60">{desc}</p>
      <Button
        href={href}
        target="_self"
        className={cx("mt-6 bg-zinc-50 text-zinc-950", btnClass)}
        {...buttonProps}
        type="button"
      >
        {text}
      </Button>
    </div>
  );
}
