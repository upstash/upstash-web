import Icon, { ICON_NAMES, IconProps } from "@/components/icon";
import cx from "@/utils/cx";
import { HTMLProps, ReactNode } from "react";

export interface IButton extends HTMLProps<HTMLAnchorElement> {
  children?: ReactNode;
  hideIcon?: boolean;
  icon?: ReactNode;
  iconProps?: IconProps;
  type?: "button" | "link";
}

export default function Button({
  children,
  className,
  hideIcon,
  icon,
  type = "link",
  iconProps,
  ...props
}: IButton) {
  const classes = {
    button: `gap-1 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-zinc-50 bg-white/5
    hover:bg-emerald-400 hover:text-emerald-950
    disabled:bg-white/5 disabled:text-zinc-50`,
    link: `gap-0.5 hover:text-emerald-400 hover:underline`,
  };

  return (
    <a
      target="_blank"
      className={cx(
        "group/link-new inline-flex cursor-pointer items-center transition",
        classes[type],
        className,
      )}
      {...props}
    >
      {children && <span>{children}</span>}
      {icon ? (
        <span className="ml-auto">{icon}</span>
      ) : hideIcon ? null : (
        <Icon
          icon={ICON_NAMES.ArrowUpRight}
          {...iconProps}
          className={cx(
            "ml-auto opacity-60",
            // "transition group-hover/link-new:opacity-100",
            iconProps?.className,
          )}
        />
      )}
    </a>
  );
}
