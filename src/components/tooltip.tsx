import * as Tooltip1 from "@radix-ui/react-tooltip";
import React, { useState } from "react";

const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip1.Provider>
      <Tooltip1.Root open={open} delayDuration={200} onOpenChange={setOpen}>
        <Tooltip1.Trigger
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
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
