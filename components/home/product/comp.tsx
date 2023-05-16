import React, { Children, cloneElement, HTMLProps, ReactElement } from "react";
import cx from "@/utils/cx";
import Icon, { ICON_NAMES } from "@/components/icon";
import { Product } from "@/utils/type";
import Balancer from "react-wrap-balancer";

export function ProductBox({
  children,
  className,
  product,
}: HTMLProps<HTMLDivElement> & {
  product: Product;
}) {
  const childs = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      product,
    });
  });

  return (
    <div
      className={cx(
        "group/box-body relative z-0 grid gap-6 p-6 text-left md:gap-8 md:p-8",
        "bg-white/03 backdrop-blur",
        "rounded-3xl md:rounded-[2.2rem]",
        className
      )}
    >
      {childs}
    </div>
  );
}

export function ProductTitle({
  children,
  className,
}: HTMLProps<HTMLHeadElement> & {}) {
  return (
    <h4
      className={cx(
        "flex w-2/3 items-center gap-2 font-display text-xl font-semibold md:text-2xl",
        className
      )}
    >
      <Balancer>{children}</Balancer>
    </h4>
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

export function ProductFeatureItem({
  children,
  className,
  product,
}: HTMLProps<HTMLLIElement> & {
  product?: Product;
}) {
  return (
    <li
      className={cx(
        "flex md:w-5/6",
        // product === Product.REDIS && "text-red-100",
        // product === Product.KAFKA && "text-blue-100",
        // product === Product.QSTASH && "text-purple-100",
        className
      )}
    >
      <Icon
        icon={ICON_NAMES.CircleCheck}
        className={cx(
          "mr-2 text-2xl text-[inherit]",
          product === Product.REDIS && "text-red-300",
          product === Product.KAFKA && "text-blue-300",
          product === Product.QSTASH && "text-purple-300",
          className
        )}
      />
      {children}
    </li>
  );
}
