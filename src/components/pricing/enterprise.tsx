import Button from "@/components/button";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

export default function PricingTableEnterprise() {
  return (
    <div className="grid grid-cols-1 items-center gap-4 rounded-3xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-white px-10 py-8 text-emerald-800 md:grid-cols-2 md:flex-row md:px-16 md:py-10 md:text-left dark:border-emerald-600/20 dark:from-emerald-950/10 dark:to-emerald-900/10 dark:text-emerald-200">
      <div className="">
        <h4 className="text-xl font-semibold">Enterprise</h4>
        <p className="opacity-80">For businesses with advanced needs.</p>

        <Button
          asChild
          variant="secondary"
          className="mt-4 hidden bg-emerald-200 text-emerald-800 transition-colors hover:bg-white md:inline-flex dark:bg-emerald-50 dark:text-emerald-950"
        >
          <Link href="/enterprise">Learn More</Link>
        </Button>
      </div>

      <div className="justify-self-center pl-0 text-left md:justify-self-start lg:pl-8">
        <ul className="space-y-2">
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-emerald-600" />
            Everything in <b className="font-bold">Prod Pack</b>
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-emerald-600" />
            100K+ commands per second
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-emerald-600" />
            Unlimited bandwidth and database count
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-emerald-600" />
            Professional support with SLA
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-emerald-600" />
            Dedicated resources for isolation
          </li>
          <li className="flex items-center gap-1">
            <IconCircleCheckFilled size={20} className="fill-emerald-600" />
            HIPAA Compliance
          </li>
        </ul>
      </div>

      <Button
        asChild
        variant="secondary"
        className="inline-flex justify-self-center bg-emerald-200 text-emerald-800 md:hidden"
      >
        <Link href="/enterprise">Learn More</Link>
      </Button>
    </div>
  );
}
