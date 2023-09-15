import Button from "@/components/button";
import * as React from "react";

export default function PricingTableEnterprise() {
  return (
    <div
      className="md:mx-32 text-left text-emerald-100 md:flex items-center
    bg-emerald-300/3 border-2 border-emerald-300/10
    py-8 px-10 md:py-10 md:px-16 rounded-3xl"
    >
      <div className="grow">
        <h4 className="text-emerald-400 text-2xl font-semibold">Enterprise</h4>
        <p className="">For businesses with advanced needs.</p>

        <Button
          type="button"
          href="mailto:support@upstash.com"
          className="hidden md:inline-flex mt-4 -ml-1 bg-emerald-400 text-zinc-950 font-medium"
        >
          Contact Us
        </Button>
      </div>

      <div className="mt-6 md:mt-0">
        <ul className="space-y-2">
          <li className="flex gap-1 items-center">
            <Icon /> Guaranteed scalability and performance
          </li>
          <li className="flex gap-1 items-center">
            <Icon /> Custom configurations
          </li>
          <li className="flex gap-1 items-center">
            <Icon /> Advanced security options
          </li>
          <li className="flex gap-1 items-center">
            <Icon /> Dedicated support
          </li>
        </ul>
      </div>

      <Button
        type="button"
        href="mailto:support@upstash.com"
        className="md:hidden mt-6 -ml-1 bg-emerald-400 text-zinc-950 font-medium"
      >
        Contact Us
      </Button>
    </div>
  );
}

const Icon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="inline-flex text-emerald-400"
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
);
