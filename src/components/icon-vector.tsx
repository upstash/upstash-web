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
      <circle cx="23" cy="23" r="4" fill="white" />
      <circle cx="9" cy="23" r="4" fill="white" />
      <circle cx="9" cy="9" r="4" fill="white" />
      <circle cx="23" cy="9" r="4" fill="white" />
      <path
        d="M9 23L23 9M9 23H23M9 23V9"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
