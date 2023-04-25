import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";

export interface ISectionHeader extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

export function SectionHeader({
  children,
  className,
  ...props
}: ISectionHeader) {
  return (
    <header className={cx("mx-auto max-w-screen-md", className)} {...props}>
      {children}
    </header>
  );
}

export function SectionHeaderTitle({
  children,
  className,
  ...props
}: ISectionHeader) {
  return (
    <h3
      className={cx("font-display text-6xl font-semibold", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function SectionHeaderSummary({
  children,
  className,
  ...props
}: ISectionHeader) {
  return (
    <p className={cx("mt-2 text-2xl opacity-40", className)} {...props}>
      {children}
    </p>
  );
}
