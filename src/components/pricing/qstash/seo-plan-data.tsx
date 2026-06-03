import {
  QSTASH_ALL_PLANS,
  QSTASH_FIXED_PLANS,
  QSTASH_PAYG_PLAN,
  type QStashPlan,
} from "@/data/pricing/qstash";

/**
 * Crawlable, screen-reader-only mirror of the full pricing data.
 *
 * The interactive PricingTable / CompareTable only render the plan the user
 * has selected from the dropdown, so the other tiers never reach the HTML.
 * This block renders every tier server-side from the same data source, so
 * search engines and AI crawlers that fetch the page as HTML (without the
 * Accept header that would route them to /pricing/qstash.md) still get the
 * complete pricing. It mirrors data the user can reach via the dropdown, so
 * it is not hidden/deceptive content.
 */
function summaryPrice(plan: QStashPlan): string {
  if (plan.type === "payg") return "$1 per 100K messages";
  if (plan.monthlyPrice !== null) return `$${plan.monthlyPrice}/month`;
  return "Custom";
}

export default function SeoPlanData() {
  return (
    <section className="sr-only">
      <h2>Upstash QStash pricing — all plans</h2>

      <table>
        <caption>Plan overview</caption>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Max messages/day</th>
            <th>Max bandwidth</th>
            <th>Max message size</th>
          </tr>
        </thead>
        <tbody>
          {QSTASH_ALL_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{summaryPrice(plan)}</td>
              <td>{plan.maxMessagesPerDay}</td>
              <td>{plan.maxBandwidth}</td>
              <td>{plan.maxMessageSize}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <caption>Fixed plans — all tiers</caption>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Monthly price</th>
            <th>Messages/day</th>
            <th>Bandwidth</th>
            <th>Max message size</th>
            <th>Max delay</th>
            <th>DLQ retention</th>
            <th>Max parallelism</th>
          </tr>
        </thead>
        <tbody>
          {QSTASH_FIXED_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>${plan.monthlyPrice}/month</td>
              <td>{plan.maxMessagesPerDay}</td>
              <td>{plan.maxBandwidth}</td>
              <td>{plan.maxMessageSize}</td>
              <td>{plan.maxDelay}</td>
              <td>{plan.maxDlqRetention}</td>
              <td>
                {typeof plan.maxParallelism === "number"
                  ? plan.maxParallelism.toLocaleString()
                  : plan.maxParallelism}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Pay as You Go — pricing details</h3>
      <ul>
        <li>Messages: {QSTASH_PAYG_PLAN.messagePrice}</li>
        <li>Bandwidth: {QSTASH_PAYG_PLAN.bandwidthPrice}</li>
        <li>Max messages/day: {QSTASH_PAYG_PLAN.maxMessagesPerDay}</li>
        <li>Max message size: {QSTASH_PAYG_PLAN.maxMessageSize}</li>
        <li>Max delay: {QSTASH_PAYG_PLAN.maxDelay}</li>
        <li>
          Max HTTP response duration:{" "}
          {QSTASH_PAYG_PLAN.maxHttpResponseDuration}
        </li>
        <li>DLQ retention: {QSTASH_PAYG_PLAN.maxDlqRetention}</li>
        <li>
          Active schedules:{" "}
          {typeof QSTASH_PAYG_PLAN.maxSchedules === "number"
            ? QSTASH_PAYG_PLAN.maxSchedules.toLocaleString()
            : QSTASH_PAYG_PLAN.maxSchedules}
          {QSTASH_PAYG_PLAN.maxSchedulesNote !== null
            ? ` (${QSTASH_PAYG_PLAN.maxSchedulesNote})`
            : ""}
        </li>
        <li>
          Max parallelism:{" "}
          {typeof QSTASH_PAYG_PLAN.maxParallelism === "number"
            ? QSTASH_PAYG_PLAN.maxParallelism.toLocaleString()
            : QSTASH_PAYG_PLAN.maxParallelism}
        </li>
      </ul>

      <p>
        Full machine-readable pricing is available at{" "}
        <a href="/pricing/qstash.md">/pricing/qstash.md</a>.
      </p>
    </section>
  );
}
