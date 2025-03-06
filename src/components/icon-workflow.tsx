import React, { SVGProps } from "react";

export default function IconWorkflow({
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
      {...props}
    >
      <rect width="32" height="32" rx="7" fill="#9333EA" />
      <path
        d="M8 8H24L8 16H24L8 24H24"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
