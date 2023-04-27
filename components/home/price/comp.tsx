import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";

export function PriceTitle({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <h3
      className={cx("font-display text-2xl font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function PriceDesc({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <p className={cx("opacity-40", className)} {...props}>
      {children}
    </p>
  );
}

export function PriceBadge({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <p
      className={cx(
        "inline-flex rounded-full border bg-white/5 px-3 py-1.5 text-xs uppercase leading-none",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}

export function PriceHr({ className }: HTMLProps<HTMLDivElement> & {}) {
  return (
    <hr className={cx("w-full border-0 border-b border-white/5", className)} />
  );
}
