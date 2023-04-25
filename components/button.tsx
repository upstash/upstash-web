import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";
import Icon, { ICON_NAMES, IconProps } from "@/components/icon";

export interface IButton extends HTMLProps<HTMLAnchorElement> {
  children: ReactNode;
  href: string;
  hideIcon?: boolean;
  iconProps?: IconProps;
}

export default function Button({
  children,
  className,
  hideIcon,
  iconProps,
  ...props
}: IButton) {
  return (
    <a
      target="_blank"
      className={cx(
        "flex cursor-pointer items-center gap-0.5 px-5 py-2",
        "rounded-full bg-white/5",
        "hover:bg-emerald-300 hover:text-emerald-950",
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
            "opacity-40 transition group-hover/link-new:opacity-100",
            iconProps?.className
          )}
        />
      )}
    </a>
  );
}
