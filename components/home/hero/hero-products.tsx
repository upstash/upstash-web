import cx from "@/utils/cx";
import { HTMLAttributes } from "react";
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
      className="mt-16 grid grid-cols-3 gap-2"
      onMouseLeave={() => setActiveProduct(undefined)}
    >
      <HomeHeroProduct
        title="Redis"
        desc="Serverless database service compatible with Redis® API"
        onMouseEnter={() => setActiveProduct(Product.REDIS)}
        button={{
          href: "https://console.upstash.com/redis?create=tru",
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
          href: "https://console.upstash.com/kafka?create=tru",
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
          href: "https://console.upstash.com/qstash",
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
}: HTMLAttributes<HTMLDivElement> & {
  title: string;
  desc: string;
  className?: string;
  button: HTMLAttributes<HTMLAnchorElement> & { href: string; text: string };
}) {
  return (
    <div
      className={cx(
        "group/hero-product flex cursor-default flex-col items-center bg-white/5 p-8",
        "backdrop-blur-xl transition",
        "rounded-lg first:rounded-l-[2.2rem] last:rounded-r-[2.2rem]",
        "hover:scale-[1.02] hover:bg-white/10",
        className
      )}
      {...props}
    >
      <h3 className="font-display text-2xl font-medium leading-none">
        {title}
      </h3>
      <p className="mt-2 opacity-60">{desc}</p>
      <Button
        type="button"
        href={href}
        className={cx("mt-6 bg-zinc-50 text-zinc-950", btnClass)}
        {...buttonProps}
      >
        {text}
      </Button>
    </div>
  );
}
