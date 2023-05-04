import * as Logo from "components/home/hero/hero-customer-icons";
import { motion } from "framer-motion";

export default function HomeHeroPartner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="mt-16"
    >
      {/* title */}
      <h5 className="text-sm opacity-40 md:opacity-20">
        Trusted by the best teams
      </h5>

      {/* logos */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
        {customers.map(({ name, url, icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            className="opacity-40 transition hover:scale-105 hover:opacity-80 md:opacity-20"
            title={name}
          >
            {icon}
          </a>
        ))}
      </div>
    </motion.div>
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
    name: "NZXT",
    url: "https://nzxt.com",
    icon: <Logo.Nzxt />,
  },
  {
    name: "Branch",
    url: "https://www.ourbranch.com",
    icon: <Logo.Ourbranch />,
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
];
