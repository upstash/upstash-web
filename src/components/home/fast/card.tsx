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
        "font-display text-3xl font-semibold md:text-4xl",
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
    <h5
      className="mt-1 text-xs uppercase tracking-widest text-text-mute"
      {...props}
    >
      {children}
    </h5>
  );
}
