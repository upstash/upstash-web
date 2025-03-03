import React, { SVGProps } from "react";

export default function IconQStash({
  width = 36,
  ...props
}: SVGProps<SVGSVGElement>) {
  const height = props.height || width;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Upstash QStash"
      {...props}
    >
      <rect width="32" height="32" rx="7" fill="#2563EB" />
      <path
        d="M16 16H26M16 16V6M16 16H6M16 16V26M16 16L22.3636 9.63636M16 16L22.3636 22.3636M16 16L9.63636 9.63636M16 16L9.63636 22.3636"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
