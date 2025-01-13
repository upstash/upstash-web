import Button from "@/components/button";
import cx from "@/utils/cx";
import { Product } from "@/utils/type";
import { IconArrowUpRight } from "@tabler/icons-react";
import React, { Children, cloneElement, HTMLProps, ReactElement } from "react";

export function ServerlessBox({
  children,
  className,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "group relative z-0 grid gap-6 p-6 md:gap-8 md:p-8",
        "bg-white dark:bg-bg-mute",
        "rounded-3xl md:rounded-4xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ServerlessTitle({
  children,
  className,
  link,
}: HTMLProps<HTMLHeadElement> & {
  link?: string;
}) {
  return (
    <h4
      className={cx(
        "flex items-center gap-2 font-display text-xl font-semibold md:text-2xl",
        className,
      )}
    >
      {children}
      {link && (
        <span className="inline-flex opacity-0 transition group-hover:opacity-100">
          <Button asChild className="!p-1">
            <a href={link} target="_blank">
              <IconArrowUpRight size={24} className="opacity-100" />
            </a>
          </Button>
        </span>
      )}
    </h4>
  );
}

export function ServerlessSummary({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <p className={cx("mt-2 text-text-mute md:mt-3", className)}>{children}</p>
  );
}

export function ProductFeature({
  children,
  className,
  product,
}: HTMLProps<HTMLUListElement> & {
  product?: Product;
}) {
  const childs = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      product,
    });
  });

  return <ul className={cx("space-y-2", className)}>{childs}</ul>;
}
