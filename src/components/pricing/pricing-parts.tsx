import cx from "@/utils/cx";
import * as React from "react";
import { ComponentProps } from "react";

export function Hr({ className }: ComponentProps<"hr">) {
  return (
    <hr className={cx("w-2/3 border-0 border-b border-bg-mute", className)} />
  );
}

export function FeatureTag({
  active = false,
  children,
  className,
  ...props
}: ComponentProps<"div"> & {
  active?: boolean;
}) {
  return (
    <div
      className={cx(
        "inline-flex items-center gap-1 border border-transparent py-1 pl-2 pr-3 text-sm",
        "rounded-full bg-emerald-600/10",
        active ? "border-emerald-700/30" : "opacity-40",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
