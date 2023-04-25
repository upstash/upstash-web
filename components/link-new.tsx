import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";
import Icon, { ICON_NAMES, IconProps } from "@/components/icon";

export interface ILinkNewTab extends HTMLProps<HTMLAnchorElement> {
  children?: ReactNode;
  hideIcon?: boolean;
  iconProps?: IconProps;
  type?: "button" | "link";
}

export default function LinkNew({
  children,
  className,
  hideIcon,
  type = "link",
  iconProps,
  ...props
}: ILinkNewTab) {
  const classes = {
    button: `gap-1 px-5 py-2 rounded-full bg-white/5
    hover:bg-emerald-300 hover:text-emerald-950`,
    link: `gap-0.5 hover:text-emerald-300 hover:underline`,
  };

  return (
    <a
      target="_blank"
      className={cx(
        "group/link-new flex cursor-pointer items-center transition",
        classes[type],
        className
      )}
      {...props}
    >
      {children && <span>{children}</span>}
      {hideIcon ? null : (
        <Icon
          icon={ICON_NAMES.ArrowUpRight}
          {...iconProps}
          className={cx(
            "opacity-40",
            // "transition group-hover/link-new:opacity-100",
            iconProps?.className
          )}
        />
      )}
    </a>
  );
}
