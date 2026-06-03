import {
  VECTOR_ALL_PLANS,
  VECTOR_PAYG_PLAN,
  type VectorPlan,
} from "@/data/pricing/vector";

/**
 * Crawlable, screen-reader-only mirror of the full pricing data.
 *
 * The interactive PricingTable / CompareTable only render the plan the user
 * has selected from the dropdown, so the other tiers never reach the HTML.
 * This block renders every tier server-side from the same data source, so
 * search engines and AI crawlers that fetch the page as HTML (without the
 * Accept header that would route them to /pricing/vector.md) still get the
 * complete pricing. It mirrors data the user can reach via the dropdown, so
 * it is not hidden/deceptive content.
 */
function summaryPrice(plan: VectorPlan): string {
  return plan.priceSubtext
    ? `${plan.priceDisplay} ${plan.priceSubtext}`
    : plan.priceDisplay;
}

export default function SeoPlanData() {
  return (
    <section className="sr-only">
      <h2>Upstash Vector pricing — all plans</h2>

      <table>
        <caption>Plan overview</caption>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Max vectors × dimensions</th>
            <th>Max dimensions</th>
            <th>Max namespaces</th>
            <th>Daily query limit</th>
            <th>Max total data</th>
            <th>Uptime SLA</th>
          </tr>
        </thead>
        <tbody>
          {VECTOR_ALL_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{summaryPrice(plan)}</td>
              <td>{plan.maxVectorsDimensions}</td>
              <td>
                {typeof plan.maxDimensions === "number"
                  ? plan.maxDimensions.toLocaleString()
                  : plan.maxDimensions}
              </td>
              <td>
                {typeof plan.maxNamespaces === "number"
                  ? plan.maxNamespaces.toLocaleString()
                  : plan.maxNamespaces}
              </td>
              <td>{plan.dailyQueryLimit}</td>
              <td>{plan.maxTotalDataSize}</td>
              <td>{plan.uptimeSLA}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Pay as You Go — pricing details</h3>
      <ul>
        {VECTOR_PAYG_PLAN.requestPrice !== null && (
          <li>Requests: {VECTOR_PAYG_PLAN.requestPrice}</li>
        )}
        {VECTOR_PAYG_PLAN.storagePrice !== null && (
          <li>Storage: {VECTOR_PAYG_PLAN.storagePrice}</li>
        )}
        {VECTOR_PAYG_PLAN.bandwidthPrice !== null && (
          <li>Bandwidth: {VECTOR_PAYG_PLAN.bandwidthPrice}</li>
        )}
        <li>Max total data size: {VECTOR_PAYG_PLAN.maxTotalDataSize}</li>
        <li>Max metadata per vector: {VECTOR_PAYG_PLAN.maxMetadataPerVector}</li>
        <li>Max data per vector: {VECTOR_PAYG_PLAN.maxDataPerVector}</li>
        <li>SDKs: {VECTOR_PAYG_PLAN.sdks.join(", ")}</li>
      </ul>

      <p>
        Full machine-readable pricing is available at{" "}
        <a href="/pricing/vector.md">/pricing/vector.md</a>.
      </p>
    </section>
  );
}
