import * as React from "react";

export default function Ps() {
  return (
    <div className="space-y-6 text-left md:space-y-8">
      <div className="rounded-xl bg-white/5 px-8 py-6">
        <h4 className="text-xl font-semibold text-emerald-400">Free Tier</h4>

        <div className="mt-4 space-y-4 text-white/80">
          <p>
            You can start using Upstash for free right away without entering
            your credit card information. This tier lets you create one cluster
            with a limit of 10K daily messages and 256MB retention size. Once
            you provide your credit card details, your cluster will upgrade to
            the pay-as-you-go plan and limits will be updated. If you want to
            try Upstash paid and enterprise plans, we can offer Free Trials.
            Email us at{" "}
            <a href="mailto:support@upstash.com">
              <b>support@upstash.com</b>
            </a>
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 px-8 py-6">
        <h4 className="text-xl font-semibold text-emerald-400">
          Pay as you go
        </h4>
        <h5 className="text-xl text-white/40">
          Components of the Monthly Bill
        </h5>

        <div className="mt-4 space-y-4 text-white/80">
          <p>
            With Pay As you go plan, you can set a maximum monthly budget for
            your Kafka cluster so that you won't be charged beyond this chosen
            limit. We'll keep you informed by sending email notifications once
            you reach 70% and 90% of your monthly budget. This notifications
            will let you either adjust your budget limit or upgrade to the Pro
            tier. Please note that if your usage exceeds your monthly budget
            cap, your cluster may be rate limited however your cost will not
            exceed your chosen budget limit.
          </p>
          <p>
            Your monthly bill will be driven by the below components, all
            charges are per cluster.
          </p>

          <ul className="list-disc space-y-4 pl-6">
            <li>
              <p>
                <b>Commands Per second:</b> You are billed based on the number
                of Kafka messages processed by your Kafka cluster at a rate of
                $0.2 per 100K messages for single replica, or $0.6 per 100K
                messages for multi-replica. Empty consume messages are free and
                not included in billing calculations.
              </p>
            </li>
            <li>
              <p>
                <b>Data size (Storage Cost):</b> The storage cost is charged
                separately at a rate of $0.25 per GB total storage. Total
                storage is determined by adding up the storage across all
                replicas. For example a 1MB message data will amount to 3MB in
                multi-replica cluster. Regardless of whether you access your
                data, we have to keep it persistent in Cloud Provider’s block
                storage (eg AWS EBS, S3) for durability. To calculate the total
                storage cost, we take the daily average of your data size and
                multiply with $0.25 at the end of the month. For instance, if
                you have 1 GB data in your cluster throughout the month, you
                will pay $0.25. But, if your cluster remains empty for the first
                29 days and expands to 30GB on the last day; your cost for that
                month would be $0.25 (30GB / 30day X $0.25). Topics that remain
                idle -with neither message produces or consumed - for more than
                1.5 times max-retention-time will be automatically deleted.
              </p>
            </li>
            <li>
              <p>
                <b>Monthly Bandwidth (Data Transfer Cost):</b> The data transfer
                is free up to monthly bandwidth limit. Beyond that, we charge
                $0.1 per GB.
              </p>
            </li>
            <li>
              <p>
                <b>Custom Add-ons:</b> All limits for the pro tier are per
                cluster. If you think, your use case will exceed the limits,
                contact us (
                <a href="mailto:support@upstash.com">support@upstash.com</a>) to
                update them for a custom quota or check our Pro/Enterprise Plans
                where the limits are higher.
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 px-8 py-6">
        <h4 className="text-xl font-semibold text-emerald-400">
          Pro / Enterprise Plans
        </h4>
        <h5 className="text-xl text-white/40">
          Components of the Monthly Bill
        </h5>

        <div className="mt-4 space-y-4 text-white/80">
          <p>
            For the Pro/Enterprise tiers, you'll be charged a fixed monthly
            price per cluster. There is no requirement for long-term contracts
            as the minimum term is just one month, and you have the flexibility
            to cancel anytime. But please note that even if you cancel within
            the month, you will be billed for the minimum term of 1 full month.
            It's possible to have clusters on different plans within the same
            account, with each being billed separately. All Pro/Enterprise plans
            have multiple replicas for high availability. Even if your first
            cluster is single-replica from pay as you go tier, replication is
            enabled with the upgrade to pro tier.
          </p>

          <p>
            Your monthly Pro/Enterprise bill will be driven by the below
            components:
          </p>

          <ul className="list-disc space-y-4 pl-6">
            <li>
              <p>
                <b>Monthly fixed price:</b> This is fixed based on the Pro tier
                enabled and not driven by usage volume. The costs are $320 for
                Pro2K and $520 for Pro10K. For Enterprise a custom price is set
                based on specific requirements.
              </p>
            </li>
            <li>
              <p>
                <b>Data Size (Storage Cost):</b> This follows the Pay-as-you-go
                tier’s pricing method, charged at a rate of $0.25 per GB-month.
                Total storage is determined by adding up the storage at all
                replicas.
              </p>
            </li>
            <li>
              <p>
                <b>Monthly Bandwidth (Data Transfer Cost):</b> Data transfer is
                charged at a rate of $0.1 per GB out and $0.05 per GB in for all
                the usage throughout the month. For use cases with high volume,
                you may consider VPC Peering which minimizes the data transfer
                cost. The above pricing assumes that the clients and cluster are
                in the same cloud provider. If not, you may be charged at a
                higher rate proportional to what cloud providers charge us.
                Contact us
                <a href="mailto:support@upstash.com">
                  <b>support@upstash.com</b>
                </a>{" "}
                for details.
              </p>
            </li>
            <li>
              <p>
                <b>Security Add-ons:</b> Security add-ons are only available for
                a Pro/Enterprise clusters and are provided upon request with an
                extra fee. Please contact us at support@upstash.com to learn
                about their pricing.
              </p>

              <ul className="mt-4 list-disc space-y-4 pl-6">
                <li>
                  <p>
                    <b>IP Whitelisting:</b> You can set the IP addresses which
                    will have access to your database.
                  </p>
                </li>
                <li>
                  <p>
                    <b>TLS Mutual Authentication:</b> mTLS ensures two-way
                    authentication where both client and server authenticate
                    each other at the same time in the authentication protocol.
                  </p>
                </li>
                <li>
                  <b>VPC Peering:</b> VPC Peering enables you to connect to
                  Upstash from your own VPC using private IP. Cluster and your
                  application can run in the same subnet which also minimizes
                  data transfer costs.
                </li>
                <li>
                  <p>
                    <b>AWS Private Link:</b> AWS Private link helps you to
                    access to Upstash Cluster with a private network link inside
                    AWS infrastructure.
                  </p>
                </li>
                <li>
                  <p>
                    <b>Encryption at rest:</b> Upstash encrypts the block
                    storage where your data is persisted and stored.
                  </p>
                </li>
              </ul>
            </li>
            <li>
              <p>
                <b>Professional Support:</b> This includes a dedicated service
                desk along and a Slack/Discord channel with a committed response
                time SLA. Please contact us at{" "}
                <a href="mailto:support@upstash.com">
                  <b>support@upstash.com</b>
                </a>{" "}
                to learn more about the details.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
