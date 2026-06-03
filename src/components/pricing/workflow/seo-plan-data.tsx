import {
  WORKFLOW_ALL_PLANS,
  WORKFLOW_FIXED_PLANS,
  WORKFLOW_PAYG_PLAN,
  type WorkflowPlan,
} from "@/data/pricing/workflow";

/**
 * Crawlable, screen-reader-only mirror of the full pricing data.
 *
 * The interactive PricingTable / CompareTable only render the plan the user
 * has selected from the dropdown, so the other tiers never reach the HTML.
 * This block renders every tier server-side from the same data source, so
 * search engines and AI crawlers that fetch the page as HTML (without the
 * Accept header that would route them to /pricing/workflow.md) still get the
 * complete pricing. It mirrors data the user can reach via the dropdown, so
 * it is not hidden/deceptive content.
 */
function summaryPrice(plan: WorkflowPlan): string {
  if (plan.type === "payg") return "$1 per 100K steps";
  if (plan.monthlyPrice !== null) return `$${plan.monthlyPrice}/month`;
  return "Custom";
}

export default function SeoPlanData() {
  return (
    <section className="sr-only">
      <h2>Upstash Workflow pricing — all plans</h2>

      <table>
        <caption>Plan overview</caption>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Price</th>
            <th>Steps per day</th>
            <th>Max message size</th>
            <th>Max parallelism</th>
          </tr>
        </thead>
        <tbody>
          {WORKFLOW_ALL_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>{summaryPrice(plan)}</td>
              <td>{plan.maxStepsPerDay}</td>
              <td>{plan.maxMessageSize}</td>
              <td>
                {typeof plan.maxParallelism === "number"
                  ? plan.maxParallelism.toLocaleString()
                  : plan.maxParallelism}
              </td>
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
            <th>Steps per day</th>
            <th>Max bandwidth</th>
            <th>Max message size</th>
            <th>DLQ retention</th>
            <th>Max HTTP response duration</th>
            <th>Max parallelism</th>
          </tr>
        </thead>
        <tbody>
          {WORKFLOW_FIXED_PLANS.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.name}</td>
              <td>${plan.monthlyPrice}/month</td>
              <td>{plan.maxStepsPerDay}</td>
              <td>{plan.maxBandwidth}</td>
              <td>{plan.maxMessageSize}</td>
              <td>{plan.maxDlqRetention}</td>
              <td>{plan.maxHttpResponseDuration}</td>
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
        <li>Step price: {WORKFLOW_PAYG_PLAN.stepPrice}</li>
        <li>Steps per day: {WORKFLOW_PAYG_PLAN.maxStepsPerDay}</li>
        <li>
          Bandwidth:{" "}
          {WORKFLOW_PAYG_PLAN.maxBandwidthNote ??
            WORKFLOW_PAYG_PLAN.maxBandwidth}
        </li>
        <li>Max message size: {WORKFLOW_PAYG_PLAN.maxMessageSize}</li>
        <li>Max delay: {WORKFLOW_PAYG_PLAN.maxDelay}</li>
        <li>
          Max HTTP response duration:{" "}
          {WORKFLOW_PAYG_PLAN.maxHttpResponseDuration}
        </li>
        <li>DLQ retention: {WORKFLOW_PAYG_PLAN.maxDlqRetention}</li>
        <li>
          Active schedules:{" "}
          {typeof WORKFLOW_PAYG_PLAN.maxSchedules === "number"
            ? WORKFLOW_PAYG_PLAN.maxSchedules.toLocaleString()
            : WORKFLOW_PAYG_PLAN.maxSchedules}
          {WORKFLOW_PAYG_PLAN.maxSchedulesNote !== null
            ? ` (${WORKFLOW_PAYG_PLAN.maxSchedulesNote})`
            : ""}
        </li>
        <li>
          Parallelism:{" "}
          {typeof WORKFLOW_PAYG_PLAN.maxParallelism === "number"
            ? WORKFLOW_PAYG_PLAN.maxParallelism.toLocaleString()
            : WORKFLOW_PAYG_PLAN.maxParallelism}
        </li>
      </ul>

      <p>
        Full machine-readable pricing is available at{" "}
        <a href="/pricing/workflow.md">/pricing/workflow.md</a>.
      </p>
    </section>
  );
}
