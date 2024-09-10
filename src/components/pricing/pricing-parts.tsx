import * as React from "react";
import { ComponentProps } from "react";

import cx from "@/utils/cx";

export function Hr({ className }: ComponentProps<"hr">) {
  return (
    <hr className={cx("w-2/3 border-0 border-b border-b-white/5", className)} />
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
        "inline-flex items-center gap-1 rounded-full border border-transparent py-1 pl-2 pr-3 text-sm",
        active
          ? "border-emerald-400/10 bg-emerald-400/5 text-emerald-100"
          : "bg-white/10 opacity-30",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
