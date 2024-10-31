import cx from "@/utils/cx";
import { HTMLProps } from "react";
import Balancer from "react-wrap-balancer";

type IPageHeaderDesc = HTMLProps<HTMLParagraphElement> & {};

export default function PageHeaderDesc({
  children,
  className,
  ...props
}: IPageHeaderDesc) {
  return (
    <p className={cx("text-lg opacity-60 md:text-2xl", className)} {...props}>
      <Balancer>{children}</Balancer>
    </p>
  );
}
