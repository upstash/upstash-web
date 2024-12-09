import Button from "@/components/button";
import * as React from "react";

export default function PricingTableEnterprise() {
  return (
    <div className="items-center rounded-3xl border-2 border-emerald-300/10 bg-emerald-300/3 px-10 py-8 text-left text-emerald-100 md:mx-32 md:flex md:px-16 md:py-10">
      <div className="grow">
        <h4 className="text-2xl font-semibold text-emerald-400">Enterprise</h4>
        <p className="">For businesses with advanced needs.</p>

        <Button
          type="button"
          href="mailto:sales@upstash.com"
          className="-ml-1 mt-4 hidden bg-emerald-400 font-medium text-zinc-950 md:inline-flex"
        >
          Contact Us
        </Button>
      </div>

      <div className="mt-6 md:mt-0">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <Icon/> 100K+ commands per second
          </li>
          <li className="flex items-center gap-1">
            <Icon/> Unlimited bandwidth and database count
          </li>
          <li className="flex items-center gap-1">
            <Icon/> Professional support with SLA
          </li>
          <li className="flex items-center gap-1">
            <Icon/> HIPAA and Single Sign On (SSO) support
          </li>
          <li className="flex items-center gap-1">
            <Icon/> Dedicated resources for isolation
          </li>
        </ul>
      </div>

      <Button
          type="button"
          href="mailto:support@upstash.com"
          className="-ml-1 mt-6 bg-emerald-400 font-medium text-zinc-950 md:hidden"
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
    <title> </title>
    <path
      d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
      strokeWidth="0"
      fill="currentColor"
    />
  </svg>
);
