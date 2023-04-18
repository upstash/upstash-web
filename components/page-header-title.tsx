import React, { HTMLAttributes } from "react";
import cx from "@/utils/cx";
import Balancer from "react-wrap-balancer";

type IPageHeaderTitle = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
  as?: "h1" | "h2";
};

export default function PageHeaderTitle({
  as = "h1",
  children,
  className,
  ...props
}: IPageHeaderTitle) {
  const Tag = as;

  const size = {
    h1: "text-4xl md:text-6xl",
    h2: "text-3xl md:text-5xl",
  };

  return (
    <Balancer>
      <Tag
        className={cx(
          "font-display font-bold !leading-title",
          size[as],
          className
        )}
        {...props}
      >
        {children}
      </Tag>
    </Balancer>
  );
}
