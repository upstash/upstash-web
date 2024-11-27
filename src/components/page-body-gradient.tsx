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
        "to-bg bg-gradient-to-b",
        "from-black/3 dark:from-white/3",
        className,
      )}
      {...props}
    />
  );
}
