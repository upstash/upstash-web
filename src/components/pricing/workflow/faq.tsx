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
            <li className="space-y-2">
              <p>
                A step is actually a message of QStash. To make it more concrete,
                a step is a single call from the QStash server to Workflow url or an external url.
                If the call fails and retried, that is also counted as an extra step. 
              </p>
            </li>
            <li className="space-y-2">
              <p>
              Each Workflow Run composed of multiple steps.
              A workflow run can be a a couple of steps or hundreds of steps depending on how many `context` functions are used.
              </p>
            </li>
            <li className="space-y-2">
              <p>
              context.run, context.sleep, context.sleepUntil, or context.waitForEvent commands generate a single steps.
              </p>
            </li>
            <li className="space-y-2">
              <p>
              The context.call/context.invoke command generates two steps.
              </p>
            </li>
            <li className="space-y-2">
              <p>
                When multiple functions called in parallel for each one an extra step is generated.
              </p>
            </li>            
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          What happens when we hit daily max steps limit?
        </AccordionTrigger>
        <AccordionContent>
            Workflow is built on top of QStash. A step is a call from the QStash server to Workflow url or an external url.
            When the limit is reached QStash API starts to return exception, the Workflow SDK 
            in this case throttles for a second and retries the call until the retry limit is reached.
            After that, the workflow run fails and recorded in DLQ(dead letter queue).
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
      <AccordionTrigger>
          What is a request?
        </AccordionTrigger>
        <AccordionContent>
          Workflow is built on top of QStash. A request is any call to the QStash Rest API. 
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
                There is no request per second limit for operational API's as listed above:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
              <li> trigger, publish, enqueue, notify, wait, batch</li>
              </ul>
            </li>
            <li className="space-y-2">
              <p> Other endpoints (like logs,messages etc) have rps limit. When limit is reached, Rest API returns 
                "Too Many Request" with 429 status code.
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
                later. The quotas per plan is as follows:
              </p>
                <ul className="mt-4 list-disc space-y-2 pl-6">
                <li> Free: 10</li>
                <li> Pay as you go: 100</li>
                <li> Fixed 1M: 200</li>
                <li> Fixed 10M: 1000 </li>
              </ul>
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
            <li className="space-y-2">
              <p>
                When a workflow run is is triggered, if the body length is larger than the limit, the endpoint returns http 412, and Workflow SDK logs an error stating that quota is exceeded.
                And the workflow run marked as failed and recorded in DLQ(dead letter queue).
              </p>
            </li>
            <li className="space-y-2">
              <p>
                Between each step, The Workflow SDK makes calls to QStash API. On these calls, response of context.run/context.call/context.invoke are also subjected to the max message size quota.
                If they exceed the quota, the workflow run fails and recorded in DLQ(dead letter queue).
              </p>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
