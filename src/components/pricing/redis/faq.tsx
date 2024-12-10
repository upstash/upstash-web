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
          How can I upgrade to pay as you go from free tier?
        </AccordionTrigger>
        <AccordionContent>
          Once you enter your credit card , your database will be upgraded to
          the pay-as-you-go plan and limits will be updated.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>How does the budget work?</AccordionTrigger>
        <AccordionContent>
          With the Pay As you go plan, you can set a maximum monthly budget for
          your database so that you won't be charged beyond this chosen limit.
          We'll keep you informed by sending email notifications once you reach
          70% and 90% of your monthly budget. This notifications will let you
          either adjust your budget limit or upgrade to the Pro tier. Note that
          if your usage exceeds your monthly budget cap, your database will be
          rate limited and your cost will not exceed your chosen budget limit.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          Are all Redis commands counted in billing?
        </AccordionTrigger>
        <AccordionContent>
          Operational commands like AUTH, INFO, PING, QUIT, COMMAND will not be
          charged.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          Are read and write commands same price?
        </AccordionTrigger>
        <AccordionContent>
          Yes. But for Global databases, the write commands are replicated to
          all read regions in addition to primary region. Replications (write
          operations) are also counted as commands. For example, if you have 1
          primary 1 read region, 100K writes will cost $0.4 ($0.2 x 2)
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>How is the storage cost calculated?</AccordionTrigger>
        <AccordionContent>
          The storage cost is charged at a rate of $0.25 per GB total storage.
          Total storage is determined by adding up the storage at all replicas
          and regions. Even if you do not access your data, we have to keep it
          persistent in Cloud Provider’s block storage (eg AWS EBS, S3) for
          durability. To calculate the total storage cost, we take daily average
          of your total data size in all replicase and multiply with $0.25 at
          the end of the month. For instance, if you have 1 GB data in your
          replicas throughout month, you will pay $0.25. If you are using your
          database as a cache; then it is a good practice to set a timeout
          (EXPIRE) for your keys to minimize the cost.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>Are there free trials?</AccordionTrigger>
        <AccordionContent>
          Yes, we can provide free trials for Pro and Enterprise plans for
          testing and PoC purposes. Email us at{" "}
          <a href="sales@upstash.com">sales@upstash.com</a>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>How many databases can I create?</AccordionTrigger>
        <AccordionContent>
          You can create up to 10 databases for free and beyond this you will be
          charged $0.5 per database up to 100 databases.
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
            GB for all the usage throughout the month up to the plan's limit.
            Any usage beyond that is charged at a rate of $0.10 per GB. For use
            cases with high volume, you may consider VPC Peering which minimizes
            the data transfer cost. Contact us at{" "}
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
          Is there a contract requirement for Pro databases?
        </AccordionTrigger>
        <AccordionContent>
          There is no requirement for long-term contracts as the minimum term is
          just one month, and you have the flexibility to cancel anytime. But
          note that even if you cancel within the month, you will be billed for
          the minimum term of 1 full month.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10">
        <AccordionTrigger>
          How is the Enterprise subscription priced?
        </AccordionTrigger>
        <AccordionContent>
          For Enterprise subscription, a custom price is set based on specific
          requirements of the customer. For more information email us at{" "}
          <a href="sales@upstash.com">sales@upstash.com</a>
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
