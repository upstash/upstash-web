import { HTMLProps } from "react";
import cx from "@/utils/cx";
import LinkNew from "@/components/link-new";

export function BorderBox({ children, className }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "rounded-[2.2rem] bg-gradient-to-b from-white/10 to-transparent p-px",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BorderBoxBody({
  children,
  className,
}: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cx(
        "group/box-body relative h-full rounded-[inherit] bg-zinc-900 p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BorderBoxBodyTitle({
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
          <LinkNew
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

export function BorderBoxBodySummary({
  children,
  className,
}: HTMLProps<HTMLParagraphElement>) {
  return <p className={cx("mt-3 opacity-60", className)}>{children}</p>;
}
