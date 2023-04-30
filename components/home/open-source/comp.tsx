import {
  Children,
  cloneElement,
  HTMLProps,
  ReactElement,
  ReactNode,
} from "react";
import cx from "@/utils/cx";
import { Category } from "./index";
import Icon, { ICON_NAMES } from "@/components/icon";

export function SourceBox({
  children,
  className,
  href,
  category,
  ...props
}: HTMLProps<HTMLAnchorElement> & {
  children: ReactNode;
  category?: Category;
  href?: string;
}) {
  const childs: ReactNode[] = Children.map(
    // @ts-ignore
    children,
    (child: ReactElement) => {
      return cloneElement(child, {
        ...child.props,
        category,
        href,
      });
    }
  );

  return (
    <a
      target="_blank"
      className={cx(
        "group/source-box flex flex-col rounded-2xl p-8",
        "bg-white/5 backdrop-blur transition",
        "hover:scale-[1.02] hover:bg-white/10",
        className
      )}
      href={href}
      {...props}
    >
      {childs}
    </a>
  );
}

export function SourceTitle({
  children,
  className,
  ...props
}: HTMLProps<HTMLHeadingElement> & {
  children: ReactNode;
  category?: Category;
  href?: string;
}) {
  return (
    <h5
      className={cx(
        "flex items-center gap-2 font-display text-xl font-medium",
        className
      )}
      {...props}
    >
      {children}
      {props.href && (
        <span
          className={cx(
            "translate-y-1/4 opacity-0 transition",
            "group-hover/source-box:translate-y-0 group-hover/source-box:opacity-100",
            props.category === Category.SDK && "text-emerald-400",
            props.category === Category.Template && "text-yellow-400",
            props.category === Category.Integration && "text-pink-400"
          )}
        >
          <Icon icon={ICON_NAMES.ArrowUpRight} className="text-2xl" />
        </span>
      )}
    </h5>
  );
}

export function SourceDesc({
  children,
  className,
  ...props
}: HTMLProps<HTMLParagraphElement> & {
  children: ReactNode;
}) {
  return (
    <p className={cx("mt-1 grow opacity-40", className)} {...props}>
      {children}
    </p>
  );
}

export function SourceTag({
  children,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  children: ReactNode;
  category?: Category;
}) {
  return (
    <div
      className={cx(
        "-mb-1 mt-3 inline-flex items-center gap-2 self-start rounded-full px-2 py-1 text-sm opacity-80",
        props.category === Category.SDK && "bg-emerald-300/10 text-emerald-300",
        props.category === Category.Template &&
          "bg-yellow-300/10 text-yellow-200",
        props.category === Category.Integration &&
          "bg-pink-300/10 text-pink-300",
        className
      )}
      {...props}
    >
      <span className={cx("inline-flex h-3 w-3 rounded-full bg-current")} />
      {children}
    </div>
  );
}
