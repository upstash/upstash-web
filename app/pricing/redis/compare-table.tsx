import * as React from "react";
import { HTMLProps, isValidElement } from "react";
import cx from "@/utils/cx";

export default function CompareTable() {
  return (
    <table className="w-full border-separate border-spacing-y-0 border-spacing-x-1">
      <colgroup>
        <col className="w-2/6" />
        <col className="w-1/6" />
        <col className="w-1/6" />
        <col className="w-1/6" />
        <col className="w-1/6" />
      </colgroup>

      {/**/}

      <thead>
        <tr>
          <th className="p-0" />
          <th
            className="bg-white/5 py-3 px-0 text-white/60 uppercase text-xs font-medium tracking-wider
          border-b-2 border-b-zinc-950"
          >
            Limit of 1 Free DB
          </th>
          <th
            className="bg-white/5 py-3 px-0 text-white/60 uppercase text-xs font-medium tracking-wider
          border-b-2 border-b-zinc-950"
          >
            Usage Based Pricing
          </th>
          <th
            className="bg-white/5 py-3 px-0 text-white/60 uppercase text-xs font-medium tracking-wider
            border-b-2 border-b-zinc-950"
            colSpan={2}
          >
            Fixed Pricing
          </th>
        </tr>

        <tr className="top-0 sticky">
          <th className="p-0" />
          <th className="bg-zinc-950 p-0">
            <div className="bg-white/5 py-6 text-white/60">
              <h4 className="text-emerald-400 text-lg font-semibold">Free</h4>
            </div>
          </th>
          <th className="bg-zinc-950 p-0">
            <div className="bg-emerald-300/10 py-6 text-white/60">
              <h4 className="text-emerald-400 text-lg font-semibold">
                Pay as you go
              </h4>
            </div>
          </th>
          <th className="bg-zinc-950 p-0">
            <div className="bg-white/5 py-6 text-white/60">
              <h4 className="text-emerald-400 text-lg font-semibold">Pro 2K</h4>
            </div>
          </th>
          <th className="bg-zinc-950 p-0">
            <div className="bg-white/5 py-6 text-white/60">
              <h4 className="text-emerald-400 text-lg font-semibold">
                Pro 10K
              </h4>
            </div>
          </th>
        </tr>
      </thead>

      {/**/}

      <tbody>
        <tr>
          <th className="top-0 sticky bg-zinc-950 text-left py-4 px-0 border-b border-b-white/10">
            <span className="flex items-center gap-2 font-semibold text-xl">
              <span className="flex items-center p-2 rounded-full bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 6m-8 0a8 3 0 1 0 16 0a8 3 0 1 0 -16 0"></path>
                  <path d="M4 6v6a8 3 0 0 0 16 0v-6"></path>
                  <path d="M4 12v6a8 3 0 0 0 16 0v-6"></path>
                </svg>
              </span>

              <span>Capacity</span>
            </span>
          </th>
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-emerald-300/10 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max command per second
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="number">2000</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="number">10000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Daily command limit
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="number">10000</CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue>Unlimited</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue>Unlimited</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max request size
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="size" suffix="MB">
              1
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              10
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max record size
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="size" suffix="MB">
              100
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              200
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              500
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max memory storage
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              64
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="size" suffix="GB">
              1
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="GB">
              3
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max data size
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="MB">
              256
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="size" suffix="GB">
              10
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="GB">
              50
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="GB">
              100
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max concurrent connections
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="number">100</CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="number">1000</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="number">2000</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="number">5000</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Max monthly bandwidth
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="GB" className="border-b-0">
              50
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="size" suffix="GB" className="border-b-0">
              200
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="TB" className="border-b-0">
              5
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="size" suffix="TB" className="border-b-0">
              10
            </CompareValue>
          </td>
        </tr>

        {/**/}

        <tr>
          <th className="top-0 sticky bg-zinc-950 text-left py-6 border-b border-b-white/10">
            <span className="flex items-center gap-2 font-semibold text-xl">
              <span className="flex items-center p-2 rounded-full bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3"></path>
                  <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3"></path>
                  <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                </svg>
              </span>

              <span>Backend Feature</span>
            </span>
          </th>
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-emerald-300/10 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Supported platforms
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="list">
              <span>AWS</span>
              <span>GCP</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Persistence
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            REST API
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Global replication
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
        </tr>

        {/**/}

        <tr>
          <th className="top-0 sticky bg-zinc-950 text-left py-6 border-b border-b-white/10">
            <span className="flex items-center gap-2 font-semibold text-xl">
              <span className="flex items-center p-2 rounded-full bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
                  <path d="M12 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                  <path d="M12 12l0 2.5"></path>
                </svg>
              </span>

              <span>Security and Privacy</span>
            </span>
          </th>
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-emerald-300/10 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            SSL Encryption (TLS)
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Security
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="list">
              <span>Password</span>
              <span>TLS</span>
            </CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Audit logs
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue>Last 7 days</CompareValue>
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue>Last 30 days</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue>Last 1 year</CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue>Last 1 year</CompareValue>
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Encryption at REST
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" valid={false} />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" valid={false} />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Compliance (SOC2, ISO27001, ...)
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" className="border-b-0" />
          </td>
        </tr>

        {/**/}

        <tr>
          <th className="top-0 sticky bg-zinc-950 text-left py-6 border-b border-b-white/10">
            <span className="flex items-center gap-2 font-semibold text-xl">
              <span className="flex items-center p-2 rounded-full bg-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="1.6"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 13m0 2a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z"></path>
                  <path d="M15 13m0 2a2 2 0 0 1 2 -2h1a2 2 0 0 1 2 2v3a2 2 0 0 1 -2 2h-1a2 2 0 0 1 -2 -2z"></path>
                  <path d="M4 15v-3a8 8 0 0 1 16 0v3"></path>
                </svg>
              </span>

              <span>Support</span>
            </span>
          </th>
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-emerald-300/10 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
          <th className="p-0 bg-white/5 border-b-2 border-b-zinc-950" />
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Community Support
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Email Support
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Dedicated support and Slack channel
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" valid={false} />
          </td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue type="boolean" valid={false} />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" valid={false} />
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue type="boolean" />
          </td>
        </tr>

        <tr>
          <th className="py-3 px-0 text-left font-normal text-white/60 underline decoration-dashed decoration-zinc-700">
            Uptime SLA
          </th>
          {/**/}
          <td className="px-4 py-0 bg-white/5"></td>
          <td className="px-4 py-0 bg-emerald-300/10">
            <CompareValue className="border-b-0">
              <div>
                <div>Regional: 99.99%</div>
                <div>Global: 99.99%</div>
              </div>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue className="border-b-0">
              <div>
                <div>Regional: 99.99%</div>
                <div>Global: 99.99%</div>
              </div>
            </CompareValue>
          </td>
          <td className="px-4 py-0 bg-white/5">
            <CompareValue className="border-b-0">
              <div>
                <div>Regional: 99.99%</div>
                <div>Global: 99.99%</div>
              </div>
            </CompareValue>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

const CompareValue = ({
  type = "plain",
  suffix = "",
  valid = true,
  children,
  className = "",
  ...props
}: HTMLProps<HTMLSpanElement> & {
  type?: "plain" | "size" | "boolean" | "list" | "number";
  suffix?: string;
  valid?: boolean;
}) => (
  <span
    className={`inner py-3 border-b border-b-white/3 flex items-center justify-center ${className}`}
    {...props}
  >
    {type === "plain" && children}

    {type === "size" && (
      <>
        {children} <span className="ml-1 text-white/40">{suffix}</span>
      </>
    )}

    {type === "boolean" && (
      <span className="text-zinc-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={cx(valid ? "text-emerald-400" : "text-white/10")}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.25"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path
            d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
            strokeWidth="0"
            fill="currentColor"
          />
        </svg>
      </span>
    )}

    {type === "list" && children && (
      <span className="text-left flex items-center flex-wrap gap-1">
        {ReactChildrenText(children).map((item, index) => (
          <span
            className="text-sm px-2 py-1.5 font-medium bg-emerald-300/10 rounded leading-none"
            key={index}
          >
            {item}
          </span>
        ))}
      </span>
    )}

    {type === "number" && Number(children).toLocaleString()}
  </span>
);

const hasChildren = (element) =>
  // @ts-ignore
  isValidElement(element) && Boolean(element.props.children);

const ReactChildrenText = (children) => {
  if (hasChildren(children)) return ReactChildrenText(children.props.children);
  return children;
};
