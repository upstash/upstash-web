import Button from "@/components/button";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import * as React from "react";

export default function PricingTableEnterprise() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-primary bg-bg-mute px-10 py-8 md:flex-row md:px-16 md:py-10 md:text-left">
      <div>
        <h4 className="text-2xl font-semibold text-primary-text">Enterprise</h4>
        <p className="">For businesses with advanced needs.</p>

        <Button
          type="button"
          href="mailto:sales@upstash.com"
          className="-ml-1 mt-4 hidden !bg-primary !text-black md:inline-flex"
        >
          Contact Us
        </Button>
      </div>

      <div className="mt-6 md:ml-24 md:mt-0">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            100K+ commands per second
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            Unlimited bandwidth and database count
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            Professional support with SLA
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            Dedicated resources for isolation
          </li>
        </ul>
      </div>

      <Button
        type="button"
        href="mailto:support@upstash.com"
        className="-ml-1 mt-6 !bg-primary !text-black md:hidden"
      >
        Contact Us
      </Button>
    </div>
  );
}
