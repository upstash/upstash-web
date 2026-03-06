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
      <AccordionItem value="item-2">
        <AccordionTrigger>
          What does &quot;active CPU hour&quot; mean?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            You are billed based on how much CPU your code actually consumes,
            measured in core-hours. For example, using 100% of 2 cores for one
            hour costs <b>$0.2</b>, while using 10% of a single core for one
            hour costs <b>$0.01</b>. When a box is idle with no CPU usage, no
            charges apply.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          What happens when a box is idle?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              After <b>30 minutes</b> of inactivity, the box is automatically
              frozen. Storage is preserved, but all running processes are stopped.
            </li>
            <li>
              When a new request comes in, the box <b>wakes up automatically</b>,
              similar to how AWS Lambda cold-starts on demand. No manual
              intervention is needed.
            </li>
            <li>
              You are only charged for the CPU time your code actually uses.
              If the box is idle with no CPU usage, there is no CPU charge.
              Storage charges still apply at <b>$0.1 per GB per month</b>.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          What is included in storage billing?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Storage is billed at <b>$0.1 per GB per month</b> and includes all
            data on disk, including snapshots. The maximum storage per box is{" "}
            <b>10 GB</b> for the Small box type.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          What are the free tier limits?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Up to <b>10 concurrent boxes</b>.
            </li>
            <li>
              <b>5 CPU hours</b> per month.
            </li>
            <li>
              <b>$1</b> of LLM token usage per month. After that, the API
              returns <code>400 Bad Request</code>.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          How does LLM token usage work?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Each box includes Upstash-provided LLM token usage for the
              built-in AI agent. On the Free plan, this is capped at{" "}
              <b>$1 per month</b>. On Pay as you go, the cap is{" "}
              <b>$100 per month</b>.
            </li>
            <li>
              After the limit is reached, you can either contact us to
              increase it or bring your own key (BYOK).
            </li>
            <li>
              You can also <b>bring your own key (BYOK)</b> for any LLM
              provider, which is available on all plans.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>

          Can I run more than 100 concurrent boxes?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Yes. The default quota for Pay as you go is <b>100 concurrent
            boxes</b>. This is a soft limit that can be increased on request,
            similar to AWS service quotas. Just contact us and we&apos;ll raise
            your limit.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>
          Where are boxes hosted?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Boxes currently run on <b>AWS us-east-1</b>. We are planning to add
            more regions soon.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-9">
        <AccordionTrigger>
          Can I use my own Docker container?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Yes, custom Docker container support is planned and coming soon.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
