import { HTMLProps } from "react";

import cx from "@/utils/cx";

type IPageBodyGradient = HTMLProps<HTMLDivElement> & {};

export default function PageBodyGradient({
  className,
  ...props
}: IPageBodyGradient) {
  return (
    <div
      className={cx(
        "absolute inset-x-0 top-0 -z-10 h-[800px]",
        "bg-gradient-to-b",
        "from-zinc-100/80 to-zinc-50",
        "dark:from-white/3 dark:to-zinc-950",
        className,
      )}
      {...props}
    />
  );
}
