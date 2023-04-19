import cx from "@/utils/cx";
import Container from "@/components/container";
import Button from "@/components/button";
import Balancer from "react-wrap-balancer";

export default function HomeHero() {
  return (
    <section className="py-10">
      <Container>
        <h1
          className={cx(
            "inline-flex flex-col gap-2 font-display text-6xl font-bold leading-none md:text-[6.8rem]",
            "bg-gradient-to-r from-emerald-400 to-emerald-100 bg-clip-text text-transparent"
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
              href: "/docs/redis",
              text: "Create Database",
            }}
          />
          <HeroProduct
            title="Kafka"
            desc="Serverless database service compatible with Redis® API"
            button={{
              href: "/docs/redis",
              text: "Create Cluster",
            }}
          />
          <HeroProduct
            title="QStash"
            desc="Serverless database service compatible with Redis® API"
            button={{
              href: "/docs/redis",
              text: "Publish Messages",
            }}
          />
        </div>
      </Container>
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
        "flex flex-col items-center bg-white bg-opacity-10 px-6 py-8",
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
