import cx from "@/utils/cx";
import React, { HTMLProps } from "react";

export default function Bg({ className }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "absolute left-1/2 top-0 -z-10 w-full -translate-x-1/2 md:top-0",
        "h-[200px] md:h-[400px]",
        "rounded-[100%] bg-primary opacity-10 blur-[60px] md:blur-[90px] dark:opacity-5",
        "pointer-events-none",
        className,
      )}
    />
  );
}
