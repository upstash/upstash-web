import cx from "@/utils/cx";
import { HTMLProps, ReactNode } from "react";

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
      className={cx(
        "font-display text-4xl font-semibold md:text-6xl",
        className,
      )}
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
    <p
      className={cx(
        "mx-4 mt-2 text-lg opacity-50 md:mx-auto md:text-2xl",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
