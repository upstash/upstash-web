import React, { HTMLAttributes } from "react";
import cx from "@/utils/cx";

export default function Bg({ className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "absolute left-1/2 top-0 -z-10 h-[400px] w-4/5",
        "-translate-x-1/2",
        "bg-emerald-500 opacity-5 blur-[100px]",
        className
      )}
    />
  );
}
