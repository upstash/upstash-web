import React from "react";
import * as Tooltip1 from "@radix-ui/react-tooltip";

const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => {
  return (
    <Tooltip1.Provider>
      <Tooltip1.Root>
        <Tooltip1.Trigger asChild>
          <span className="underline decoration-dashed decoration-zinc-500">
            {children}
          </span>
        </Tooltip1.Trigger>

        <Tooltip1.Portal>
          <Tooltip1.Content
            className="
            data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade
            data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade
            data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade
            data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade
            text-zinc-950 select-none rounded-[4px] bg-white px-[15px] py-[10px]
            leading-none will-change-[transform,opacity] max-w-2xl"
            sideOffset={5}
          >
            {content}

            <Tooltip1.Arrow className="fill-white" />
          </Tooltip1.Content>
        </Tooltip1.Portal>
      </Tooltip1.Root>
    </Tooltip1.Provider>
  );
};

export default Tooltip;
