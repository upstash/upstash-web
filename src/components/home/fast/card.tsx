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
        "font-display text-3xl font-semibold tabular-nums text-primary md:text-4xl dark:text-inherit",
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
    <h5 className="mt-1 opacity-60" {...props}>
      {children}
    </h5>
  );
}
