"use client";

import * as Accordion from "@radix-ui/react-accordion";
import * as React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

export default function FAQ() {
  return (
    <Accordion.Root className="faq" type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Can I use Upstash Search in production?
        </AccordionTrigger>
        <AccordionContent>
          The current version of Upstash Search is in Preview/Early Access. We
          do not guarantee the uptime SLAs for this service for now. So you can
          use it on your own risk.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-1">
        <AccordionTrigger>
          How can I upgrade to pay as you go from free tier?
        </AccordionTrigger>
        <AccordionContent>
          Once you enter your credit card , your database will be upgraded to
          the pay-as-you-go plan and limits will be updated.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          What is the max limit (topk) for queries?
        </AccordionTrigger>
        <AccordionContent>1000 is the default limit for topk.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          In payg billing, what is counted as a query?
        </AccordionTrigger>
        <AccordionContent>
          Search and upsert requests are counted as billing requests. Reranking
          requests have a separate billing.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          What is reranking? When should I use it?
        </AccordionTrigger>
        <AccordionContent>
          It is a feature that re-ranks the results of a query using LLM models.
          It is useful for improving the quality of the results. You can enable
          it when you are not happy with the results of the default ranking.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          Are search and upsert requests same price?
        </AccordionTrigger>
        <AccordionContent>Yes.</AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>Are there free trials?</AccordionTrigger>
        <AccordionContent>
          Yes, we can provide free trials for Pro and Enterprise plans for
          testing and PoC purposes. Email us at{" "}
          <a href="support@upstash.com">support@upstash.com</a>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>
          How much is the price for bandwidth?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            We don't charge for bandwidth separately. It is included in the
            query based price.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>How many collections can I create?</AccordionTrigger>
        <AccordionContent>
          You can create up to 10 collections for free and beyond this you will
          be charged $1 per collection up to 100 collections.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>How many indexes can I create?</AccordionTrigger>
        <AccordionContent>
          You can create up to 10,000 indexes in a single collection.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>How many documents can I create?</AccordionTrigger>
        <AccordionContent>
          You can create as many documents as possible within pay-as-you-go
          plan's max data size limit which is 50GB. If you need more, please
          contact us at <a href="support@upstash.com">support@upstash.com</a>.
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
