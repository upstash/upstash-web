import { HOME_PRODUCTS } from "@/components/home/product-new/products";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { useRef } from "react";

export default function HomeHeroProducts({
  activeProduct,
  setActiveProduct,
}: {
  activeProduct: Product;
  setActiveProduct: (product: Product) => void;
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div
      role="tablist"
      aria-label="Upstash products"
      className="flex w-full items-end gap-1 overflow-x-auto pt-1 sm:gap-2"
    >
      {HOME_PRODUCTS.map(({ product, Icon, activeClassName }, index) => {
        const active = activeProduct === product;

        return (
          <button
            key={product}
            ref={(tab) => {
              tabs.current[index] = tab;
            }}
            type="button"
            role="tab"
            id={`product-tab-${product.toLowerCase()}`}
            aria-selected={active}
            aria-controls="home-product-panel"
            tabIndex={active ? 0 : -1}
            onClick={() => setActiveProduct(product)}
            onFocus={(event) => {
              event.currentTarget.scrollIntoView({
                block: "nearest",
                inline: "nearest",
              });
            }}
            onKeyDown={(event) => {
              let nextIndex = index;
              if (event.key === "ArrowRight") {
                nextIndex = (index + 1) % HOME_PRODUCTS.length;
              } else if (event.key === "ArrowLeft") {
                nextIndex =
                  (index - 1 + HOME_PRODUCTS.length) % HOME_PRODUCTS.length;
              } else if (event.key === "Home") {
                nextIndex = 0;
              } else if (event.key === "End") {
                nextIndex = HOME_PRODUCTS.length - 1;
              } else {
                return;
              }
              event.preventDefault();
              setActiveProduct(HOME_PRODUCTS[nextIndex].product);
              tabs.current[nextIndex]?.focus();
            }}
            className={cx(
              "flex h-16 min-w-28 flex-1 items-center justify-center gap-2 whitespace-nowrap px-2 sm:min-w-0 sm:flex-col sm:gap-1 lg:flex-row lg:gap-2 lg:px-4",
              "rounded-t-2xl border-2 border-b-0 border-bg-mute bg-bg font-display text-sm font-semibold text-text-mute sm:text-base lg:text-xl dark:border-transparent dark:bg-bg-mute",
              "transition-colors hover:bg-bg-mute focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary motion-reduce:transition-none",
              active &&
                "border-white bg-white hover:bg-white dark:bg-white/10 dark:hover:bg-white/10",
              active && activeClassName,
            )}
          >
            <Icon aria-hidden="true" className="w-5 shrink-0 lg:w-6" />
            <span>
              {product}
              {product === Product.REDIS && (
                <span className="ml-1 hidden text-[.7em] opacity-40 lg:inline">
                  ®*
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
