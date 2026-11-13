"use client";

import * as React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";
import FAQRoot from "../faq-root";

export default function FAQ() {
  return (
    <FAQRoot product="box">
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
            usage, no charges apply. Keep-alive boxes are billed at a fixed rate
            per hour by size instead.
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
              Keep-alive boxes stay on continuously and are billed at a fixed
              rate per hour by size instead of auto-pause behavior.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>How much do Keep Alive boxes cost?</AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Keep Alive boxes are billed for the time they exist, at a fixed rate
            by size, billed per second. This is the only charge for that Keep
            Alive box, so you are not billed separately for CPU or storage on
            it.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              <b>Small</b> Keep Alive box: <b>$0.0111/hour</b>
            </li>
            <li>
              <b>Medium</b> Keep Alive box: <b>$0.0222/hour</b>
            </li>
            <li>
              <b>Large</b> Keep Alive box: <b>$0.0444/hour</b>
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
            data on disk, including snapshots. Storage limits are <b>10 GB</b>{" "}
            for Small, <b>20 GB</b> for Medium, and <b>30 GB</b> for Large.
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
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7">
        <AccordionTrigger>How is model usage billed?</AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Agents use your own model provider key (Anthropic, OpenAI,
              OpenRouter, ...). Set it on the box or save it on your account.
              Upstash does not provide or bill model usage.
            </li>
            <li>
              Agent runs, scheduled runs and browser AI calls need a key. Shell,
              files, git, SSH, previews and browser CDP work without one.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8">
        <AccordionTrigger>
          Can I run more than 1,000 concurrent boxes?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Yes. The default quota for Pay as you go is{" "}
            <b>1,000 concurrent boxes</b>. This is a soft limit that can be
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
    </FAQRoot>
  );
}
