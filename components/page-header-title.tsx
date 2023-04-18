import React, { HTMLAttributes } from "react";
import cx from "@/utils/cx";

type IPageHeaderTitle = HTMLAttributes<HTMLHeadingElement> & {
  children: React.ReactNode;
};

export default function PageHeaderTitle({
  children,
  className,
  ...props
}: IPageHeaderTitle) {
  return (
    <h1
      className={cx(
        "font-display text-4xl font-semibold !leading-title md:text-6xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}
