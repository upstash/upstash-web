import { ReactNode, SVGProps } from "react";
import cx from "@/utils/cx";

export type IconProps = SVGProps<SVGSVGElement> & {
  // size?: number | string;
  icon: keyof typeof ICON_NAMES;
  className?: string;
};

export default function Icon({ icon, className, ...props }: IconProps) {
  const children: ReactNode = PATHS[icon];

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
      className={cx("text-2xl", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export enum ICON_NAMES {
  ArrowUpRight = "ArrowUpRight",
}

const PATHS = {
  [ICON_NAMES.ArrowUpRight]: (
    <>
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </>
  ),
};
