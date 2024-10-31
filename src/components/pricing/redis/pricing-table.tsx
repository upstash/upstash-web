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

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/5 px-4 py-8">
        <div className="">
          <h4 className="mb-2 text-xl font-semibold text-emerald-400">Free</h4>

          <h5 className="text-2xl font-semibold">$0</h5>
          <p className="text-sm text-white/40">-</p>
        </div>

        <div className="grow">
          <div className="text-white/80">
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

        <Hr />

        <p className="text-emerald-200">10,000 commands daily</p>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-zinc-50 text-zinc-950"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* PAYG */}

      <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-white/20 bg-white/5 px-4 py-8">
        <div className="grow">
          <h4 className="mb-2 text-xl font-semibold text-emerald-400">
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">$0.2</h5>
          <p className="text-sm text-white/40">per 100K commands</p>
        </div>

        <div className="grow">
          <div className="text-white/80">
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

        <Hr />

        <p className="text-emerald-200">1,000 commands per second</p>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-emerald-400 text-emerald-950"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* PRO 2K */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/5 px-4 py-8">
        <div>
          <h4 className="mb-2 text-xl font-semibold text-emerald-400">
            Pro 2K
          </h4>

          <h5 className="flex items-baseline text-2xl font-semibold">
            $280
            <span className="ml-1 text-base font-normal opacity-40">
              / month
            </span>
          </h5>
          <p className="text-sm text-white/40">+$100 ✕ read region</p>
        </div>

        <div>
          <div className="text-white/80">
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

        <Hr />

        <p className="text-emerald-200">2,000 commands per second</p>

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-zinc-50 text-zinc-950"
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
