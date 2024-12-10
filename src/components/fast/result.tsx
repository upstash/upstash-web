"use client";

import cx from "@/utils/cx";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function FastResult() {
  const [r, setR] = useState<number>();

  return (
    <div>
      <header className="flex items-center justify-between border-b border-b-zinc-900 py-3 text-xs uppercase tracking-widest text-zinc-600 md:py-2">
        <span>Regions</span>
        <span className="flex items-center gap-1">
          <button
            onClick={() => {
              setR(Date.now());
            }}
            type="button"
            className="hover:text-emerald-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <title>Refresh</title>
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
          </button>
          <span>Read</span>
        </span>
      </header>

      <div>
        {[
          [
            "US West (N. California)",
            "https://kg2nsnegmd.execute-api.us-west-1.amazonaws.com/dev/run",
          ],
          [
            "US West (Oregon)",
            "https://xsdlzzdyji.execute-api.us-west-2.amazonaws.com/dev/run",
          ],
          [
            "US East (N. Virginia)",
            "https://effbmlt2n4.execute-api.us-east-1.amazonaws.com/dev/run",
          ],
          [
            "South America (São Paulo)",
            "https://kuhry6kp4h.execute-api.sa-east-1.amazonaws.com/dev/run",
          ],
          [
            "Asia Pacific (Hong Kong)",
            "https://gu1zu8xx11.execute-api.ap-east-1.amazonaws.com/dev/run",
          ],
          [
            "Asia Pacific (Singapore)",
            "https://czphf8wj9b.execute-api.ap-southeast-1.amazonaws.com/dev/run",
          ],
          [
            "Europe (Ireland)",
            "https://fvj3rll99i.execute-api.eu-west-1.amazonaws.com/dev/run",
          ],
          [
            "Europe (Frankfurt)",
            "https://bszkhcn2m7.execute-api.eu-central-1.amazonaws.com/dev/run",
          ],
          [
            "Middle East (Bahrain)",
            "https://um7c15bqnl.execute-api.me-south-1.amazonaws.com/dev/run",
          ],
        ].map(([title, url]) => {
          return (
            <div
              key={url}
              className="flex items-center justify-between border-b border-b-zinc-900 py-3 md:py-2"
            >
              <span>{title}</span>
              <span className="ml-auto">
                <SpeedText url={url} revalidate={r} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpeedText({ url, revalidate }: { url: string; revalidate?: number }) {
  const { mutate, data, isValidating } = useSWR(url, fetcher, {
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });

  const value = data?.latencyGlobal;

  useEffect(() => {
    mutate();
  }, [revalidate]);

  return isValidating ? (
    <span className="opacity-40">Loading...</span>
  ) : data ? (
    <span
      className={cx("", value > 10 ? "text-yellow-400/80" : "text-emerald-400")}
    >
      {Math.round(value)}ms
    </span>
  ) : (
    <>-</>
  );
}
