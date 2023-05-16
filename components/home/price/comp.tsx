import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";
import Button, { IButton } from "@/components/button";

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
        "group/price-box grid place-items-center gap-4 p-6 md:gap-6 md:p-8",
        "rounded-4xl bg-white bg-opacity-03 backdrop-blur transition",
        "hover:scale-[1.02] hover:bg-opacity-10",
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
        "font-display text-xl font-semibold leading-none md:text-2xl",
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
    <h5
      className={cx("text-lg font-semibold md:text-xl", className)}
      {...props}
    >
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
  type?: "free" | "payg" | "pro";
}) {
  return (
    <span
      className={cx(
        "inline-flex rounded-full px-2 pb-0.5 pt-1 leading-none",
        "text-xs uppercase leading-none tracking-widest",
        "border border-white/10 bg-white/03 text-white/60",
        type === "payg" &&
          "border-emerald-300/10 bg-emerald-300/03 text-emerald-300/60",
        type === "pro" &&
          "border-yellow-300/10 bg-yellow-300/03 text-yellow-300/60",

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
    <hr className={cx("w-10 border-0 border-b border-white/03", className)} />
  );
}

export function PriceButton({ children, className, ...props }: IButton) {
  return (
    <Button
      className={cx(
        "opacity-20 transition",
        "group-hover/price-box:text-emerald-400 group-hover/price-box:opacity-100",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
