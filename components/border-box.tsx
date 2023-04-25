import { HTMLProps } from "react";
import cx from "@/utils/cx";

export function BorderBox({ children, className }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "rounded-[2.2rem] bg-gradient-to-b from-white/10 to-transparent p-px",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BorderBoxBody({
  children,
  className,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div className={cx("h-full rounded-[inherit] bg-zinc-900 p-8", className)}>
      {children}
    </div>
  );
}

export function BorderBoxBodyTitle({
  children,
  className,
}: HTMLProps<HTMLHeadElement>) {
  return (
    <h4 className={cx("font-display text-2xl font-semibold", className)}>
      {children}
    </h4>
  );
}

export function BorderBoxBodySummary({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className={cx("mt-2 opacity-60", className)}>{children}</p>;
}
