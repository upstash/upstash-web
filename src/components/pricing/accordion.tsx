import * as React from "react";

import cx from "@/utils/cx";
import * as Accordion from "@radix-ui/react-accordion";
import { IconPlus } from "@tabler/icons-react";

const AccordionItem = React.forwardRef(
  (
    props: Accordion.AccordionItemProps,
    forwardedRef: React.ForwardedRef<any>,
  ) => {
    const { children, className } = props;

    return (
      <Accordion.Item
        className={cx(
          "border-t border-t-white/5 text-left",
          "data-[state=open]:bg-emerald-400/5",
          "data-[state=open]:rounded-2xl",
          "data-[state=open]:border-t-transparent",
          // "[&_+_data-[state=closed]]:border-t-transparent",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Item>
    );
  },
);

const AccordionTrigger = React.forwardRef(
  (
    props: Accordion.AccordionTriggerProps,
    forwardedRef: React.ForwardedRef<any>,
  ) => {
    const { children, className } = props;

    return (
      <Accordion.Header className="">
        <Accordion.Trigger
          className={cx(
            "group flex w-full items-center justify-between",
            "p-6 opacity-60",
            "text-lg font-medium leading-none",
            "hover:bg-white/3",
            "data-[state=open]:text-emerald-400",
            "data-[state=open]:bg-transparent",
            "data-[state=open]:opacity-100",
            "data-[state=open]:font-semibold",
            className,
          )}
          {...props}
          ref={forwardedRef}
        >
          {children}
          <IconPlus
            strokeWidth={1.5}
            className={cx(
              "opacity-20 transition-transform",
              "group-data-[state=open]:rotate-45",
              "group-data-[state=open]:opacity-40",
            )}
          />
        </Accordion.Trigger>
      </Accordion.Header>
    );
  },
);

const AccordionContent = React.forwardRef(
  (
    props: Accordion.AccordionContentProps,
    forwardedRef: React.ForwardedRef<any>,
  ) => {
    const { children, className } = props;

    return (
      <Accordion.Content
        className={cx(
          "faq-body",
          "data-[state=open]:animate-slideDown",
          "data-[state=closed]:animate-slideUp",
          "overflow-hidden",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <span className="block space-y-4 px-6 pb-6 opacity-60">{children}</span>
      </Accordion.Content>
    );
  },
);

export { AccordionItem, AccordionTrigger, AccordionContent };
