import cx from "@/utils/cx";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export default function PricingTableProductionPack() {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 rounded-3xl border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-white px-16 py-10 text-center text-purple-800 md:grid-cols-2 md:flex-row md:items-start md:gap-0 md:text-left dark:border-purple-600/20 dark:bg-gradient-to-r dark:from-purple-950/10 dark:to-purple-900/10 dark:text-purple-200">
      <header>
        <h3 className="text-xl font-semibold">Prod Pack</h3>
        <h5 className="whitespace-normal opacity-80 lg:whitespace-nowrap">
          Recommended for production use
        </h5>
        <ProdPackButton className="mt-3 hidden md:block" />
      </header>

      <div className="h-full w-full lg:pl-8">
        <ul className="flex flex-shrink flex-wrap items-center justify-center gap-1 md:items-start md:justify-start">
          {[
            "Uptime SLA",
            "Encryption at Rest",
            "SOC-2",
            "Prometheus",
            "Datadog",
          ].map((value) => {
            return (
              <li
                key={value}
                className="flex items-center gap-1 whitespace-nowrap rounded-full border border-purple-300 bg-purple-50 py-1 pl-2 pr-3 text-purple-800 dark:border-purple-300 dark:bg-purple-200 dark:text-purple-950"
              >
                <IconCircleCheckFilled size={20} /> {value}
              </li>
            );
          })}
        </ul>
      </div>
      <ProdPackButton className="block justify-self-center md:hidden" />
    </div>
  );
}

const ProdPackButton = ({ className }: { className?: string }) => {
  return (
    <div
      className={cx(
        "w-fit rounded-xl bg-purple-200 px-4 py-2 font-medium text-purple-800 dark:bg-purple-50",
        className,
      )}
    >
      +$200/month
    </div>
  );
};
