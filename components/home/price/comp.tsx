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

export function PriceValue({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <h3 className={cx("text-xl font-medium", className)} {...props}>
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
  type = "free",
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
  type?: "free" | "payg";
}) {
  return (
    <span
      className={cx(
        "inline-flex rounded-full border px-3 py-1 leading-none",
        "text-xs uppercase leading-none tracking-widest",
        type === "free" &&
          "border-emerald-300/10 bg-emerald-300/5 text-emerald-300",
        type === "payg" &&
          "border-yellow-300/10 bg-yellow-300/5 text-yellow-300/90",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function PriceHr({ className }: HTMLProps<HTMLDivElement> & {}) {
  return (
    <hr className={cx("w-1/3 border-0 border-b border-white/5", className)} />
  );
}
