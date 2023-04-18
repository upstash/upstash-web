import React, { HTMLAttributes } from "react";
import cx from "@/utils/cx";

type IPageBodyGradient = HTMLAttributes<HTMLDivElement> & {};

export default function PageBodyGradient({
  className,
  ...props
}: IPageBodyGradient) {
  return (
    <div
      className={cx(
        "absolute inset-x-0 top-0 -z-10 h-[800px] bg-gradient-to-b from-zinc-900 to-zinc-950 opacity-80",
        className
      )}
      {...props}
    />
  );
}
