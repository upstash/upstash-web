import Button from "@/components/button";
import * as React from "react";

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* FREE */}

      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Free
          </h4>

          <h5 className="text-2xl font-semibold">$0</h5>
          <p className="text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            Perfect for prototypes and hobby projects.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Concurrent Boxes</p>
            <p className="font-semibold">10</p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">CPU Hours / Month</p>
            <p className="font-semibold">5</p>
          </div>
        </div>

        <div>
          <Button asChild variant="primary">
            <a target="_self" href="https://console.upstash.com">
              Start Now
            </a>
          </Button>
        </div>
      </div>

      {/* PAYG */}

      <div className="flex flex-col items-center gap-4 rounded-4xl border-2 border-primary bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">$0.1</h5>
          <p className="text-sm text-text-mute">per active CPU hour</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            Pay only when your box is active.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Storage</p>
            <p className="font-semibold">$0.1 / GB per month</p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Box Type</p>
            <p className="font-semibold">Small (2 CPU, 2 GB)</p>
          </div>
        </div>

        <div>
          <Button asChild variant="primary">
            <a target="_self" href="https://console.upstash.com">
              Start Now
            </a>
          </Button>
        </div>
      </div>

      {/* ENTERPRISE */}

      <div className="flex flex-col items-center gap-4 rounded-4xl bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Enterprise
          </h4>

          <h5 className="text-2xl font-semibold">Custom</h5>
          <p className="text-sm text-text-mute">contact us</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            For teams that need bigger boxes and custom limits.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Box Types</p>
            <p className="font-semibold">Bigger box types</p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Limits</p>
            <p className="font-semibold">Custom</p>
          </div>
        </div>

        <div>
          <Button asChild variant="primary">
            <a target="_self" href="/contact">
              Contact Us
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
