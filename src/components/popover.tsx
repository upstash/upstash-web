import type {
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "@radix-ui/react-popover";
import * as Popover from "@radix-ui/react-popover";
import React from "react";

export function PopoverRoot({ ...props }: PopoverProps) {
  return <Popover.Root {...props} />;
}

export function PopoverTrigger({ ...props }: PopoverTriggerProps) {
  return <Popover.Trigger asChild {...props} />;
}

export function PopoverContent({ children, ...props }: PopoverContentProps) {
  return (
    <Popover.Portal>
      <Popover.Content
        className="w-[260px] rounded bg-white p-5"
        sideOffset={5}
        {...props}
      >
        {children}

        <Popover.Close
          className="absolute right-1 top-1 inline-flex size-6 cursor-default items-center justify-center rounded-full outline-none hover:bg-zinc-50"
          aria-label="Close"
        >
          x
        </Popover.Close>

        <Popover.Arrow className="fill-white" />
      </Popover.Content>
    </Popover.Portal>
  );
}
