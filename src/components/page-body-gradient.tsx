import cx from "@/utils/cx";
import { HTMLProps } from "react";

type IPageBodyGradient = HTMLProps<HTMLDivElement> & { isBlogPage?: boolean };

export default function PageBodyGradient({
  className,
  isBlogPage,
  ...props
}: IPageBodyGradient) {
  return (
    <div
      className={cx(
        "absolute inset-x-0 top-0 -z-10 h-[800px]",
        "bg-gradient-to-b",
        isBlogPage
          ? [
              "from-zinc-100/80 to-zinc-50",
              "dark:from-white/3 dark:to-zinc-950",
            ]
          : "from-white/3 to-zinc-950",
        className,
      )}
      {...props}
    />
  );
}
