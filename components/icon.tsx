import { ReactNode, SVGProps } from "react";
import cx from "@/utils/cx";

export type IconProps = SVGProps<SVGSVGElement> & {
  // size?: number | string;
  icon?: keyof typeof ICON_NAMES;
  className?: string;
};

export default function Icon({ icon, className, ...props }: IconProps) {
  const children: ReactNode = icon
    ? PATHS[icon]
    : PATHS[ICON_NAMES.ArrowUpRight];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      className={cx("text-xl", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export enum ICON_NAMES {
  ArrowUpRight = "ArrowUpRight",
  Check = "Check",
  CreditCard = "CreditCard",
  CircleCheck = "CircleCheck",
}

const PATHS = {
  [ICON_NAMES.ArrowUpRight]: (
    <>
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </>
  ),
  [ICON_NAMES.Check]: (
    <>
      <path d="M5 12l5 5l10 -10" />
    </>
  ),
  [ICON_NAMES.CreditCard]: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="7" y1="15" x2="7.01" y2="15" />
      <line x1="11" y1="15" x2="13" y2="15" />
    </>
  ),
  [ICON_NAMES.CircleCheck]: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2l4 -4" />
    </>
  ),
};
