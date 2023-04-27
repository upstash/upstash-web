import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";

export function PriceBox({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
}) {
  return (
    <div
      className={cx(
        "grid place-items-center gap-6 rounded-lg bg-white/5 p-8 backdrop-blur-xl first:rounded-l-[2.2rem] last:rounded-r-[2.2rem]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function PriceTitle({
  children,
  className,
  ...props
}: HTMLProps<HTMLHeadingElement> & {
  children: ReactNode;
}) {
  return (
    <h3
      className={cx(
        "font-display text-2xl font-medium leading-none",
        className
      )}
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
}: HTMLProps<HTMLHeadingElement> & {
  children: ReactNode;
}) {
  return (
    <h5 className={cx("text-xl font-medium", className)} {...props}>
      {children}
    </h5>
  );
}

export function PriceDesc({
  children,
  className,
  ...props
}: HTMLProps<HTMLParagraphElement> & {
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
}: HTMLProps<HTMLSpanElement> & {
  children: ReactNode;
  type?: "free" | "payg";
}) {
  return (
    <span
      className={cx(
        "inline-flex rounded-full border px-3 py-1 leading-none",
        "text-xs uppercase leading-none tracking-widest",
        type === "free" &&
          "border-emerald-300/10 bg-emerald-300/5 text-emerald-400",
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

export function PriceHr({ className }: HTMLProps<HTMLHRElement> & {}) {
  return (
    <hr className={cx("w-10 border-0 border-b border-white/5", className)} />
  );
}
