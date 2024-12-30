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
      <rect width="32" height="32" rx="7" fill="currentColor" />
    </svg>
  );
}
