import {
  SEARCH_ALL_PLANS,
  SEARCH_PAYG_PLAN,
  type SearchPlan,
} from "@/data/pricing/search";

/**
 * Crawlable, screen-reader-only mirror of the full pricing data.
 *
 * The interactive pricing component only renders the plan the user has
 * selected from the dropdown, so the other plans never reach the HTML.
 * This block renders every plan server-side from the same data source, so
 * search engines and AI crawlers that fetch the page as HTML (without the
 * Accept header that would route them to /pricing/search.md) still get the
 * complete pricing. It mirrors data the user can reach via the dropdown, so
 * it is not hidden/deceptive content.
 */
function summaryPrice(plan: SearchPlan): string {
  return plan.priceSubtext && plan.priceSubtext !== "-"
    ? `${plan.priceDisplay} ${plan.priceSubtext}`
    : plan.priceDisplay;
}

export default function SeoPlanData() {
  return (
    <section className="sr-only">
      <h2>Upstash Search pricing — all plans</h2>

      <table>
        <caption>Plan overview</caption>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Monthly queries</th>
            <th>Max records</th>
          </tr>
        </thead>
        <tbody>
          {SEARCH_ALL_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{summaryPrice(plan)}</td>
              <td>{plan.monthlyQueryLimit}</td>
              <td>{plan.maxRecords}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Pay as You Go — pricing details</h3>
      <ul>
        <li>Price: {summaryPrice(SEARCH_PAYG_PLAN)}</li>
        {SEARCH_PAYG_PLAN.requestPrice !== null && (
          <li>Request price: {SEARCH_PAYG_PLAN.requestPrice}</li>
        )}
        <li>Monthly query limit: {SEARCH_PAYG_PLAN.monthlyQueryLimit}</li>
        <li>Max records: {SEARCH_PAYG_PLAN.maxRecords}</li>
      </ul>

      <p>
        Full machine-readable pricing is available at{" "}
        <a href="/pricing/search.md">/pricing/search.md</a>.
      </p>
    </section>
  );
}
