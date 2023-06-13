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
      className={cx("inline-flex shrink-0 text-xl", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export enum ICON_NAMES {
  ArrowUpRight = "ArrowUpRight",
  ArrowRight = "ArrowRight",
  Check = "Check",
  CreditCard = "CreditCard",
  CircleCheck = "CircleCheck",
  Bolt = "Bolt",
  FileText = "FileText",
  Twitter = "Twitter",
  Discord = "Discord",
  Github = "Github",
  Menu = "Menu",
  Cancel = "Cancel",
  Clipboard = "Clipboard",
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
  [ICON_NAMES.Bolt]: (
    <>
      <polyline points="13 3 13 10 19 10 11 21 11 14 5 14 13 3" />
    </>
  ),
  [ICON_NAMES.FileText]: (
    <>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
      <line x1="9" y1="9" x2="10" y2="9" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </>
  ),
  [ICON_NAMES.Twitter]: (
    <>
      <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
    </>
  ),
  [ICON_NAMES.Discord]: (
    <>
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M7.5 7.5c3.5 -1 5.5 -1 9 0" />
      <path d="M7 16.5c3.5 1 6.5 1 10 0" />
      <path d="M15.5 17c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5" />
      <path d="M8.5 17c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.428 -11.5c1.388 -1.015 2.782 -1.34 4.237 -1.5l1 2.5" />
    </>
  ),
  [ICON_NAMES.Menu]: (
    <>
      <line x1="4" y1="8" x2="20" y2="8" />
      <line x1="4" y1="16" x2="20" y2="16" />
    </>
  ),
  [ICON_NAMES.Cancel]: (
    <>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </>
  ),
  [ICON_NAMES.Github]: (
    <>
      <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
    </>
  ),
  [ICON_NAMES.Clipboard]: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
    </>
  ),
  [ICON_NAMES.ArrowRight]: (
    <>
      <path d="M5 12l14 0" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </>
  ),
};
