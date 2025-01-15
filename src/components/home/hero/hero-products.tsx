import IconEmpty from "@/components/icon-empty";
import IconQStash from "@/components/icon-qstash";
import IconRedis from "@/components/icon-redis";
import IconVector from "@/components/icon-vector";
import IconWorkflow from "@/components/icon-workflow";
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
        className={cx(activeProduct === Product.REDIS && "text-red-600")}
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
        className={cx(activeProduct === Product.VECTOR && "text-orange-600")}
      >
        <IconVector width={24} />
        <span>Vector</span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.QSTASH}
        onClick={() => {
          setActiveProduct(Product.QSTASH);
        }}
        className={cx(activeProduct === Product.QSTASH && "text-blue-600")}
      >
        <IconQStash width={24} />
        <span>QStash</span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.WORKFLOW}
        onClick={() => {
          setActiveProduct(Product.WORKFLOW);
        }}
        className={cx(activeProduct === Product.WORKFLOW && "text-purple-600")}
      >
        <IconWorkflow width={24} />
        <span>Workflow</span>
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
        "flex items-center justify-center text-center",
        "h-16 px-8",
        "font-display text-2xl font-semibold leading-none text-text-mute",
        "rounded-2xl rounded-b-none border-2 border-b-0 border-bg-mute",
        active && "h-20 border-white bg-white",
        props.disabled && "hidden cursor-not-allowed lg:flex",
        className,
      )}
      {...props}
    >
      <span className={cx("flex items-center justify-center gap-2")}>
        {children}
      </span>
    </button>
  );
}
