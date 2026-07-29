import { trackEvent } from "@/lib/analytics";
import * as Tooltip1 from "@radix-ui/react-tooltip";
import React, { useRef, useState } from "react";

const Tooltip = ({
  children,
  content,
  label,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
  label?: string;
}) => {
  const [open, setOpen] = useState(false);
  // Radix and our own onClick can both open the tooltip within one event, and
  // both would still see the pre-render `open === false`. A ref updates
  // synchronously, so the event only fires once.
  const openRef = useRef(false);

  const handleOpenChange = (nextOpen: boolean) => {
    const wasOpen = openRef.current;
    openRef.current = nextOpen;

    if (nextOpen && !wasOpen) {
      const resolvedLabel =
        typeof content === "string" ? content.slice(0, 80) : label;
      trackEvent("tooltip_open", {
        ...(resolvedLabel ? { label: resolvedLabel } : {}),
        page: window.location.pathname,
      });
    }
    setOpen(nextOpen);
  };

  return (
    <Tooltip1.Provider>
      <Tooltip1.Root
        open={open}
        delayDuration={200}
        onOpenChange={handleOpenChange}
      >
        <Tooltip1.Trigger
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleOpenChange(true);
          }}
          className="text-left underline decoration-primary-text decoration-dashed underline-offset-2"
        >
          {children}
        </Tooltip1.Trigger>

        <Tooltip1.Portal>
          <Tooltip1.Content
            className="max-w-xl rounded-xl bg-white p-4 text-zinc-950 drop-shadow-2xl will-change-[transform,opacity]"
            sideOffset={5}
          >
            {content}

            <Tooltip1.Arrow className="h-2 w-4 fill-white" />
          </Tooltip1.Content>
        </Tooltip1.Portal>
      </Tooltip1.Root>
    </Tooltip1.Provider>
  );
};

export default Tooltip;
