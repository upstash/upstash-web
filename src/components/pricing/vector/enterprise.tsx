import Button from "@/components/button";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

export default function PricingTableEnterprise() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-primary bg-bg-mute px-10 py-8 md:flex-row md:px-16 md:py-10 md:text-left">
      <div>
        <h4 className="text-2xl font-semibold text-primary-text">Enterprise</h4>
        <p className="">For businesses with advanced needs.</p>

        <Button
          asChild
          variant="primary"
          className="-ml-1 mt-4 hidden md:inline-flex"
        >
          <Link href="sales">Contact Us</Link>
        </Button>
      </div>

      <div className="mt-6 md:ml-24 md:mt-0">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            Professional support with SLA
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            Scales over a billion of vectors
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            Custom configurations
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-primary-text" />
            Advanced security options
          </li>
        </ul>
      </div>

      <Button asChild variant="primary" className="-ml-1 mt-6 md:hidden">
        <Link href="sales">Contact Us</Link>
      </Button>
    </div>
  );
}
