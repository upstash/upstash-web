import cx from "@/utils/cx";
import { HTMLProps, ReactNode } from "react";

type IPageHeaderTitle = HTMLProps<HTMLHeadingElement> & {
  children: ReactNode;
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
    h1: "text-4xl md:text-5xl",
    h2: "text-2xl md:text-4xl",
  };

  return (
    <Tag
      className={cx(
        "text-balance font-display font-semibold !leading-title",
        size[as],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
