import * as React from "react";

export default function Ps() {
  return (
    <div className="text-left space-y-6 md:space-y-8">
      <div className="rounded-xl bg-white/5 px-8 py-6">
        <p>
          The only thing you are charged for are <code>messages</code> whereas
          retries are free. Below are some message examples:
        </p>

        <ul className="mt-4 list-disc pl-6 space-y-2">
          <li className="space-y-2">
            <p>
              <b>
                Publish to single API endpoint. Here you would be charged for 1
                message
              </b>
            </p>

            <ol className="list-decimal pl-6 space-y-2">
              <li>
                You make a request to <code>/v1/publish/[your-api-url]</code>
              </li>
              <li>
                We make an HTTP request to your API and it returns a 500 status
                code
              </li>
              <li>
                After some time we retry to deliver the message and it succeeds
              </li>
            </ol>
          </li>

          <li>
            <b>Schedule triggered “Every hour”;</b> at the end of the month this
            would be around <code>24 * 30 = 720</code> billed messages.
          </li>

          <li className="space-y-2">
            <p>
              Publishing to a topic with 2 end points (A and B) subscribed to it
              would be charged for 2 messages
            </p>

            <ol className="list-decimal pl-6 space-y-2">
              <li>
                You make a request to <code>/v1/publish/[your-api-url]</code>
              </li>
              <li>We make an HTTP request to each of your endpoints.</li>
            </ol>
          </li>
        </ul>
      </div>

      <div className="rounded-xl bg-white/5 px-8 py-6">
        <h4 className="text-xl text-emerald-400 font-semibold">Free Tier</h4>

        <div className="mt-4 text-white/80 space-y-4">
          <p>
            The free tier includes 500 Messages per day. Afterwards we will no
            longer accept new requests.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 px-8 py-6">
        <h4 className="text-xl text-emerald-400 font-semibold">
          Pay as you go
        </h4>

        <div className="mt-4 text-white/80 space-y-4">
          <p>
            Upstash limits your monthly usage for QStash to daily 500,000 in
            pay-as-you-go plan. If you are expecting to exceed this limit,
            contact us for the Enterprise plan.
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 px-8 py-6">
        <h4 className="text-xl text-emerald-400 font-semibold">
          Pro / Enterprise Plans
        </h4>

        <div className="mt-4 text-white/80 space-y-4">
          <p>
            In the pro/enterprise plans, we offer 3 different fixed price
            options to meet higher throughput demands. We reserve isolated
            resource to guarantee the scalability for high volumes. Below are
            the details and prices. There is no requirement for long-term
            contracts as the minimum term is just one month, and you have the
            flexibility to cancel anytime. But please note that even if you
            cancel within the month, you will be billed for the minimum term of
            1 full month
          </p>

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
        </div>
      </div>
    </div>
  );
}
