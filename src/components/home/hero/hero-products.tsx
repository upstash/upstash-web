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
        className={cx(
          "whitespace-nowrap",
          activeProduct === Product.REDIS && "text-red-600",
        )}
      >
        {
          <IconRedis
            className={cx(
              "hidden w-5 shrink-0 sm:block md:w-6",
              activeProduct === Product.REDIS && "block",
            )}
          />
        }
        <span>
          Redis{" "}
          <span className="hidden text-[.9em] opacity-40 sm:inline-flex">
            ®*
          </span>
        </span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.VECTOR}
        onClick={() => {
          setActiveProduct(Product.VECTOR);
        }}
        className={cx(activeProduct === Product.VECTOR && "text-orange-600")}
      >
        <IconVector
          className={cx(
            "hidden w-5 shrink-0 sm:block md:w-6",
            activeProduct === Product.VECTOR && "block",
          )}
        />
        <span>Vector</span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.QSTASH}
        onClick={() => {
          setActiveProduct(Product.QSTASH);
        }}
        className={cx(activeProduct === Product.QSTASH && "text-blue-600")}
      >
        <IconQStash
          className={cx(
            "hidden w-5 shrink-0 sm:block md:w-6",
            activeProduct === Product.QSTASH && "block",
          )}
        />
        <span>QStash</span>
      </HomeHeroProductTab>

      <HomeHeroProductTab
        active={activeProduct === Product.WORKFLOW}
        onClick={() => {
          setActiveProduct(Product.WORKFLOW);
        }}
        className={cx(activeProduct === Product.WORKFLOW && "text-purple-600")}
      >
        <IconWorkflow
          className={cx(
            "hidden w-5 shrink-0 sm:block md:w-6",
            activeProduct === Product.WORKFLOW && "block",
          )}
        />
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
        "flex grow items-center justify-center text-center sm:grow-0",
        "h-12 sm:px-4 md:h-16 md:px-8",
        "font-display text-[1.2em] font-semibold leading-none text-text-mute md:text-2xl",
        "rounded-2xl rounded-b-none border-2 border-b-0 border-bg-mute bg-bg dark:border-0 dark:bg-bg-mute",
        active && "border-white bg-white md:h-20 dark:bg-white/10",
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
