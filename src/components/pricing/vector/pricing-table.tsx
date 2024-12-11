import Button from "@/components/button";
import { Hr } from "@/components/pricing/pricing-parts";
import * as React from "react";

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/**/}

      {/* FREE */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-4 py-8 shadow dark:bg-bg-mute">
        <div className="">
          <h4 className="mb-2 text-xl font-semibold text-primary-text">Free</h4>

          <h5 className="text-2xl font-semibold">$0</h5>
          <p className="text-sm text-text-mute">-</p>
        </div>

        <div className="grow">
          <div className="text-text-mute">
            Perfect for prototypes and hobby projects
          </div>
        </div>

        <Hr />

        <div>
          <p className="text-text-mute">Daily Query / Update Limit</p>
          <p className="font-semibold">10K</p>
        </div>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-primary"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* PAYG */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-4 py-8 shadow dark:bg-bg-mute">
        <div className="grow">
          <h4 className="mb-2 text-xl font-semibold text-primary-text">
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">$0.4</h5>
          <p className="text-sm text-text-mute">per 100K requests</p>
        </div>

        <div className="grow">
          <div className="text-text-mute">
            For use cases with bursting traffic
          </div>
        </div>

        <Hr />

        <div>
          <p className="text-text-mute">Daily Query / Update Limit</p>
          <p className="font-semibold">Unlimited</p>
        </div>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-primary"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* FIXED */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-4 py-8 shadow dark:bg-bg-mute">
        <div>
          <h4 className="mb-2 text-xl font-semibold text-primary-text">
            Fixed
          </h4>

          <h5 className="flex items-baseline text-2xl font-semibold">
            $60
            <span className="ml-1 text-base font-normal text-text-mute">
              / month
            </span>
          </h5>
          <p className="text-text-mute">-</p>
        </div>

        <div>
          <div className="text-text-mute">
            For consistent loads with predictable costs
          </div>
        </div>

        <Hr />

        <div>
          <p className="text-text-mute">Daily Query / Update Limit</p>
          <p className="font-semibold">1M</p>
        </div>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-primary"
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
