import * as React from "react";

import * as Accordion from "@radix-ui/react-accordion";

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
          How can I upgrade to pay as you go from free tier?
        </AccordionTrigger>
        <AccordionContent>
          Once you enter your credit card , your index will be upgraded to
          the pay-as-you-go plan and limits will be updated.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          What is the limit for topk?
        </AccordionTrigger>
        <AccordionContent>
          1000 is the default limit for topk.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          Are query and upsert requests same price?
        </AccordionTrigger>
        <AccordionContent>
          Yes. 
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>How is the storage cost calculated?</AccordionTrigger>
        <AccordionContent>
          The storage cost is charged at a rate of $0.25 per GB total storage.
          Even if you do not access your data, we have to keep it
          persistent in Cloud Provider’s block storage (eg AWS EBS, S3) for
          durability. To calculate the total storage cost, we take daily average
          of your data size and multiply with $0.25 at the end of the month. For
          instance, if you have 1 GB data in your index throughout month, you
          will pay $0.25.
        </AccordionContent>
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
            For pay is you go plan, it is free up to monthly bandwidth limit of
            200GB. Beyond that, we charge $0.03 for each additional GB data
            transfer.
          </p>
          <p>
            For Pro and Enterprise plans, it is charged at a rate of $0.03 per
            GB for all the usage throughout the month. For use cases with high
            volume, you may consider VPC Peering which minimizes the data
            transfer cost. Contact us at{" "}
            <a href="support@upstash.com">support@upstash.com</a> for details.
          </p>
          <p>
            Price can change depending on cloud provider's fee for the incoming
            traffic. $0.03 is when the client is in the same region.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9">
        <AccordionTrigger>
          Is there a contract requirement for Pro Plans?
        </AccordionTrigger>
        <AccordionContent>
          There is no requirement for long-term contracts as the minimum term is
          just one month, and you have the flexibility to cancel anytime. But
          note that even if you cancel within the month, you will be billed for
          the minimum term of 1 full month.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>How many indexes can I create?</AccordionTrigger>
        <AccordionContent>
          You can create up to 10 indexes for free and beyond this you will be
          charged $0.5 per index up to 100 databases.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-11">
        <AccordionTrigger>
          Do you have the Professional Support plan?
        </AccordionTrigger>
        <AccordionContent>
          Professional support includes a dedicated service desk along and a
          Slack/Discord channel with a committed response time SLA. Check{" "}
          <a href="https://upstash.com/docs/common/help/prosupport">
            https://upstash.com/docs/common/help/prosupport
          </a>{" "}
          for details.
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
