import cx from "@/utils/cx";
import { HTMLProps, ReactNode } from "react";

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
        "font-display text-lg font-semibold tabular-nums text-primary-text md:text-3xl",
        className,
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
    <h5 className="text-sm opacity-60 md:mt-1 md:text-base" {...props}>
      {children}
    </h5>
  );
}
