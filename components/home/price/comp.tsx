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
        "grid place-items-center gap-4  p-6 md:gap-6 md:p-8",
        "bg-white/5 backdrop-blur",
        "rounded-lg first:rounded-t-3xl last:rounded-b-3xl",
        "md:first:rounded-t-lg md:last:rounded-b-lg",
        "md:first:!rounded-l-[2.2rem] md:last:!rounded-r-[2.2rem]",
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
        "font-display text-xl font-medium leading-none md:text-2xl",
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
    <h5 className={cx("text-lg font-medium md:text-xl", className)} {...props}>
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
        "inline-flex rounded-full border px-3 pb-1 pt-1.5 leading-none",
        "text-xs uppercase leading-none tracking-widest",
        type === "free" &&
          "border-emerald-300/10 bg-emerald-300/5 text-emerald-400",
        type === "payg" &&
          "border-yellow-300/10 bg-yellow-300/5 text-yellow-300/80",
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
