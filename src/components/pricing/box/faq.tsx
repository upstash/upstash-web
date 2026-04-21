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
            hour costs <b>$0.01</b>. When a standard box is idle with no CPU
            usage, no charges apply. Keep-alive boxes use fixed monthly pricing
            by size instead.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What happens when a box is idle?</AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Standard boxes automatically freeze after inactivity. Storage is
              preserved, but running processes are stopped until the next
              request.
            </li>
            <li>
              When a new request comes in, the box <b>wakes up automatically</b>
              , similar to how AWS Lambda cold-starts on demand. No manual
              intervention is needed.
            </li>
            <li>
              Keep-alive boxes stay on continuously and use fixed monthly
              pricing by size instead of auto-pause behavior.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How much do Keep Alive boxes cost?</AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Keep Alive boxes are billed with a fixed monthly price by size. This
            is the only charge for that Keep Alive box, so you are not billed
            separately for CPU or storage on it.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <b>Small</b> Keep Alive box: <b>$8/month</b>
            </li>
            <li>
              <b>Medium</b> Keep Alive box: <b>$16/month</b>
            </li>
            <li>
              <b>Large</b> Keep Alive box: <b>$32/month</b>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          What is included in storage billing?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Storage is billed at <b>$0.1 per GB per month</b> and includes all
            data on disk, including snapshots. Storage limits are <b>5 GB</b>{" "}
            for Small, <b>10 GB</b> for Medium, and <b>20 GB</b> for Large.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>What are the free tier limits?</AccordionTrigger>
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
      <AccordionItem value="item-7">
        <AccordionTrigger>How does LLM token usage work?</AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Each box includes Upstash-provided LLM token usage for the
              built-in AI agent. On the Free plan, this is capped at{" "}
              <b>$1 per month</b>. On Pay as you go, the cap is{" "}
              <b>$100 per month</b>.
            </li>
            <li>
              After the limit is reached, you can either contact us to increase
              it or bring your own key (BYOK).
            </li>
            <li>
              You can also <b>bring your own key (BYOK)</b> for any LLM
              provider, which is available on all plans.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>
          Can I run more than 100 concurrent boxes?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Yes. The default quota for Pay as you go is{" "}
            <b>100 concurrent boxes</b>. This is a soft limit that can be
            increased on request, similar to AWS service quotas. Just contact us
            and we&apos;ll raise your limit.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-9">
        <AccordionTrigger>Where are boxes hosted?</AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Boxes currently run on <b>AWS us-east-1</b>. We are planning to add
            more regions soon.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-10">
        <AccordionTrigger>Can I use my own Docker container?</AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Yes, custom Docker container support is planned and coming soon.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
