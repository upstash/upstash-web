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
          How are the messages priced? Are retries free?
        </AccordionTrigger>
        <AccordionContent>
          <p>
            Retries are also charged as messages. Below are some message
            examples:
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li className="space-y-2">
              <p>
                <b>
                  Publish to single API endpoint, it succeeds after single
                  retry. Here you would be charged for 2 messages
                </b>
              </p>

              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  You make a request to <code>/v2/publish/[your-api-url]</code>
                </li>
                <li>
                  We make an HTTP request to your API and it returns a 500
                  status code
                </li>
                <li>
                  After some time we retry to deliver the message and it
                  succeeds
                </li>
              </ol>
            </li>

            <li>
              <b>Schedule triggered “Every hour”;</b> at the end of the month
              this would be around <code>24 * 30 = 720</code> billed messages.
            </li>

            <li className="space-y-2">
              <p>
                Publishing to a topic with 2 end points (A and B) subscribed to
                it would be charged for 2 messages
              </p>

              <ol className="list-decimal space-y-2 pl-6">
                <li>
                  You make a request to <code>/v2/publish/[your-api-url]</code>
                </li>
                <li>We make an HTTP request to each of your endpoints.</li>
              </ol>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          What happens when we hit "Messages per Day" / "Monthly Bandwidth" limit?
        </AccordionTrigger>
        <AccordionContent>
           <ul className="mt-4 list-disc space-y-2 pl-6">
            <li className="space-y-2">
              <p>
                Both of these quotas are soft limits. Your requests will not be rejected immediately on rare 
          quota hits. We'll reach out for an upgrade if the quota is exceeded consistently.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Fixed 1M will be upgraded into Fixed 10M.</li>
              <li>Fixed 10M will be upgraded into a Custom Enterprise Plan.</li>
              </ul>
            </li>
            <li className="space-y-2">
              <p>If we can't reach you, your API's can get following errors respectively. 
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>When `Messages per Day` is reached, QStash API will return "daily ratelimit YOUR_QUOTA exceeded" with 429 status code.</li>
              <li>When `Monthly Bandwidth` is reached, QStash API will return "monthly bandwidth exceeded" with 429 status code.</li>
              </ul>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          How is the Max Message Size Limit applied?
        </AccordionTrigger>
        <AccordionContent>
        <ul className="mt-4 list-disc space-y-2 pl-6">
            <li className="space-y-2">
              <p>
                If the body send to QStash is larger than the limit, the endpoint returns http 412 error stating that quota is exceeded.
              </p>
            </li>
            <li className="space-y-2">
              <p>
                When /v2/batch endpoint is used, each request body is subjected to the quota on its own. 
              </p>
            </li>
            <li className="space-y-2">
              <p>
                When the response of called endpoint is larger than the limit, the message is trimmed after the limit. And stored in the DLQ/Events as trimmed.
              </p>
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
            <li className="space-y-2">
              <p>
                There is no request per second limit for operational API's as listed below:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
              <li> trigger, publish, enqueue, notify, wait, batch</li>
              </ul>
            </li>
            <li className="space-y-2">
              <p> Other endpoints (like logs,messages etc) have rps limit. When limit is reached, API returns 
                "Too Many Requests" with 429 status code.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
              <li> Free: 100 rps</li>
              <li> Pay as you go: 100 rps</li>
              <li> Fixed 1M: 500 rps</li>
              <li> Fixed 10M: 1000 rps</li>
              </ul>
            </li>
            <li className="space-y-2">
              <p>
                We have parallelism limit when calling the user endpoint from QStash. 
                This limits number of parallel calls that can happen at the same time, other calls are queued to be done 
                later. See "Max Parallelism" on the main pricing table above. 
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>


    </Accordion.Root>
  );
}
