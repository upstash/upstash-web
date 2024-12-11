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
      <circle cx="16" cy="16" r="4" fill="white" />
      <circle cx="26" cy="16" r="3" fill="white" />
      <circle cx="16" cy="26" r="3" fill="white" />
      <circle
        cx="23.0711"
        cy="23.0711"
        r="3"
        transform="rotate(-45 23.0711 23.0711)"
        fill="white"
      />
      <circle
        cx="23.0711"
        cy="8.92893"
        r="3"
        transform="rotate(-135 23.0711 8.92893)"
        fill="white"
      />
      <circle cx="6" cy="16" r="3" fill="white" />
      <circle cx="16" cy="6" r="3" fill="white" />
      <circle
        cx="8.92893"
        cy="8.92893"
        r="3"
        transform="rotate(-45 8.92893 8.92893)"
        fill="white"
      />
      <circle
        cx="8.92893"
        cy="23.0711"
        r="3"
        transform="rotate(-135 8.92893 23.0711)"
        fill="white"
      />
    </svg>
  );
}
