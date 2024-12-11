import IconEmpty from "@/components/icon-empty";
import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconVector from "@/components/icon-vector";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import React from "react";

export default function HomeHeroProducts({
  activeProduct,
  setActiveProduct,
}: {
  activeProduct?: Product;
  setActiveProduct: (product: Product) => void;
}) {
  return (
    <>
      <HomeHeroProductTab
        active={activeProduct === Product.REDIS}
        onClick={() => {
          setActiveProduct(Product.REDIS);
        }}
        className={cx(
          "text-red-100",
          activeProduct === Product.REDIS && "!bg-red-50 text-red-700",
        )}
      >
        <IconRedis width={24} />
        <span>
          Redis <span className="text-[.9em] opacity-40">®*</span>
        </span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.VECTOR}
        onClick={() => {
          setActiveProduct(Product.VECTOR);
        }}
        className={cx(
          "text-orange-100",
          activeProduct === Product.VECTOR && "!bg-orange-50 text-orange-700",
        )}
      >
        <IconVector width={24} />
        <span>Vector</span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.QSTASH}
        onClick={() => {
          setActiveProduct(Product.QSTASH);
        }}
        className={cx(
          "text-purple-100",
          activeProduct === Product.QSTASH && "!bg-purple-50 text-purple-700",
        )}
      >
        <IconQStash width={24} />
        <span>QStash</span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.WORKFLOW}
        onClick={() => {
          setActiveProduct(Product.WORKFLOW);
        }}
        className={cx(
          "text-purple-100",
          activeProduct === Product.WORKFLOW && "!bg-purple-50 text-purple-700",
        )}
      >
        <IconEmpty width={24} />
        <span>Workflow</span>
      </HomeHeroProductTab>

      <HomeHeroProductTab disabled>
        <IconEmpty width={24} className="opacity-10" />
        <span className="opacity-30">Search</span>
      </HomeHeroProductTab>
    </>
  );
}

function HomeHeroProductTab({
  children,
  active,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  active?: boolean;
}) {
  return (
    <button
      type="button"
      className={cx(
        "px-6 py-6 text-center sm:px-8",
        "font-display text-2xl font-medium leading-none",
        "border-2 border-b-0 border-white/10",
        "rounded-t-2xl text-white hover:bg-white/10 md:rounded-t-3xl",
        active && "font-semibold",
        props.disabled && "hidden cursor-not-allowed lg:flex",
        className,
      )}
      {...props}
    >
      <span
        className={cx(
          "flex items-center justify-center gap-2",
          active ? "" : "opacity-80",
        )}
      >
        {children}
      </span>
    </button>
  );
}
