"use client";

import cx from "@/utils/cx";
import { Children, cloneElement, HTMLProps, ReactElement } from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Balancer from "react-wrap-balancer";
import Button, { IButton } from "@/components/button";
import { Products } from "./filter";

export function Example({
  className,
  children,
  products,
  ...props
}: HTMLProps<HTMLDivElement> & {
  products: Products[];
}) {
  const childs = Children.map(children, (child: ReactElement) => {
    return cloneElement(child, {
      ...child.props,
      products,
    });
  });

  return (
    <article
      className={cx(
        "group/example-box p-6 text-left md:p-8",
        "flex flex-col gap-1",
        "rounded-3xl bg-white/03",
        "border border-white/5",
        className
      )}
      {...props}
    >
      {childs}
    </article>
  );
}

Example.Title = function ExampleTitle({
  className,
  children,
  ...props
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h3
      className={cx("font-display text-xl font-semibold", className)}
      {...props}
    >
      <Balancer>{children}</Balancer>
    </h3>
  );
};

Example.Description = function ExampleDescription({
  className,
  children,
  ...props
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <p className={cx("opacity-60", className)} {...props}>
      {children}
    </p>
  );
};

Example.Products = function ExampleProducts({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement> & { products?: Products[] }) {
  if (!props.products) return null;

  return (
    <div
      className={cx(
        "mt-auto flex items-center justify-start gap-2 pt-4",
        className
      )}
      {...props}
    >
      {props.products.map((product) => {
        if (product === Products.redis) {
          return (
            <span
              key={product}
              className="inline-flex items-center gap-1.5
             rounded bg-red-400/10 px-2 py-1 text-red-200"
            >
              <IconRedis
                width={16}
                aria-label="Upstash Redis Icon"
                className=""
              />
              Redis
            </span>
          );
        } else if (product === Products.kafka) {
          return (
            <span
              key={product}
              className="inline-flex items-center gap-1.5
             rounded bg-blue-400/10 px-2 py-1 text-blue-200"
            >
              <IconKafka
                width={16}
                aria-label="Upstash Kafka Icon"
                className=""
              />
              Kafka
            </span>
          );
        } else if (product === Products.qstash) {
          return (
            <span
              key={product}
              className="inline-flex items-center gap-1.5
             rounded bg-purple-400/10 px-2 py-1 text-purple-200"
            >
              <IconQStash
                width={16}
                aria-label="Upstash QStash Icon"
                className=""
              />
              QStash
            </span>
          );
        }
      })}
    </div>
  );
};

Example.Link = function ExampleLink({
  className,
  children,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cx("mt-6 flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
};

Example.LinkItem = function ExampleLinkItem({
  className,
  children,
  ...props
}: IButton) {
  return (
    <Button
      type="button"
      className={cx("grow text-white/60", className)}
      {...props}
    >
      {children}
    </Button>
  );
};
