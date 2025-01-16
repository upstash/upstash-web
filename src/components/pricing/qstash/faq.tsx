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
                  You make a request to <code>/v1/publish/[your-api-url]</code>
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
                  You make a request to <code>/v1/publish/[your-api-url]</code>
                </li>
                <li>We make an HTTP request to each of your endpoints.</li>
              </ol>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          What happens when we hit daily max messages limit?
        </AccordionTrigger>
        <AccordionContent>
          QStash API starts to return exceptions.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          What are the prices for Pro/Enterprise plans?
        </AccordionTrigger>
        <AccordionContent>
          <table className="mini-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Max Messages per Day</th>
                <th>Price (per month)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Pro 1M</td>
                <td>1M</td>
                <td>$180</td>
              </tr>
              <tr>
                <td>Pro 10M</td>
                <td>10M</td>
                <td>$420</td>
              </tr>
              <tr>
                <td>Enterprise</td>
                <td>100M</td>
                <td>$1800</td>
              </tr>
            </tbody>
          </table>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
