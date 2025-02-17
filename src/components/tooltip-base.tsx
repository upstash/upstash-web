import cx from "@/utils/cx";
import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

export function TooltipRoot({ children, ...props }: Tooltip.TooltipProps) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root {...props}>{children}</Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function TooltipTrigger({
  className,
  ...props
}: Tooltip.TooltipTriggerProps) {
  return <Tooltip.Trigger className={cx("", className)} {...props} />;
}

export function TooltipContent({
  children,
  className,
  ...props
}: Tooltip.TooltipContentProps) {
  return (
    <Tooltip.Portal>
      <Tooltip.Content
        className={cx(
          "max-w-[360px] select-none rounded-xl bg-white p-4 text-zinc-950",
          "drop-shadow-2xl will-change-[transform,opacity]",
          className,
        )}
        sideOffset={5}
        {...props}
      >
        {children}

        <Tooltip.Arrow className="h-2 w-4 fill-white" />
      </Tooltip.Content>
    </Tooltip.Portal>
  );
}
