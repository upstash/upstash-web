import Button from "@/components/button";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

export default function PricingTableEnterprise() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-bg-mute bg-bg-mute px-10 py-8 md:flex-row md:px-16 md:py-10 md:text-left">
      <div>
        <h4 className="!text-amber-500 text-2xl font-semibold text-primary-text">Enterprise</h4>
        <p className="">For businesses with advanced needs.</p>

        <Button
          asChild
          variant="secondary"
          className="-ml-1 mt-4 hidden md:inline-flex"
        >
          <Link href="/enterprise">Learn More</Link>
        </Button>
      </div>

      <div className="mt-6 md:ml-24 md:mt-0">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-500" />
            Professional support with SLA
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-500" />
            Scales over a billion of vectors
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-500" />
            Custom configurations
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-500" />
            Advanced security options
          </li>
        </ul>
      </div>

      <Button asChild variant="secondary" className="-ml-1 mt-6 md:hidden">
        <Link href="/enterprise">Learn More</Link>
      </Button>
    </div>
  );
}
