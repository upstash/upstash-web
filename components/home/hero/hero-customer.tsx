import * as Logo from "components/home/hero/hero-customer-icons";
import Link from "next/link";

export default function HomeHeroPartner() {
  return (
    <div className="mt-16">
      <h5 className="text-sm opacity-20">Trusted by the best teams</h5>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
        {customers.map(({ name, url, icon }) => (
          <Link
            key={name}
            target="_blank"
            className="opacity-20 transition hover:opacity-100"
            title={name}
            href={url}
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
  );
}

const customers = [
  {
    name: "Vercel",
    url: "https://vercel.com",
    icon: <Logo.Vercel />,
  },
  {
    name: "Fly.io",
    url: "https://fly.io",
    icon: <Logo.Flyio />,
  },
  {
    name: "Supabase",
    url: "https://supabase.io",
    icon: <Logo.Supabase />,
  },
  {
    name: "Materialize",
    url: "https://materialize.com",
    icon: <Logo.Materialize />,
  },
  {
    name: "Hashnode",
    url: "https://hashnode.com",
    icon: <Logo.Hashnode />,
  },
  {
    name: "NZXT",
    url: "https://nzxt.com",
    icon: <Logo.Nzxt />,
  },
  {
    name: "Branch",
    url: "https://www.ourbranch.com",
    icon: <Logo.Ourbranch />,
  },
];
