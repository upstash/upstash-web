"use client";

import cx from "@/utils/cx";
import { Children, cloneElement, HTMLProps, ReactElement } from "react";
import IconRedis from "@/components/icon-redis";
import IconKafka from "@/components/icon-kafka";
import IconQStash from "@/components/icon-qstash";
import Balancer from "react-wrap-balancer";
import Button, { IButton } from "@/components/button";

export function Example({
  className,
  children,
  products,
  ...props
}: HTMLProps<HTMLDivElement> & {
  products: string[];
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
        "group/example-box p-6",
        "flex flex-col gap-4 md:gap-6",
        "rounded-3xl bg-white/03",
        "border border-white/5",
        "transition hover:bg-white/5",
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
      className={cx(
        "font-display text-xl font-medium md:leading-tight",
        className
      )}
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
}: HTMLProps<HTMLDivElement> & { products?: string[] }) {
  if (!props.products) return null;

  return (
    <div
      className={cx("flex items-center justify-start gap-2", className)}
      {...props}
    >
      {props.products.map((product) => {
        if (product === "redis") {
          return <IconRedis key={product} width={24} className="" />;
        } else if (product === "kafka") {
          return (
            <IconKafka
              key={product}
              width={24}
              aria-label="Upstash Kafka Icon"
              className=""
            />
          );
        } else if (product === "qstash") {
          return (
            <IconQStash
              key={product}
              width={24}
              aria-label="Upstash QStash Icon"
              className=""
            />
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
    <div className={cx("mt-auto grid grid-cols-2 gap-2", className)} {...props}>
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
      hideIcon={!props.href}
      disabled={!props.href}
      className={cx(
        "text-white/60",
        props.href &&
          "group-hover/example-box:bg-white group-hover/example-box:text-zinc-950",
        !props.href && "pointer-events-none bg-white/03",
        "hover:!bg-emerald-400 hover:!text-emerald-950",
        className
      )}
      {...props}
    >
      {props.href ? children : <span className="opacity-0">View</span>}
    </Button>
  );
};
