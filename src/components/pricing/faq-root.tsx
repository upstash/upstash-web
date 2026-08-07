"use client";

import { trackEvent } from "@/lib/analytics";
import * as Accordion from "@radix-ui/react-accordion";
import { ReactNode, useRef } from "react";

export default function FAQRoot({
  product,
  children,
}: {
  product: string;
  children: ReactNode;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <Accordion.Root
      ref={rootRef}
      className="faq"
      type="single"
      collapsible
      onValueChange={(value) => {
        if (!value) {
          return;
        }
        // Radix applies data-state="open" on re-render, after this callback,
        // so read the opened trigger's text afterwards. setTimeout rather than
        // requestAnimationFrame: rAF never fires while the tab is hidden.
        setTimeout(() => {
          const question = rootRef.current
            ?.querySelector('button[data-state="open"]')
            ?.textContent?.trim();
          trackEvent("faq_open", { product, question: question || value });
        });
      }}
    >
      {children}
    </Accordion.Root>
  );
}
