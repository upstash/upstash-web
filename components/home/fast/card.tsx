import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";

export function FastCard({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div className={cx("", className)} {...props}>
      {children}
    </div>
  );
}

export function FastCardValue({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div className={cx("font-display text-4xl", className)} {...props}>
      {children}
    </div>
  );
}

export function FastCardTitle({
  children,
  className,
  ...props
}: HTMLProps<HTMLHeadingElement> & {
  children: ReactNode;
}) {
  return (
    <h5
      className="mt-1 text-sm uppercase tracking-widest opacity-40"
      {...props}
    >
      {children}
    </h5>
  );
}
