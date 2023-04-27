import { HTMLProps } from "react";
import cx from "@/utils/cx";
import Button from "@/components/button";

export function BorderBox({ children, className }: HTMLProps<HTMLDivElement>) {
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

export function BorderBoxTitle({
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
          className="translate-y-1/4 opacity-0 transition
        group-hover/box-body:translate-y-0 group-hover/box-body:opacity-100"
        >
          <Button
            href={link}
            iconProps={{
              className: "text-2xl",
            }}
          />
        </span>
      )}
    </h4>
  );
}

export function BorderBoxSummary({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className={cx("mt-3 opacity-40", className)}>{children}</p>;
}

export function BorderBoxBG({ className }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "absolute inset-x-0 top-0 -z-10 h-full rounded-[inherit] bg-gradient-to-b from-white to-white opacity-5",
        className
      )}
    />
  );
}
