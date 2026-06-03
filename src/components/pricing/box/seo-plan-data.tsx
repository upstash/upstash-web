import { BOX_ALL_PLANS, BOX_PAYG_PLAN, BOX_SIZES } from "@/data/pricing/box";

/**
 * Crawlable, screen-reader-only mirror of the full pricing data.
 *
 * The interactive pricing components only render the plan/size the user has
 * selected from the dropdown, so the other tiers and sizes never reach the
 * HTML. This block renders every plan and box size server-side from the same
 * data source, so search engines and AI crawlers that fetch the page as HTML
 * (without the Accept header that would route them to /pricing/box.md) still
 * get the complete pricing. It mirrors data the user can reach via the
 * dropdown, so it is not hidden/deceptive content.
 */
export default function SeoPlanData() {
  return (
    <section className="sr-only">
      <h2>Upstash Box pricing — all plans</h2>

      <table>
        <caption>Plan overview</caption>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Concurrent boxes</th>
            <th>CPU hours/month</th>
            <th>LLM budget/month</th>
          </tr>
        </thead>
        <tbody>
          {BOX_ALL_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>
                {plan.priceDisplay}
                {plan.priceSubtext !== "-" ? ` ${plan.priceSubtext}` : ""}
              </td>
              <td>
                {typeof plan.maxConcurrentBoxes === "number"
                  ? plan.maxConcurrentBoxes.toLocaleString()
                  : plan.maxConcurrentBoxes}
              </td>
              <td>
                {typeof plan.cpuHoursPerMonth === "number"
                  ? plan.cpuHoursPerMonth.toLocaleString()
                  : plan.cpuHoursPerMonth}
              </td>
              <td>{plan.llmBudgetPerMonth}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table>
        <caption>Box sizes (Pay as You Go) — all sizes</caption>
        <thead>
          <tr>
            <th>Size</th>
            <th>vCPU</th>
            <th>Memory</th>
            <th>Disk</th>
            <th>Usage price</th>
            <th>Keep-alive price</th>
          </tr>
        </thead>
        <tbody>
          {BOX_SIZES.map((size) => (
            <tr key={size.id}>
              <td>{size.label}</td>
              <td>{size.cpu}</td>
              <td>{size.memory}</td>
              <td>{size.storage}</td>
              <td>${size.cpuHourPrice}/active CPU hour</td>
              <td>${size.keepAlivePrice}/month</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Pay as You Go — pricing details</h3>
      <ul>
        <li>Price: {BOX_PAYG_PLAN.priceDisplay} {BOX_PAYG_PLAN.priceSubtext}</li>
        <li>
          Concurrent boxes:{" "}
          {typeof BOX_PAYG_PLAN.maxConcurrentBoxes === "number"
            ? BOX_PAYG_PLAN.maxConcurrentBoxes.toLocaleString()
            : BOX_PAYG_PLAN.maxConcurrentBoxes}
        </li>
        <li>CPU hours/month: {BOX_PAYG_PLAN.cpuHoursPerMonth}</li>
        <li>LLM budget/month: {BOX_PAYG_PLAN.llmBudgetPerMonth}</li>
        {BOX_PAYG_PLAN.storagePrice !== null ? (
          <li>Storage: {BOX_PAYG_PLAN.storagePrice}</li>
        ) : null}
        {BOX_PAYG_PLAN.cpuHourPricing !== null ? (
          <li>CPU hour pricing: {BOX_PAYG_PLAN.cpuHourPricing}</li>
        ) : null}
        {BOX_PAYG_PLAN.keepAlivePricing !== null ? (
          <li>Keep-alive pricing: {BOX_PAYG_PLAN.keepAlivePricing}</li>
        ) : null}
      </ul>

      <p>
        Full machine-readable pricing is available at{" "}
        <a href="/pricing/box.md">/pricing/box.md</a>.
      </p>
    </section>
  );
}
