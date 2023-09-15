import Button from "@/components/button";

export default function PricingTable() {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/**/}

      {/* FREE */}

      <div className="rounded-3xl bg-white/5 px-6 py-8 flex flex-col gap-6 items-center">
        <div className="grow">
          <h4 className="mb-2 text-emerald-400 text-xl font-semibold">Free</h4>

          <h5 className="text-3xl font-semibold">$0</h5>
          <p className="text-white/40">-</p>
        </div>

        <div className="grow">
          <div className="text-white/80">
            Perfect for prototypes and hobby projects.
          </div>
        </div>

        <hr className="border-0 border-b border-b-white/5 w-2/3" />

        <div>
          <p className="text-sm text-white/40">Max Messages per Day</p>
          <p className="font-semibold">500</p>
        </div>

        <div>
          <p className="text-sm text-white/40">Max Requests per Second</p>
          <p className="font-semibold">100</p>
        </div>

        <hr className="border-0 border-b border-b-white/5 w-2/3" />

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-zinc-50 text-zinc-950 font-medium"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* PAYG */}

      <div className="rounded-3xl px-6 py-8 flex flex-col gap-6 items-center bg-emerald-300/10 border-2 border-emerald-300/10">
        <div className="grow">
          <h4 className="mb-2 text-emerald-400 text-xl font-semibold">
            Pay as you go
          </h4>

          <h5 className="text-3xl font-semibold">$1</h5>
          <p className="text-white/40">per 100K messages</p>
        </div>

        <div className="grow">
          <div className="text-emerald-100/80">
            For use cases with bursting traffic.
          </div>
        </div>

        <hr className="border-0 border-b border-b-white/5 w-2/3" />

        <div>
          <p className="text-sm text-white/40">Max Messages per Day</p>
          <p className="font-semibold">500,000</p>
        </div>

        <div>
          <p className="text-sm text-white/40">Max Requests per Second</p>
          <p className="font-semibold">100</p>
        </div>

        <hr className="border-0 border-b border-b-white/5 w-2/3" />

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-emerald-400 text-zinc-950 font-medium"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* ENTERPRISE */}

      <div className="rounded-3xl bg-white/5 px-6 py-8 flex flex-col gap-6 items-center">
        <div>
          <h4 className="mb-2 text-emerald-400 text-xl font-semibold">
            Pro 2K
          </h4>

          <h5 className="text-3xl font-semibold">$80</h5>
          <p className="text-white/40">Starting from</p>
        </div>

        <div>
          <div className="text-white/80">
            For businesses with consistent high-capacity loads and predictable
            costs.
          </div>
        </div>

        <hr className="border-0 border-b border-b-white/5 w-2/3" />

        <div>
          <p className="text-sm text-white/40">Max Messages per Day</p>
          <p className="font-semibold">up to 100M</p>
        </div>

        <div>
          <p className="text-sm text-white/40">Max Requests per Second</p>
          <p className="font-semibold">Custom</p>
        </div>

        <hr className="border-0 border-b border-b-white/5 w-2/3" />

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-zinc-50 text-zinc-950 font-medium"
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
