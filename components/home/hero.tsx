import cx from "@/utils/cx";
import Container from "@/components/container";
import { Flyio, Supabase, Vercel } from "@/components/logo-partner";
import Button from "@/components/button";
import Balancer from "react-wrap-balancer";
import Link from "next/link";

export default function HomeHero() {
  return (
    <section className="relative z-0 py-10">
      <Container>
        <h1
          className={cx(
            "inline-flex flex-col gap-2",
            "font-display text-6xl font-bold leading-none md:text-[7rem]",
            "bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent"
          )}
        >
          <span>Serverless</span>
          <span>Data Platform</span>
        </h1>

        <div className="mt-16 grid grid-cols-3 gap-1">
          <HeroProduct
            title="Redis"
            desc="Serverless database service compatible with Redis® API"
            button={{
              href: "https://console.upstash.com/redis?create=tru",
              text: "Create Database",
            }}
          />
          <HeroProduct
            title="Kafka"
            desc="Serverless database service compatible with Redis® API"
            button={{
              href: "https://console.upstash.com/kafka?create=tru",
              text: "Create Cluster",
            }}
          />
          <HeroProduct
            title="QStash"
            desc="Serverless database service compatible with Redis® API"
            button={{
              href: "https://console.upstash.com/qstash",
              text: "Publish Messages",
            }}
          />
        </div>

        <div className="mt-20">
          <h5 className="text-sm opacity-40">Trusted by the best teams</h5>
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
                className="opacity-40 transition hover:opacity-100"
                title={name}
                href={url}
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </Container>

      <div
        className={cx(
          "absolute left-1/2 top-1/2 -z-10 h-[400px] w-[800px]",
          "bg-emerald-500 opacity-10 blur-[100px]",
          "-translate-x-1/2 -translate-y-1/2"
        )}
      />
    </section>
  );
}

function HeroProduct({
  title,
  desc,
  button: { href, text, ...buttonProps },
}: {
  title: string;
  desc: string;
  button: { href: string; text: string };
}) {
  return (
    <div
      className={cx(
        "flex flex-col items-center bg-white/10 px-6 py-8",
        "backdrop-blur-xl",
        "first:rounded-l-[2.6rem] last:rounded-r-[2.6rem]"
      )}
    >
      <h3 className="font-display text-2xl font-medium leading-none">
        {title}
      </h3>
      <p className="mt-2 opacity-60">
        <Balancer>{desc}</Balancer>
      </p>
      <Button
        href={href}
        {...buttonProps}
        className="mt-6 bg-zinc-50 font-medium text-zinc-950"
      >
        {text}
      </Button>
    </div>
  );
}
