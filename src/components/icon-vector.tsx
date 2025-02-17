import React, { SVGProps } from "react";

export default function IconVector({
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
      aria-label="Upstash Vector"
      {...props}
    >
      <rect width="32" height="32" rx="7" fill="#F97316" />
      <path
        d="M16 16H27M16 16V5M16 16H5M16 16V27M16 16L23 9M16 16L23 23M16 16L9 9M16 16L9 23"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
