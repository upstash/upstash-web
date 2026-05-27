import { ReactNode } from "react";

export default function PostSummary({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-5 my-6 rounded-2xl bg-emerald-900/5 p-5 md:-mx-6 md:p-6 dark:bg-white/[0.04]">
      <div className="mb-3 flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
        <SummaryIcon />
        Summary
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SummaryIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="13"
      viewBox="0 0 22 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="-mt-1"
    >
      <path
        d="M11 17H4.2C3.07989 17 2.51984 17 2.09202 16.782C1.71569 16.5903 1.40973 16.2843 1.21799 15.908C1 15.4802 1 14.9201 1 13.8V4.2C1 3.07989 1 2.51984 1.21799 2.09202C1.40973 1.71569 1.71569 1.40973 2.09202 1.21799C2.51984 1 3.07989 1 4.2 1H4.6C6.84021 1 7.96031 1 8.81596 1.43597C9.56861 1.81947 10.1805 2.43139 10.564 3.18404C11 4.03968 11 5.15979 11 7.4M11 17V7.4M11 17H17.8C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V4.2C21 3.07989 21 2.51984 20.782 2.09202C20.5903 1.71569 20.2843 1.40973 19.908 1.21799C19.4802 1 18.9201 1 17.8 1H17.4C15.1598 1 14.0397 1 13.184 1.43597C12.4314 1.81947 11.8195 2.43139 11.436 3.18404C11 4.03968 11 5.15979 11 7.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
