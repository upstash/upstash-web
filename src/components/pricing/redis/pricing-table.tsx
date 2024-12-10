import Button from "@/components/button";
import { FeatureTag, Hr } from "@/components/pricing/pricing-parts";
import {
  IconApps,
  IconHeartbeat,
  IconListSearch,
  IconLock,
  IconPercentage75,
  IconShieldLock,
  IconUserCircle,
  IconWorld,
} from "@tabler/icons-react";
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
            Perfect for prototypes and hobby projects.
          </div>
        </div>

        <Hr />

        <div className="flex flex-wrap justify-center gap-1">
          <FeatureTag active>
            <IconPercentage75 width="16" height="16" strokeWidth={1.5} />
            Persistence
          </FeatureTag>

          <FeatureTag active>
            <IconApps width="16" height="16" strokeWidth={1.5} />
            REST API
          </FeatureTag>

          <FeatureTag active>
            <IconLock width="16" height="16" strokeWidth={1.5} />
            TLS
          </FeatureTag>

          <FeatureTag>
            <IconWorld width="16" height="16" strokeWidth={1.5} />
            Global
          </FeatureTag>

          <FeatureTag>
            <IconHeartbeat width="16" height="16" strokeWidth={1.5} />
            Uptime SLA
          </FeatureTag>

          <FeatureTag>
            <IconUserCircle width="16" height="16" strokeWidth={1.5} />
            RBAC
          </FeatureTag>

          <FeatureTag>
            <IconShieldLock width="16" height="16" strokeWidth={1.5} />
            SOC-2
          </FeatureTag>

          <FeatureTag>
            <IconListSearch width="16" height="16" strokeWidth={1.5} />
            Monitoring
          </FeatureTag>
        </div>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="!bg-white !text-black shadow"
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

          <h5 className="text-2xl font-semibold">$0.2</h5>
          <p className="text-sm text-text-mute">per 100K commands</p>
        </div>

        <div className="grow">
          <div className="text-text-mute">
            Flexible pricing for variable traffic.
          </div>
        </div>

        <Hr />

        <div className="flex flex-wrap justify-center gap-1">
          <FeatureTag active>
            <IconPercentage75 width="16" height="16" strokeWidth={1.5} />
            Persistence
          </FeatureTag>

          <FeatureTag active>
            <IconApps width="16" height="16" strokeWidth={1.5} />
            REST API
          </FeatureTag>

          <FeatureTag active>
            <IconLock width="16" height="16" strokeWidth={1.5} />
            TLS
          </FeatureTag>

          <FeatureTag active>
            <IconWorld width="16" height="16" strokeWidth={1.5} />
            Global
          </FeatureTag>

          <FeatureTag>
            <IconHeartbeat width="16" height="16" strokeWidth={1.5} />
            Uptime SLA
          </FeatureTag>

          <FeatureTag>
            <IconUserCircle width="16" height="16" strokeWidth={1.5} />
            RBAC
          </FeatureTag>

          <FeatureTag>
            <IconShieldLock width="16" height="16" strokeWidth={1.5} />
            SOC-2
          </FeatureTag>

          <FeatureTag>
            <IconListSearch width="16" height="16" strokeWidth={1.5} />
            Monitoring
          </FeatureTag>
        </div>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="!bg-white !text-black shadow"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* PRO 2K */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white px-4 py-8 shadow dark:bg-bg-mute">
        <div>
          <h4 className="mb-2 text-xl font-semibold text-primary-text">
            Pro 2K
          </h4>

          <h5 className="flex items-baseline justify-center text-2xl font-semibold">
            $280
            <span className="ml-1 text-base font-normal text-text-mute">
              / month
            </span>
          </h5>
          <p className="text-sm text-text-mute">+$100 ✕ read region</p>
        </div>

        <div>
          <div className="text-text-mute">
            Unlimited commands and high performance for a fixed price.
          </div>
        </div>

        <Hr />

        <div className="flex flex-wrap justify-center gap-1">
          <FeatureTag active>
            <IconPercentage75 width="16" height="16" strokeWidth={1.5} />
            Persistence
          </FeatureTag>

          <FeatureTag active>
            <IconApps width="16" height="16" strokeWidth={1.5} />
            REST API
          </FeatureTag>

          <FeatureTag active>
            <IconLock width="16" height="16" strokeWidth={1.5} />
            TLS
          </FeatureTag>

          <FeatureTag active>
            <IconWorld width="16" height="16" strokeWidth={1.5} />
            Global
          </FeatureTag>

          <FeatureTag active>
            <IconHeartbeat width="16" height="16" strokeWidth={1.5} />
            Uptime SLA
          </FeatureTag>

          <FeatureTag active>
            <IconUserCircle width="16" height="16" strokeWidth={1.5} />
            RBAC
          </FeatureTag>

          <FeatureTag active>
            <IconShieldLock width="16" height="16" strokeWidth={1.5} />
            SOC-2
          </FeatureTag>

          <FeatureTag active>
            <IconListSearch width="16" height="16" strokeWidth={1.5} />
            Monitoring
          </FeatureTag>
        </div>

        {/*<p className="text-primary-text">2,000 commands per second</p>*/}

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="!bg-white !text-black shadow"
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
