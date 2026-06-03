import cx from "@/utils/cx";
import * as Accordion from "@radix-ui/react-accordion";
import { IconPlus } from "@tabler/icons-react";
import * as React from "react";

const AccordionItem = React.forwardRef(
  (
    props: Accordion.AccordionItemProps,
    forwardedRef: React.ForwardedRef<any>,
  ) => {
    const { children, className } = props;

    return (
      <Accordion.Item
        className={cx(
          "border-t border-t-bg-mute text-left",
          "data-[state=open]:bg-bg-mute",
          "data-[state=open]:rounded-2xl",
          "data-[state=open]:border-t-transparent",
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
            "p-6",
            "text-lg font-medium leading-none",
            "data-[state=open]:pb-3",
            "data-[state=open]:text-primary-text",
            "data-[state=open]:opacity-100",
            "data-[state=open]:font-semibold",
            className,
          )}
          {...props}
          ref={forwardedRef}
        >
          <span className="text-left leading-relaxed text-pretty">{children}</span>
          <IconPlus
            strokeWidth={1.5}
            className={cx(
              "opacity-40 transition-transform",
              "group-data-[state=open]:rotate-45",
              "group-data-[state=open]:opacity-80",
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
      // forceMount keeps the answer in the DOM (and server HTML) even while
      // collapsed, so crawlers index it and it matches the FAQPage structured
      // data. The grid-rows trick animates height without unmounting content.
      <Accordion.Content
        forceMount
        className={cx(
          "faq-body grid overflow-hidden transition-all duration-300 ease-out",
          "data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        <span className="block min-h-0 overflow-hidden">
          <span className="block space-y-4 px-6 pb-6">{children}</span>
        </span>
      </Accordion.Content>
    );
  },
);

export { AccordionItem, AccordionTrigger, AccordionContent };
