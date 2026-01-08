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
          How are messages priced? Are retries free?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Each <b>delivery attempt</b> counts as one message.
            </li>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                The initial delivery counts as one message.
              </li>
              <li>
                In case of retries, each retry is counted as an additional message.
              </li>  
            </ul>
            
          </ul>

          
          <ul className="mt-2 list-disc space-y-2 pl-6">
            <li>
              <p>The same rules apply to <b>topics</b> and <b>schedules</b>:</p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  Publishing to a topic is billed once per subscribed endpoint to the topic.
                </li>
                <li>
                  Scheduled messages are billed once for each time the schedule
                  triggers.
                </li>
              </ul>
            </li>
            <li>
              In short: <b>one delivery attempt to one endpoint equals one billed message</b>.
            </li>
            <li>
              <b>Example:</b> QStash sends a message to your endpoint, but the endpoint
            returns an error. QStash retries the delivery and it succeeds. Since there
            were two delivery attempts, the message is billed as <b>2 messages</b>.
            </li>
          </ul>
          
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          What happens if we exceed the “Messages per Day” or “Monthly Bandwidth”
          limit?
        </AccordionTrigger>
        <AccordionContent>
          
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              These are <b>soft limits</b> and apply only if you{" "}<b>consistently exceed</b> your quota.
            </li>
            <li>
              Short or occasional spikes will NOT immediately block your
              requests.
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
              If we are unable to reach you and limits are still exceeded over time, the API may start returning{" "}<b>429 rate limit errors</b>.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          How is the Max Message Size limit applied?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li className="space-y-2">
              <p>The size limit applies to <b>both requests and responses</b>:</p>

              <p><b>Request body:</b></p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  If the request body sent to QStash exceeds
                  the limit, the API returns an HTTP <code>412</code> error.
                </li>
                <li>
                  When using the <code>/v2/batch</code> endpoint, each request in
                  the batch is checked <b>individually</b>.
                </li>
              </ul>
              <p><b>Response body:</b></p>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                   If the response from your endpoint
                  exceeds the limit, it is trimmed and stored <b>only for logging
                  and debugging purposes</b> (DLQ/Events).
                </li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          Is there a rate limit?
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
            There is no requests-per-second (RPS) limit for message delivery APIs, such as:  
              <ul className="mt-4 list-disc space-y-2 pl-6">
                <li>
                  Publish
                </li>
                <li>
                  Enqueue
                </li>
                <li>
                  Batch
                </li>  
              </ul>
            </li>  
            <li>
              APIs used for observability and management (such as logs and DLQ) do have RPS limits.
              When exceeded, the API returns a{" "}
              <b>429 Too Many Requests</b> error.
            </li>
            <li>
              Since message delivery APIs do not have an RPS limit, QStash
                enforces a <b>Max Parallelism</b> limit:
                <ul className="mt-2 list-disc space-y-2 pl-6">
                  <li>QStash accepts all message publish requests.</li>
                  <li>
                    If the publish rate is too high, QStash slows down delivery by limiting
                    how many messages are sent in parallel.
                  </li>
                  <li>
                    Additional messages are queued and delivered later, but they are not lost.
                  </li>
                </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
