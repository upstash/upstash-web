import Button from "@/components/button";
import cx from "@/utils/cx";
import { IconArrowUpRight } from "@tabler/icons-react";
import React, { HTMLProps } from "react";

export function CommunityBox({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "group flex flex-col items-center p-6 md:p-8",
        "bg-white transition dark:bg-bg-mute",
        "rounded-lg first:rounded-t-3xl last:rounded-b-3xl",
        "md:rounded-lg md:first:rounded-t-lg md:last:rounded-b-lg",
        "lg:first:rounded-t-lg lg:last:rounded-b-lg",
        "lg:first:!rounded-l-4xl lg:last:!rounded-r-4xl",
        "hover:shadow-xl",
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
      className={cx(
        "font-display text-xl font-semibold group-hover:text-primary md:text-2xl",
        className,
      )}
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
    <p className={cx("mb-4 mt-2 text-text-mute sm:mb-6", className)} {...props}>
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
    <Button asChild className={cx("", className)}>
      <a target="_blank" {...props}>
        {children}
        <IconArrowUpRight size={20} />
      </a>
    </Button>
  );
}
