import Button from "@/components/button";

export default function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/**/}

      {/* FREE */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/5 px-4 py-8">
        <div className="grow">
          <h4 className="mb-2 text-xl font-semibold text-emerald-400">Free</h4>

          <h5 className="text-3xl font-semibold">$0</h5>
          <p className="text-white/40">-</p>
        </div>

        <div className="grow">
          <div className="text-white/80">
            Perfect for prototypes and hobby projects
          </div>
        </div>

        <hr className="w-2/3 border-0 border-b border-b-white/5" />

        <div>
          <p className="text-white/40">Daily Query / Update Limit</p>
          <p className="font-semibold">10K</p>
        </div>

        <hr className="w-2/3 border-0 border-b border-b-white/5" />

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-zinc-50 font-medium text-zinc-950"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* PAYG */}

      <div className="flex flex-col items-center gap-6 rounded-3xl border-2 border-white/20 bg-white/10 px-4 py-8">
        <div className="grow">
          <h4 className="mb-2 text-xl font-semibold text-emerald-400">
            Pay as you go
          </h4>

          <h5 className="text-3xl font-semibold">$0.4</h5>
          <p className="text-white/40">per 100K request</p>
        </div>

        <div className="grow">
          <div className="text-white/80">
            For use cases with bursting traffic
          </div>
        </div>

        <hr className="w-2/3 border-0 border-b border-b-white/5" />

        <div>
          <p className="text-white/40">Daily Query / Update Limit</p>
          <p className="font-semibold">Unlimited</p>
        </div>

        <hr className="w-2/3 border-0 border-b border-b-white/5" />

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-zinc-50 font-medium text-zinc-950"
          >
            Start Now
          </Button>
        </div>
      </div>

      {/* FIXED */}

      <div className="flex flex-col items-center gap-6 rounded-3xl bg-white/5 px-4 py-8">
        <div>
          <h4 className="mb-2 text-xl font-semibold text-emerald-400">Fixed</h4>

          <h5 className="flex items-baseline text-3xl font-semibold">
            $60
            <span className="ml-1 text-base font-normal opacity-40">
              / month
            </span>
          </h5>
          <p className="text-white/40">-</p>
        </div>

        <div>
          <div className="text-white/80">
            For consistent loads with predictable costs
          </div>
        </div>

        <hr className="w-2/3 border-0 border-b border-b-white/5" />

        <div>
          <p className="text-white/40">Daily Query / Update Limit</p>
          <p className="font-semibold">1M</p>
        </div>

        <hr className="w-2/3 border-0 border-b border-b-white/5" />

        <div>
          <Button
            target="_self"
            type="button"
            hideIcon
            href="https://console.upstash.com"
            className="bg-zinc-50 font-medium text-zinc-950"
          >
            Start Now
          </Button>
        </div>
      </div>
    </div>
  );
}
