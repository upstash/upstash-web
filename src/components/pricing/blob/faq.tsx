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
    <FAQRoot product="blob">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          What is a simple operation and what is an advanced operation?
        </AccordionTrigger>
        <AccordionContent>
          Simple operations are reads: downloading an object, reading its
          metadata with a HEAD, and the bucket-level GETs. Advanced operations
          are everything else: uploads, copies, renames, and listing a bucket.
          The rate is the same whether a read is served from the origin or from
          the CDN. Deletes are free.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          Which region should I choose for my bucket?
        </AccordionTrigger>
        <AccordionContent>
          None. There is no region to choose. A bucket is global: every file is
          replicated to a CDN worldwide, so a reader in Singapore and a reader
          in Frankfurt are both served from close by without you configuring
          anything. This also means one rate sheet instead of per-region
          pricing, and no charge for replication or cross-region transfer.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>How are failed requests billed?</AccordionTrigger>
        <AccordionContent>
          Requests rejected before authentication with a 401, and requests that
          fail on our side with a 5xx, are not billed. Everything else counts as
          an operation, whether it succeeded or not.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>How is storage measured?</AccordionTrigger>
        <AccordionContent>
          On the monthly average of your bucket&apos;s size, not on its peak. We
          sample daily and divide by the number of days in the month, so an
          object stored for one day of a 30-day month costs about a thirtieth of
          a full month. The average is billed as measured, never rounded up to a
          whole GB, and no other meter rounds up either.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>When am I charged for bandwidth?</AccordionTrigger>
        <AccordionContent>
          Only on bytes that leave the bucket. Uploads are free, so writing an
          object costs storage and one advanced operation but no bandwidth.
          Downloads are billed at the same rate whether they are served from the
          CDN cache or from the origin.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>
          What happens if I exceed the free tier?
        </AccordionTrigger>
        <AccordionContent>
          Your bucket stops serving requests until the 30-day window rolls over.
          You are never charged on the free plan. Adding a credit card upgrades
          you to pay-as-you-go, which removes the caps and bills your usage from
          the first unit.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>
          Does the pay-as-you-go plan include a free allowance?
        </AccordionTrigger>
        <AccordionContent>
          No. The monthly allowance belongs to the free plan only. On
          pay-as-you-go you are billed from the first byte stored and the first
          operation made, at $0.02 per GB of storage, $0.02 per GB of outbound
          bandwidth, $0.30 per 1M simple operations and $4.50 per 1M advanced
          operations.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>Is Upstash Blob S3 compatible?</AccordionTrigger>
        <AccordionContent>
          Yes. Your bucket token exchanges for temporary S3 credentials, so you
          can use the AWS SDK, the AWS CLI, or any S3-compatible tool alongside
          the <code>@upstash/blob</code> SDK.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9">
        <AccordionTrigger>What is the maximum file size?</AccordionTrigger>
        <AccordionContent>
          5 TB per object. For files over 100 MB we recommend multipart uploads,
          where each part counts as a separate advanced operation.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10">
        <AccordionTrigger>Can I serve files publicly?</AccordionTrigger>
        <AccordionContent>
          Yes. A public bucket gets its own URL and anyone with a link can read
          from it; writes still require credentials. Private buckets have no
          public URL and every read must be signed.
        </AccordionContent>
      </AccordionItem>
    </FAQRoot>
  );
}
