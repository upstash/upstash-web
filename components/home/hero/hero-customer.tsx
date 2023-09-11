import * as Logo from "components/home/hero/hero-customer-icons";
import cx from "@/utils/cx";

export default function HomeHeroPartner() {
  return (
    <>
      {/* title */}
      <h5 className="text-sm opacity-40">Trusted by the best teams</h5>

      {/* logos */}
      <div className={cx("relative -mx-6 mt-6 overflow-hidden md:mx-0")}>
        <div
          className="inline-block overflow-hidden whitespace-nowrap md:!animate-none"
          style={{
            animationDuration: "20s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationName: "animate-slide",
          }}
        >
          <div className="inline-block">
            <Logos />
          </div>
          <div className="inline-block">
            <Logos className="md:hidden" />
          </div>
        </div>
      </div>
    </>
  );
}

function Logos({ className }: { className?: string }) {
  return (
    <div
      className={cx(
        "overflow-hidden whitespace-nowrap",
        "flex-wrap items-center justify-center gap-x-10 gap-y-6",
        "md:flex",
        className
      )}
    >
      {customers.map(({ name, url, icon }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          className="mx-4 inline-flex align-middle opacity-40 transition hover:scale-105 hover:opacity-100 md:mx-0"
          title={name}
        >
          {icon}
        </a>
      ))}
    </div>
  );
}

const customers = [
  {
    name: "Branch",
    url: "https://www.ourbranch.com",
    icon: <Logo.Ourbranch />,
  },
  {
    name: "NZXT",
    url: "https://nzxt.com",
    icon: <Logo.Nzxt />,
  },
  {
    name: "Fly.io",
    url: "https://fly.io",
    icon: <Logo.Flyio />,
  },
  {
    name: "Vercel",
    url: "https://vercel.com",
    icon: <Logo.Vercel />,
  },
  {
    name: "Supabase",
    url: "https://supabase.io",
    icon: <Logo.Supabase />,
  },
  {
    name: "Maker.co",
    url: "https://www.maker.co",
    icon: <Logo.Maker />,
  },
  {
    name: "Materialize",
    url: "https://materialize.com",
    icon: <Logo.Materialize />,
  },
  {
    name: "Tinybird",
    url: "https://tinybird.co",
    icon: <Logo.Tinybird />,
  },
  {
    name: "Hashnode",
    url: "https://hashnode.com",
    icon: <Logo.Hashnode />,
  },
];
