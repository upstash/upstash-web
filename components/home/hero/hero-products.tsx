import cx from "@/utils/cx";
import Button from "@/components/button";
import { HTMLAttributes } from "react";
import { Product } from "@/utils/type";

export default function HomeHeroProducts({
  activeProduct,
  setActiveProduct,
}: {
  activeProduct?: Product;
  setActiveProduct: (product?: Product) => void;
}) {
  return (
    <div
      className="mt-16 grid grid-cols-3 gap-1"
      onMouseLeave={() => setActiveProduct(undefined)}
    >
      <HomeHeroProduct
        title="Redis"
        desc="Serverless database service compatible with Redis® API"
        onMouseEnter={() => setActiveProduct(Product.REDIS)}
        className={cx(activeProduct === Product.REDIS && "bg-white/20")}
        button={{
          href: "https://console.upstash.com/redis?create=tru",
          text: "Create Database",
          className: cx(
            activeProduct === Product.REDIS &&
              "bg-[#E5484D] hover:bg-[#E5484D] text-white"
          ),
        }}
      />
      <HomeHeroProduct
        title="Kafka"
        desc="Serverless database service compatible with Redis® API"
        onMouseEnter={() => setActiveProduct(Product.KAFKA)}
        className={cx(activeProduct === Product.KAFKA && "bg-white/20")}
        button={{
          href: "https://console.upstash.com/kafka?create=tru",
          text: "Create Cluster",
          className: cx(
            activeProduct === Product.KAFKA &&
              "bg-[#0090FF] hover:bg-[#0090FF] text-white"
          ),
        }}
      />
      <HomeHeroProduct
        title="QStash"
        desc="Serverless database service compatible with Redis® API"
        onMouseEnter={() => setActiveProduct(Product.QSTASH)}
        className={cx(activeProduct === Product.QSTASH && "bg-white/20")}
        button={{
          href: "https://console.upstash.com/qstash",
          text: "Publish Messages",
          className: cx(
            activeProduct === Product.QSTASH &&
              "bg-[#6E56CF] hover:bg-[#6E56CF] text-white"
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
        "flex cursor-default flex-col items-center bg-white/10 px-8 py-8",
        "backdrop-blur-xl transition",
        "first:rounded-l-[2.2rem] last:rounded-r-[2.2rem]",
        className
      )}
      {...props}
    >
      <h3 className="font-display text-2xl font-medium leading-none">
        {title}
      </h3>
      <p className="mt-2 opacity-60">{desc}</p>
      <Button
        href={href}
        className={cx(
          "mt-6 bg-zinc-50 font-medium text-zinc-950 transition",
          btnClass
        )}
        {...buttonProps}
      >
        {text}
      </Button>
    </div>
  );
}
