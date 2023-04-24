import { Flyio, Supabase, Vercel } from "@/components/logo-partner";
import Link from "next/link";

export default function HomeHeroPartner() {
  return (
    <div className="mt-16">
      <h5 className="text-sm opacity-20">Trusted by the best teams</h5>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
        {[
          {
            name: "Vercel",
            url: "https://vercel.com",
            icon: <Vercel />,
          },
          {
            name: "Fly.io",
            url: "https://fly.io",
            icon: <Flyio />,
          },
          {
            name: "Supabase",
            url: "https://supabase.io",
            icon: <Supabase />,
          },
        ].map(({ name, url, icon }) => (
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
