import React, { HTMLProps, PropsWithChildren } from "react";

import cx from "@/utils/cx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { IconChevronDown } from "@tabler/icons-react";

export default function NewNavigationRoot({ children }: PropsWithChildren) {
  return (
    <NavigationMenu.Root className="relative z-50 col-span-4 flex w-full items-center justify-center">
      <NavigationMenu.List className="flex items-center">
        {children}

        <NavigationMenu.Indicator
          className={cx(
            "z-[1] flex h-[10px] items-end justify-center overflow-hidden",
            "data-[state=visible]:animate-fadeIn",
            "data-[state=visible]:animate-fadeIn",
            "data-[state=hidden]:animate-fadeOut",
            "transition-[width,transform_250ms_ease]",
          )}
        >
          <svg
            className="text-white"
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.0001 10L11.4143 1.4142C10.6332 0.633156 9.36691 0.633157 8.58586 1.4142L0 10H20.0001Z"
              fill="currentColor"
            />
          </svg>
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="perspective-[2000px] absolute left-0 top-full flex w-full justify-center">
        <NavigationMenu.Viewport
          className={cx(
            "relative mt-[8px] w-full bg-white text-zinc-900",
            "origin-[top_center] overflow-hidden rounded-xl",
            "transition-[width,_height] duration-300",
            "data-[state=open]:animate-scaleIn",
            "data-[state=open]:animate-scaleIn",
            "data-[state=closed]:animate-scaleOut",
            "w-[var(--radix-navigation-menu-viewport-width)]",
            "h-[var(--radix-navigation-menu-viewport-height)]",
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}

export function NewNavigationTrigger({ children }: PropsWithChildren) {
  return (
    <NavigationMenu.Trigger
      className={cx(
        "group flex select-none items-center gap-0.5",
        "rounded-full px-3 py-2 hover:bg-white/10",
        "data-[state=open]:bg-white/10",
      )}
    >
      {children}
      <IconChevronDown
        width={15}
        height={15}
        className={cx(
          "duration opacity-60 transition-transform ease-in",
          "group-data-[state=open]:-rotate-180",
        )}
        strokeWidth={1.5}
      />
    </NavigationMenu.Trigger>
  );
}

export function NewNavigationContent({
  children,
  ...props
}: PropsWithChildren) {
  return (
    <NavigationMenu.Content
      // forceMount
      className={cx(
        "data-[motion=from-start]:animate-enterFromLeft",
        "data-[motion=from-end]:animate-enterFromRight",
        "data-[motion=to-start]:animate-exitToLeft",
        "data-[motion=to-end]:animate-exitToRight",
        "absolute left-0 top-0 w-auto",
      )}
      {...props}
    >
      {children}
    </NavigationMenu.Content>
  );
}

interface ListItemProps extends HTMLProps<HTMLAnchorElement> {
  icon?: React.ReactNode;
}

const ListItem = React.forwardRef(
  (props: ListItemProps, forwardedRef: React.ForwardedRef<any>) => {
    const { children, className, title, icon } = props;

    return (
      <NavigationMenu.Link asChild>
        <a
          className={cx(
            "flex select-none items-center gap-4 rounded-xl p-4",
            "hover:bg-emerald-400/10",
            className,
          )}
          {...props}
          ref={forwardedRef}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black/5">
            {icon}
          </div>
          <div>
            <h4 className="font-semibold">{title}</h4>
            <p className="opacity-60">{children}</p>
          </div>
        </a>
      </NavigationMenu.Link>
    );
  },
);

export { ListItem };
