import { HTMLProps } from "react";

import cx from "@/utils/cx";

import Button from "@/components/button";

export function CommunityBox({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "group/community-box flex flex-col items-center p-6 md:p-8",
        "bg-white/5 transition",
        "rounded-lg first:rounded-t-3xl last:rounded-b-3xl",
        "md:rounded-lg md:first:rounded-t-lg md:last:rounded-b-lg",
        "lg:first:rounded-t-lg lg:last:rounded-b-lg",
        "lg:first:!rounded-l-4xl lg:last:!rounded-r-4xl",
        "hover:scale-[1.02] hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommunityBoxTitle({
  children,
  className,
  ...props
}: HTMLProps<HTMLHeadingElement>) {
  return (
    <h4
      className={cx("font-display text-xl md:text-2xl", className)}
      {...props}
    >
      {children}
    </h4>
  );
}

export function CommunityBoxDesc({
  children,
  className,
  ...props
}: HTMLProps<HTMLParagraphElement>) {
  return (
    <p className={cx("mb-6 mt-2 opacity-40", className)} {...props}>
      {children}
    </p>
  );
}

export function CommunityBoxButton({
  children,
  className,
  ...props
}: HTMLProps<HTMLAnchorElement>) {
  return (
    <Button
      className={cx(
        "mt-auto",
        "group-hover/community-box:bg-emerald-400 group-hover/community-box:text-emerald-950",
        className,
      )}
      {...props}
      type="button"
    >
      {children}
    </Button>
  );
}
