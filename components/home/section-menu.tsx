"use client";

import { HTMLProps } from "react";
import cx from "@/utils/cx";

export default function SectionMenu({
  children,
  className,
  show,
  ...props
}: HTMLProps<HTMLDivElement> & {
  show: boolean;
}) {
  return (
    <header
      className={cx(
        "fixed left-1/2 top-40 z-50 -translate-x-1/2 items-center p-1",
        "rounded-full bg-black/90 shadow-xl backdrop-blur",
        show ? "flex" : "hidden",
        className
      )}
      {...props}
    >
      <SectionMenuItem>Fast Anywhere</SectionMenuItem>
      <SectionMenuItem>Serverless</SectionMenuItem>
      <SectionMenuItem>Pricing</SectionMenuItem>
      <SectionMenuItem>Open Source</SectionMenuItem>
      <SectionMenuItem>Community</SectionMenuItem>
    </header>
  );
}

function SectionMenuItem({
  children,
  className,
  ...props
}: HTMLProps<HTMLAnchorElement>) {
  return (
    <a className={cx("rounded-full px-4 py-3", className)} {...props}>
      {children}
    </a>
  );
}
