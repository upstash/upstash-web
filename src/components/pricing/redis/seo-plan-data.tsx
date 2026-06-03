import {
  REDIS_ALL_PLANS,
  REDIS_FIXED_PLANS,
  REDIS_PAYG_PLAN,
  type RedisPlan,
} from "@/data/pricing/redis";

/**
 * Crawlable, screen-reader-only mirror of the full pricing data.
 *
 * The interactive PricingTable / CompareTable only render the plan the user
 * has selected from the dropdown, so the other tiers never reach the HTML.
 * This block renders every tier server-side from the same data source, so
 * search engines and AI crawlers that fetch the page as HTML (without the
 * Accept header that would route them to /pricing/redis.md) still get the
 * complete pricing. It mirrors data the user can reach via the dropdown, so
 * it is not hidden/deceptive content.
 */
function summaryPrice(plan: RedisPlan): string {
  if (plan.type === "payg") return "$0.20 per 100K commands";
  if (plan.monthlyPrice !== null) return `$${plan.monthlyPrice}/month`;
  return "Custom";
}

export default function SeoPlanData() {
  return (
    <section className="sr-only">
      <h2>Upstash Redis pricing — all plans</h2>

      <table>
        <caption>Plan overview</caption>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Read region</th>
            <th>Max data</th>
            <th>Max bandwidth</th>
          </tr>
        </thead>
        <tbody>
          {REDIS_ALL_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{summaryPrice(plan)}</td>
              <td>
                {plan.readRegionPrice !== null
                  ? `+$${plan.readRegionPrice}/region`
                  : "-"}
              </td>
              <td>{plan.dataSize}</td>
              <td>{plan.maxBandwidth}</td>
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
            <th>Per read region</th>
            <th>Max data</th>
            <th>Max bandwidth</th>
            <th>Max commands/sec</th>
            <th>Max request size</th>
            <th>Max record size</th>
          </tr>
        </thead>
        <tbody>
          {REDIS_FIXED_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>${plan.monthlyPrice}/month</td>
              <td>+${plan.readRegionPrice}/region</td>
              <td>{plan.dataSize}</td>
              <td>{plan.maxBandwidth}</td>
              <td>
                {typeof plan.maxCommandsPerSec === "number"
                  ? plan.maxCommandsPerSec.toLocaleString()
                  : plan.maxCommandsPerSec}
              </td>
              <td>{plan.maxRequestSize}</td>
              <td>{plan.maxRecordSize}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Pay as You Go — pricing details</h3>
      <ul>
        <li>Commands: {REDIS_PAYG_PLAN.requestPrice}</li>
        <li>Storage: {REDIS_PAYG_PLAN.storagePrice}</li>
        <li>Bandwidth: {REDIS_PAYG_PLAN.bandwidthPrice}</li>
        <li>Max data size: {REDIS_PAYG_PLAN.dataSize}</li>
        <li>Max request size: {REDIS_PAYG_PLAN.maxRequestSize}</li>
        <li>Max record size: {REDIS_PAYG_PLAN.maxRecordSize}</li>
        <li>Platforms: {REDIS_PAYG_PLAN.platforms.join(", ")}</li>
      </ul>

      <p>
        Full machine-readable pricing is available at{" "}
        <a href="/pricing/redis.md">/pricing/redis.md</a>.
      </p>
    </section>
  );
}
