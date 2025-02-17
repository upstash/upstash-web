import cx from "@/utils/cx";
import { Slot } from "@radix-ui/react-slot";
import { IconArrowUpRight } from "@tabler/icons-react";
import React from "react";

export interface OutLinkProps extends React.ComponentProps<"a"> {
  icon?: React.ReactNode;
  asChild?: boolean;
}

export default function OutLink({
  children,
  className,
  asChild,
  icon,
  ...props
}: OutLinkProps) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      target="_blank"
      className={cx(
        "group inline-flex items-center gap-1 hover:text-primary hover:underline",
        className,
      )}
      {...props}
    >
      {children}
      {icon ? (
        icon
      ) : (
        <IconArrowUpRight
          size={16}
          className="opacity-50 group-hover:opacity-100"
        />
      )}
    </Comp>
  );
}
