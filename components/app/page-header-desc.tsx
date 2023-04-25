import React, { HTMLAttributes } from "react";
import cx from "@/utils/cx";
import Balancer from "react-wrap-balancer";

type IPageHeaderDesc = HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

export default function PageHeaderDesc({
  children,
  className,
  ...props
}: IPageHeaderDesc) {
  return (
    <Balancer>
      <p className={cx("text-lg opacity-60 md:text-2xl", className)} {...props}>
        {children}
      </p>
    </Balancer>
  );
}
