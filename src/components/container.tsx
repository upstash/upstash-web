import cx from "@/utils/cx";
import { HTMLProps, ReactNode } from "react";

export interface IContainer extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export default function Container({
  children,
  className,
  ...props
}: IContainer) {
  return (
    <div
      className={cx("mx-auto max-w-screen-xl px-6 md:px-10", className)}
      {...props}
    >
      {children}
    </div>
  );
}
