import { HTMLProps, ReactNode } from "react";
import cx from "@/utils/cx";
import Icon, { ICON_NAMES } from "@/components/icon";

export interface ILinkNewTab extends HTMLProps<HTMLAnchorElement> {
  children: ReactNode;
  hideIcon?: boolean;
}

export default function LinkNewTab({
  children,
  className,
  hideIcon,
  ...props
}: ILinkNewTab) {
  return (
    <a
      target="_blank"
      className={cx(
        "group flex items-center gap-0.5",
        "hover:text-emerald-300 hover:underline",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {hideIcon ? null : (
        <Icon
          className="group-hover: opacity-40"
          icon={ICON_NAMES.ArrowUpRight}
        />
      )}
    </a>
  );
}
