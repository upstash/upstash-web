import React, { SVGProps } from "react";

export default function IconEmpty({
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
      <g clipPath="url(#logo-empty)">
        <path
          d="M24.8889 0H7.11111C3.18375 0 0 3.18375 0 7.11111V24.8889C0 28.8162 3.18375 32 7.11111 32H24.8889C28.8162 32 32 28.8162 32 24.8889V7.11111C32 3.18375 28.8162 0 24.8889 0Z"
          fill="#ffffff"
        />
      </g>
      <defs>
        <clipPath id="logo-qstash">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
