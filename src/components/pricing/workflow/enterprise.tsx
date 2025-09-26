import Button from "@/components/button";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

export default function PricingTableEnterprise() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 rounded-3xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-white px-10 py-8 text-amber-800 md:grid-cols-2 md:flex-row md:px-16 md:py-10 md:text-left dark:border-amber-600/20 dark:from-amber-950/10 dark:to-amber-900/10 dark:text-amber-200">
      <div className="">
        <h4 className="text-xl font-semibold">Enterprise</h4>
        <p className="opacity-80">For businesses with advanced needs.</p>

        <Button
          asChild
          variant="secondary"
          className="mt-4 hidden bg-amber-200 text-amber-800 transition-colors hover:bg-white md:inline-flex dark:bg-amber-50 dark:text-amber-800"
        >
          <Link href="/enterprise">Learn More</Link>
        </Button>
      </div>

      <div className="justify-self-center pl-0 text-left md:justify-self-start lg:pl-8">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-600" />
            100M+ steps daily
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-600" />
            Unlimited bandwidth
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-600" />
            Professional support with SLA
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-amber-600" />
            Dedicated resources for isolation
          </li>
        </ul>
      </div>

      <Button
        asChild
        variant="secondary"
        className="inline-flex justify-self-center bg-amber-200 text-amber-800 md:hidden"
      >
        <Link href="/enterprise">Learn More</Link>
      </Button>
    </div>
  );
}
