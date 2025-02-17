import cx from "@/utils/cx";
import { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement> & {
  // size?: number | string;
  icon?: keyof typeof ICON_NAMES;
  className?: string;
  title?: string;
};

export default function Icon({ icon, className, title, ...props }: IconProps) {
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
      role="icon"
      {...props}
    >
      {title && <title>{title}</title>}
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
  X = "X",
  Discord = "Discord",
  Github = "Github",
  Menu = "Menu",
  Cancel = "Cancel",
  Clipboard = "Clipboard",
}

const PATHS = {
  [ICON_NAMES.ArrowUpRight]: (
    <>
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
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
  [ICON_NAMES.X]: (
    <>
      <path
        d="M 1.550 2.749 C 2.529 4.262, 213.211 310.962, 469.731 684.304 C 726.251 1057.646, 935.989 1363.473, 935.815 1363.919 C 935.642 1364.366, 725.125 1609.227, 468 1908.056 C 210.875 2206.885, 0.350 2451.746, 0.167 2452.191 C -0.017 2452.636, 47.683 2452.970, 106.167 2452.933 L 212.500 2452.866 621.397 1977.399 C 846.291 1715.892, 1030.661 1502.059, 1031.109 1502.216 C 1031.556 1502.372, 1178.795 1716.250, 1358.306 1977.500 L 1684.690 2452.500 2042.511 2452.500 C 2347.002 2452.500, 2400.402 2452.293, 2400.796 2451.111 C 2401.051 2450.347, 2400.809 2450, 2400.259 2450.340 C 2399.709 2450.680, 2180.928 2133.215, 1914.079 1744.863 C 1483.313 1117.956, 1429.058 1038.584, 1430.303 1037.134 C 1437.836 1028.360, 2319.651 3.055, 2320.787 1.750 C 2322.236 0.085, 2317.156 0, 2215.882 0 L 2109.455 0 1722.114 450.250 C 1509.076 697.888, 1334.486 900.374, 1334.136 900.219 C 1333.786 900.065, 1194.447 697.565, 1024.493 450.219 L 715.486 0.500 357.627 0.249 L -0.232 -0.003 1.550 2.749 M 293.269 166.250 C 297.639 172.394, 869.759 990.761, 1475.271 1857 C 1644.625 2099.275, 1783.724 2298.064, 1784.382 2298.753 C 1785.332 2299.749, 1818.738 2299.954, 1947.235 2299.753 L 2108.893 2299.500 1404.900 1292.500 C 1017.704 738.650, 681.241 257.290, 657.204 222.811 L 613.500 160.122 451.162 160.061 L 288.824 160 293.269 166.250"
        stroke="none"
        fill="#040404"
        fillRule="evenodd"
      />
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
