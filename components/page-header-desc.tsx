import React, { HTMLAttributes } from "react";
import cx from "@/utils/cx";

type IPageHeaderDesc = HTMLAttributes<HTMLParagraphElement> & {
  children: React.ReactNode;
};

export default function PageHeaderDesc({
  children,
  className,
  ...props
}: IPageHeaderDesc) {
  return (
    <p className={cx("mt-4 text-xl opacity-60", className)} {...props}>
      {children}
    </p>
  );
}
