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
          How can I upgrade to pay as you go from free tier?
        </AccordionTrigger>
        <AccordionContent>
          Once you enter your credit card, your database will be upgraded to
          the pay-as-you-go plan and limits will be updated.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>What is included in free tier?</AccordionTrigger>
        <AccordionContent>
          Free tier includes 256MB data size and 500K commands per month.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          Are paid databases&apos; first 256MB data and 500K commands free?
        </AccordionTrigger>
        <AccordionContent>
          No. Once you upgrade to a paid tier, you will be charged for data
          size and commands according to that plan.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>How does the budget work?</AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Budget is only available for the pay-as-you-go plan.
          </p>
          <p className="mt-4">
            You can set a maximum monthly budget for your database so you
            won&apos;t be charged beyond that limit. We send email notifications
            when you reach 70% and 90% of your monthly budget so you can adjust
            the limit or upgrade to a Fixed plan.
          </p>
          <p className="mt-4">
            If your usage exceeds the budget cap, your database will be rate
            limited and your total cost will not exceed the chosen budget.
          </p>
          <p className="mt-4">
            If you change from a Fixed plan to pay-as-you-go mid-month, your
            budget only tracks your pay-as-you-go spending.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger>
          Do Fixed plans have command count pricing or limits?
        </AccordionTrigger>
        <AccordionContent>
          Fixed plans have no command-count billing. You pay for data size,
          bandwidth, and throughput limits, not per command.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>
          Are all Redis commands counted in billing?
        </AccordionTrigger>
        <AccordionContent>
          Operational commands like AUTH, HELLO, SELECT, COMMAND, CONFIG, INFO,
          PING, RESET, and QUIT are not charged.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>Are databases faster in higher plans?</AccordionTrigger>
        <AccordionContent>
          Ops/sec limits are the same in the initial plans, while higher plans
          increase throughput and other limits. There is no performance
          difference between plans as long as you stay within the limits.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>
          Are read and write commands same price?
        </AccordionTrigger>
        <AccordionContent>
          Yes. But for Global databases, the write commands are replicated to
          all read regions in addition to the primary region. Replications are
          also counted as commands. For example, if you have one primary and
          one read region, 100K writes cost $0.4 ($0.2 x 2).
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9">
        <AccordionTrigger>How is the storage cost calculated?</AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            For each database, the first 1GB is free. Beyond that, storage is
            charged at $0.25 per GB of total storage.
          </p>
          <p className="mt-4">
            Total storage is determined by adding up the storage at all replicas
            and regions. Even if you do not access your data, it still needs to
            stay persistent in the cloud provider&apos;s block storage for
            durability and high availability.
          </p>
          <p className="mt-4">
            To calculate storage cost, we take the daily average of your total
            data size across replicas and regions and apply the monthly rate at
            the end of the month.
          </p>
          <p className="mt-4">
            If you use your database as a cache, setting a timeout with{" "}
            <code>EXPIRE</code> is a good way to minimize cost.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10">
        <AccordionTrigger>
          What happens when I hit limits on pay-as-you-go plan?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            We send email notifications when limits are exceeded. We do our
            best to keep your database running, but we may rate limit depending
            on the case.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Requests above the max request size are rejected with an
              exception.
            </li>
            <li>
              Collections that exceed the max record size stop accepting new
              records.
            </li>
            <li>
              Bandwidth and storage do not have hard limits, but you can use a
              budget limit to avoid unexpected charges.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-11">
        <AccordionTrigger>
          What happens when I hit limits on Fixed plans?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            We send email notifications when limits are exceeded.
          </p>
          <p className="mt-4">
            If your database hits the bandwidth or storage limits and
            auto-upgrade is enabled, it upgrades to the next tier. If
            auto-upgrade is not enabled, the database is rate limited: traffic
            is blocked for bandwidth cases and write operations are blocked for
            storage cases.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Requests above the max request size are rejected with an
              exception.
            </li>
            <li>
              Collections that exceed the max record size stop accepting new
              records.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-12">
        <AccordionTrigger>Are there free trials?</AccordionTrigger>
        <AccordionContent>
          Yes, we can provide free trials for testing and PoC purposes. Email
          us at <a href="mailto:support@upstash.com">support@upstash.com</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-13">
        <AccordionTrigger>How many databases can I create?</AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            You can create up to 10 databases for free. Beyond that, you are
            charged $0.5 per database up to 100 databases.
          </p>
          <p className="mt-4">
            For more than 100 databases, contact{" "}
            <a href="mailto:support@upstash.com">support@upstash.com</a>. The
            charge is calculated based on the number of active databases at the
            end of the month.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-14">
        <AccordionTrigger>
          What happens if I delete my database after 2-3 days?
        </AccordionTrigger>
        <AccordionContent>
          For Fixed plans, you are charged pro-rata for the days the database
          was active, even if you did not use it. For pay-as-you-go plans, you
          are only charged for actual usage during those days.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-15">
        <AccordionTrigger>
          How much is the price for bandwidth?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            For pay-as-you-go, monthly bandwidth is free up to 200GB. Beyond
            that, we charge $0.03 per additional GB.
          </p>
          <p className="mt-4">
            For Fixed plans, bandwidth is included up to your plan&apos;s limit.
            If your database is on the highest Fixed tier and exceeds its
            allowance, we will reach out with upgrade and Enterprise options.
            If we cannot reach you and usage continues, we reserve the right to
            charge bandwidth overages at our cloud provider cost rate.
          </p>
          <p className="mt-4">
            For high-volume use cases, VPC peering can reduce transfer costs.
            VPC peering requires an Enterprise contract. Contact{" "}
            <a href="mailto:support@upstash.com">support@upstash.com</a> for
            details.
          </p>
          <p className="mt-4">
            Bandwidth pricing depends on the cloud provider&apos;s traffic fees,
            so it may change over time. If it changes, we will notify you by
            email.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-16">
        <AccordionTrigger>
          Can I purchase Prod Pack for any plan?
        </AccordionTrigger>
        <AccordionContent>
          Yes. You can purchase Prod Pack for any plan except the Free tier.
          You can enable it from your Upstash dashboard database details page.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-17">
        <AccordionTrigger>What is included in Prod Pack?</AccordionTrigger>
        <AccordionContent>
          Prod Pack includes uptime SLA, SOC 2 Type 2 report, advanced
          monitoring with Prometheus, Grafana, and Datadog, high availability
          for read regions, role-based access control, and encryption at rest.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-18">
        <AccordionTrigger>
          What is included in Enterprise subscription?
        </AccordionTrigger>
        <AccordionContent>
          <p className="mt-4">
            Enterprise includes all Prod Pack features for all your databases.
          </p>
          <p className="mt-4">
            It also includes dedicated professional support, a dedicated
            technical account manager, unlimited databases, HIPAA compliance,
            VPC peering, SSO integration, and custom monthly or annual contract
            options.
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-19">
        <AccordionTrigger>
          How is the Enterprise subscription priced?
        </AccordionTrigger>
        <AccordionContent>
          Enterprise pricing is custom and based on your requirements. For more
          information, email{" "}
          <a href="mailto:sales@upstash.com">sales@upstash.com</a>.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-20">
        <AccordionTrigger>
          Do you have the Professional Support plan?
        </AccordionTrigger>
        <AccordionContent>
          Professional support includes a dedicated service desk and a
          Slack/Discord channel with a committed response time SLA. Check{" "}
          <a href="https://upstash.com/docs/common/help/prosupport">
            Professional Support
          </a>{" "}
          for details.
        </AccordionContent>
      </AccordionItem>
    </Accordion.Root>
  );
}
