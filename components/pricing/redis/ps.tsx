import * as React from "react";

export default function Ps() {
  return (
    <div className="space-y-6 text-left md:space-y-8">
      <div className="px-8 py-6 rounded-xl bg-white/5">
        <h4 className="text-xl font-semibold text-emerald-400">Free Tier</h4>

        <div className="mt-4 space-y-4 text-white/80">
          <p>
            You can start using Upstash for free right away without entering your
            credit card information. This tier lets you create one database with
            a limit of 10K daily commands and 256MB Storage. Additionally you
            can create one read region at maximum within this tier. Once you
            provide your credit card details, your database will upgrade to the
            pay-as-you-go plan and limits will be updated. If you want to try
            Upstash paid and enterprise plans, we can offer Free Trials. Email
            us at{" "}
            <a href="mailto:support@upstash.com">
              <b>support@upstash.com</b>
            </a>
          </p>
        </div>
      </div>

      <div className="px-8 py-6 rounded-xl bg-white/5">
        <h4 className="text-xl font-semibold text-emerald-400">
          Pay as you go
        </h4>
        <h5 className="text-xl text-white/40">
          Components of the Monthly Bill
        </h5>

        <div className="mt-4 space-y-4 text-white/80">
          <p>
            With the Pay As you go plan, you can set a maximum monthly budget for
            your database so that you won't be charged beyond this chosen limit.
            We'll keep you informed by sending email notifications once you
            reach 70% and 90% of your monthly budget. This notifications will
            let you either adjust your budget limit or upgrade to the Pro tier.
            Please note that if your usage exceeds your monthly budget cap, your
            database will be rate limited and your cost will not exceed your
            chosen budget limit.
          </p>
          <p>
            Your monthly bill will be driven by the below components, all
            charges are per database. You can create up to 10 databases in this
            tier for free and beyond this you will also be charged $0.5 per
            database up to 100 databases.
          </p>

          <ul className="pl-6 space-y-4 list-disc">
            <li>
              <p>
                <b>Commands Per second:</b> You are billed based on the number
                of Redis Commands processed by your database at a rate of $0.2
                per 100K request. Operational commands like AUTH, INFO, PING,
                QUIT, COMMAND will not be charged.
              </p>
            </li>
            <li>
              <p>
                <b>Data size (Storage Cost):</b> The storage cost is charged
                separately at a rate of $0.25 per GB total storage. Total
                storage is determined by adding up the storage at all replica
                and regions. Even if you do not access your data, we have to
                keep it persistent in Cloud Provider’s block storage (eg AWS
                EBS, S3) for durability. To calculate the total storage cost, we
                take daily average of your data size and multiply with $0.25 at
                the end of the month. For instance, if you have 1 GB data in
                your database throughout month, you will pay $0.25. However if
                your database is empty for the first 29 days and expands to 6GB
                on the last day; your cost for that month would be $0.05 (6GB /
                30day X $0.25). If you are using your database as a cache; then
                it is a good practice to set a timeout (EXPIRE) for your keys to
                minimize the cost.
              </p>
            </li>
            <li>
              <p>
                <b>Monthly Bandwidth (Data Transfer Cost):</b> The data transfer
                is free up to monthly bandwidth limit of 200GB. Beyond that, we
                charge $0.03 for each additional GB data transfer.
              </p>
            </li>
            <li className="space-y-4">
              <p>
                <b>Custom Add-ons:</b> You can add some quotas for your database
                with an extra fee based on the below pricing list:
              </p>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Max Request Size Limit</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10MB</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>50MB</td>
                    <td>$80</td>
                  </tr>
                  <tr>
                    <td>100MB</td>
                    <td>$120</td>
                  </tr>
                </tbody>
              </table>
              <table className="mini-table">
                <thead>
                  <tr>
                    <th>Max Record Size Limit</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>256MB</td>
                    <td>$60</td>
                  </tr>
                  <tr>
                    <td>500MB</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>1GB</td>
                    <td>$180</td>
                  </tr>
                </tbody>
              </table>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-8 py-6 rounded-xl bg-white/5">
        <h4 className="text-xl font-semibold text-emerald-400">
          Pro / Enterprise Plans
        </h4>
        <h5 className="text-xl text-white/40">
          Components of the Monthly Bill
        </h5>

        <div className="mt-4 space-y-4 text-white/80">
          <p>
            For the Pro/Enterprise tiers, you'll be charged a fixed monthly
            price per database. There is no requirement for long-term contracts
            as the minimum term is just one month, and you have the flexibility
            to cancel anytime. But please note that even if you cancel within
            the month, you will be billed for the minimum term of 1 full month.
            It's possible to have databases on different plans within the same
            account, with each being billed separately. Your monthly
            Pro/Enterprise bill will be driven by the below components:
          </p>

          <ul className="pl-6 space-y-4 list-disc">
            <li>
              <p>
                <b>Monthly fixed price:</b> This is fixed based on the Pro tier
                enabled and not driven by usage volume. The costs are $280+$100
                per read region for Pro 2K ,and $680 + $200 per read region for
                Pro 10K. For Enterprise a custom price is set based on specific
                requirements.
              </p>
            </li>
            <li>
              <p>
                <b>Data Size (Storage Cost):</b> This follows the Pay-as-you-go
                tier’s pricing method, charged at a rate of $0.25 per GB-month.
                Total storage is determined by adding up the storage at all
                replica and regions.
              </p>
            </li>
            <li>
              <p>
                <b>Monthly Bandwidth (Data Transfer Cost):</b> Data transfer is
                charged at a rate of $0.03 per GB for all the usage throughout
                the month. For use cases with high volume, you may consider VPC
                Peering which minimizes the data transfer cost. Contact us at{" "}
                <a href="mailto:support@upstash.com">
                  <b>support@upstash.com</b>
                </a>{" "}
                for details.
              </p>
            </li>
            <li>
              <p>
                <b>Security Add-ons:</b> Security add-ons are only available for
                a Pro/Enterprise databases and are provided upon request with an
                extra fee. Please contact us at support@upstash.com to learn
                about their pricing.
              </p>

              <ul className="pl-6 mt-4 space-y-4 list-disc">
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
