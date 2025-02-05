import cx from "@/utils/cx";
import React from "react";

/*
Example Usage:

<BigText className="xl:-mb-[70px] xl:text-[160px]">
  Let's Connect
</BigText>

 */

export default function BigText({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h5
      className={cx(
        "pointer-events-none -mb-[5vw] whitespace-nowrap xl:-mb-[70px]",
        "font-display text-[12vw] font-bold leading-tight xl:text-[160px]",
        "bg-gradient-to-br bg-clip-text text-transparent",
        "from-primary-text via-primary to-yellow-300",
        className,
      )}
    >
      {children}
    </h5>
  );
}
