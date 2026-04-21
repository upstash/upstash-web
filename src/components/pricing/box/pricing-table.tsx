import Button from "@/components/button";

const BOX_SIZES = {
  small: {
    label: "Small",
    cpu: "2 CPU",
    memory: "4 GB RAM",
    storage: "5 GB storage",
    usagePrice: "$0.10",
  },
  medium: {
    label: "Medium",
    cpu: "4 CPU",
    memory: "8 GB RAM",
    storage: "10 GB storage",
    usagePrice: "$0.20",
  },
  large: {
    label: "Large",
    cpu: "8 CPU",
    memory: "16 GB RAM",
    storage: "20 GB storage",
    usagePrice: "$0.40",
  },
} as const;

export default function PricingTable() {
  const selectedSpec = BOX_SIZES.small;

  return (
    <div className="grid gap-6 md:grid-cols-3">
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

      <div className="flex flex-col items-center gap-4 rounded-4xl border-2 border-primary bg-white p-6 shadow sm:gap-6 sm:p-8 dark:border-bg-mute dark:bg-bg-mute">
        <div className="grow text-center">
          <h4 className="mb-4 py-1 text-xl font-bold text-primary-text">
            Pay as you go
          </h4>

          <h5 className="text-2xl font-semibold">{selectedSpec.usagePrice}</h5>
          <p className="text-sm text-text-mute">per active CPU hour</p>
        </div>

        <div className="grow">
          <div className="text-balance rounded-lg bg-bg-mute px-3 py-2 text-sm text-primary-text dark:text-text-mute">
            Pay only when your box is active. Choose the size that matches your
            workload.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Resources</p>
            <p className="font-semibold">
              {selectedSpec.cpu}, {selectedSpec.memory}
            </p>
          </div>
          <div className="py-3">
            <p className="text-text-mute">Included Storage</p>
            <p className="font-semibold">{selectedSpec.storage}</p>
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
            For teams that need custom limits, regional requirements, or
            dedicated support.
          </div>
        </div>

        <div className="w-full px-6 *:border-b *:border-bg-mute">
          <div className="py-3">
            <p className="text-text-mute">Box Sizes</p>
            <p className="font-semibold">Small, Medium, Large</p>
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
