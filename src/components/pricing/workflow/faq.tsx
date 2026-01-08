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
          What is a step?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              A <b>step</b> is the execution of a single workflow step in your workflow.
            </li>
            <li>
              From a billing perspective, each executed step is counted as{" "}
              <b>one billed step</b>.
            </li>
            <li>
              If a step execution fails and is retried, each retry is counted as{" "}
              <b>an additional billed step</b>.
            </li>
            <li>
              Different step types consume a different number of billed steps:
              
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <code>context.run</code>, <code>context.sleep</code>,{" "}
                  <code>context.sleepUntil</code>, and{" "}
                  <code>context.waitForEvent</code> generate <b>ONE billed step</b>.
                </li>
                <li>
                  <code>context.call</code> and <code>context.invoke</code> generate{" "}
                  <b>TWO billed steps</b>.
                </li>
                <li>
                  When steps are executed in parallel, each step generates{" "}
                  <b>ONE extra billed step</b>.
                </li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
          <AccordionTrigger>
            What happens when we hit "Steps per Day" or "Monthly Bandwidth" limit?
          </AccordionTrigger>
          <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              These are <b>soft limits</b> and apply only if you{" "}
              <b>consistently exceed</b> your quota.
            </li>
            <li>
              Short or occasional spikes will not immediately block step executions.
            </li>
            <li>
              If usage continues to exceed the limit, we will contact you to
              discuss an upgrade:
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>Fixed 1M → Fixed 10M</li>
                <li>Fixed 10M → Custom Enterprise plan</li>
              </ul>
            </li>
            <li>
              If we are unable to reach you and limits are still exceeded over time, workflow runs may start failing with quota errors.
            </li>
          </ul>
          </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          What happens when we hit daily max steps limit?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Workflow is built on top of QStash. When the daily steps limit is
            reached:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              QStash starts returning errors for step execution.
            </li>
            <li>
              The Workflow SDK throttles execution and retries after a short
              delay.
            </li>
            <li>
              If the retry limit is reached, the workflow run fails.
            </li>
            <li>
              Failed runs are recorded in the <b>DLQ (Dead Letter Queue)</b>.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>  
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Is there a rate limit ?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              There is <b>no requests-per-second (RPS) limit</b> for{" "}
              <b>Workflow execution APIs</b>.
            </li>
            <li>
              APIs used for <b>logs, messages, and other management features</b>{" "}
              do have RPS limits. When exceeded, the API returns a{" "}
              <b>429 Too Many Requests</b> error.
            </li>
            <li className="space-y-2">
              <p>
                Since Workflow execution does not have an RPS limit, QStash
                enforces a <b>Max Concurrent Steps</b> limit:
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  Workflow accepts all step executions.
                </li>
                <li>
                  If usage is too high, execution is slowed down by limiting how
                  many steps run in parallel.
                </li>
                <li>
                  Additional steps are queued and executed later.
                </li>
              </ul>
              <p className="mt-2">
                See <b>“Max Concurrent Steps”</b> in the pricing table for
                details.
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>
          How is the Max Message Size Limit applied?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              When a workflow run is triggered, if the request body exceeds the
              size limit, the API returns an HTTP <code>412</code> error.
            </li>
            <li>
              The Workflow SDK logs the error, marks the workflow run as failed,
              and records it in the <b>DLQ (Dead Letter Queue)</b>.
            </li>
            <li>
              Between steps, the Workflow SDK makes calls to QStash. Responses
              from <code>context.run</code>, <code>context.call</code>, and{" "}
              <code>context.invoke</code> are also subject to the max message size
              limit.
            </li>
            <li>
              If these responses exceed the limit, the workflow run fails and is
              recorded in the DLQ.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
