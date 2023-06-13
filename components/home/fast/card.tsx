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
    <div
      className={cx(
        "font-display text-3xl font-semibold text-emerald-400 md:text-4xl",
        className
      )}
      {...props}
    >
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
      className="mt-1 text-xs uppercase tracking-widest text-emerald-200 opacity-40"
      {...props}
    >
      {children}
    </h5>
  );
}
