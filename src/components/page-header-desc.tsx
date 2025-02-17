import cx from "@/utils/cx";
import { HTMLProps } from "react";

type IPageHeaderDesc = HTMLProps<HTMLParagraphElement> & {};

export default function PageHeaderDesc({
  children,
  className,
  ...props
}: IPageHeaderDesc) {
  return (
    <p
      className={cx("text-balance text-lg opacity-60 md:text-xl", className)}
      {...props}
    >
      {children}
    </p>
  );
}
