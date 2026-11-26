import {
  BLOB_ALL_PLANS,
  BLOB_GLOBAL_NOTE,
  BLOB_METERS,
  blobMeterValue,
  type BlobPlan,
} from "@/data/pricing/blob";

/**
 * Crawlable, screen-reader-only mirror of the full pricing data.
 *
 * The interactive pricing component only renders the plan the user has
 * selected from the dropdown, so the other plan never reaches the HTML.
 * This block renders every plan server-side from the same data source, so
 * search engines and AI crawlers that fetch the page as HTML (without the
 * Accept header that would route them to /pricing/blob.md) still get the
 * complete pricing. It mirrors data the user can reach via the dropdown, so
 * it is not hidden/deceptive content.
 */
function summaryPrice(plan: BlobPlan): string {
  return plan.priceSubtext && plan.priceSubtext !== "-"
    ? `${plan.priceDisplay} ${plan.priceSubtext}`
    : plan.priceDisplay;
}

export default function SeoPlanData() {
  return (
    <section className="sr-only">
      <h2>Upstash Blob pricing: all plans</h2>

      <p>
        Upstash Blob pay-as-you-go costs $0.02 per GB stored per month, with
        egress free up to 1 TB per bucket a month and $0.02 per GB past that.
      </p>

      <table>
        <caption>
          Billed resources, per bucket. The Free column is what the plan
          includes each month; the Pay as You Go column is the rate, billed from
          the first unit except egress, which is free up to 1 TB a month.
        </caption>
        <thead>
          <tr>
            <th>Resource</th>
            {BLOB_ALL_PLANS.map((plan) => (
              <th key={plan.id}>{plan.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BLOB_METERS.map((meter) => (
            <tr key={meter.key}>
              <td>{meter.label}</td>
              {BLOB_ALL_PLANS.map((plan) => (
                <td key={plan.id}>{blobMeterValue(meter, plan)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        {BLOB_GLOBAL_NOTE} A bucket is global: there is no region selector, no
        per-region rate sheet, and no charge for replication or cross-region
        transfer.
      </p>

      <h3>Plan overview</h3>
      <ul>
        {BLOB_ALL_PLANS.map((plan) => (
          <li key={plan.id}>
            {plan.name}: {summaryPrice(plan)}. {plan.description}
          </li>
        ))}
      </ul>

      <p>
        The free plan&apos;s amounts are hard caps per bucket that reset on the
        1st of every calendar month (UTC). Past the operations or egress cap the
        bucket stops serving requests until the next month starts; past the
        storage cap it becomes read-only, so reads and downloads keep working
        but uploads are refused. The free plan is never charged. Pay as You Go
        bills from the first byte and the first operation, except egress, which
        is free up to 1 TB per bucket a month.
      </p>

      <p>
        Full machine-readable pricing is available at{" "}
        <a href="/pricing/blob.md">/pricing/blob.md</a>.
      </p>
    </section>
  );
}
