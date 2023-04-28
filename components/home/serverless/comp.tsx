import { HTMLProps } from "react";
import cx from "@/utils/cx";
import Button from "@/components/button";

export function ServerlessBox({
  children,
  className,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "group/box-body relative z-0 grid gap-8 rounded-[2.2rem] rounded-l-[2.2rem] bg-white/5 p-8 backdrop-blur-xl",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ServerlessTitle({
  children,
  className,
  link,
}: HTMLProps<HTMLHeadElement> & {
  link?: string;
}) {
  return (
    <h4
      className={cx(
        "flex items-center gap-2 font-display text-2xl font-semibold",
        className
      )}
    >
      {children}
      {link && (
        <span
          className="inline-flex translate-y-1/4 text-emerald-300 opacity-0 transition
        group-hover/box-body:translate-y-0 group-hover/box-body:opacity-100"
        >
          <Button
            href={link}
            iconProps={{
              className: "text-3xl opacity-100",
            }}
          />
        </span>
      )}
    </h4>
  );
}

export function ServerlessSummary({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className={cx("mt-3 opacity-40", className)}>{children}</p>;
}
