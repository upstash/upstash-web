"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/pricing/accordion";
import * as Accordion from "@radix-ui/react-accordion";

/**
 * Expandable FAQ list using the shared pricing accordion. The accordion's
 * `forceMount` keeps every answer in the server HTML (crawlable) even while
 * collapsed, matching the FAQPage structured data.
 */
export default function FaqAccordion({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <Accordion.Root className="faq" type="single" collapsible>
      {items.map(({ question, answer }, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionContent>{answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion.Root>
  );
}
