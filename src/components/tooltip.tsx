import * as Tooltip1 from "@radix-ui/react-tooltip";
import React from "react";

const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Tooltip1.Provider delayDuration={0}>
      <Tooltip1.Root>
        <Tooltip1.Trigger>{children}</Tooltip1.Trigger>

        <Tooltip1.Portal>
          <Tooltip1.Content
            className="max-w-xl select-none rounded-xl bg-white p-4 text-zinc-950 drop-shadow-2xl will-change-[transform,opacity]"
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
