import cx from "@/utils/cx";
import React, { HTMLProps } from "react";

export default function Bg({ className }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "absolute left-1/2 top-0 -z-10 -translate-x-1/2",
        "h-[200px] w-4/5 md:h-[400px]",
        "bg-primary rounded-[100%] opacity-5 blur-[90px]",
        "pointer-events-none",
        className,
      )}
    />
  );
}
