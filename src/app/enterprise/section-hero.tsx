import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import cx from "@/utils/cx";
import Link from "next/link";

export default function SectionHero() {
  return (
    <section className="relative py-10 md:py-24">
      <Bg className="opacity-20" />

      <Container className="max-w-screen-lg">
        <div className="grid">
          <h1 className="mb-4 font-display text-xl uppercase tracking-wider text-text-mute md:text-2xl">
            Enterprise
          </h1>

          <h2
            className={cx(
              "font-display text-4xl font-bold md:text-7xl",
              "bg-gradient-to-r bg-clip-text text-transparent",
              "from-emerald-800 via-emerald-500 to-amber-500",
            )}
          >
            Unlock the Full Potential of Upstash for Your Business
          </h2>

          <p className="mt-4 text-balance text-lg text-text-mute md:text-2xl">
            Upstash empowers businesses to scale with our serverless data
            platform. It offers flexibility, performance, and security, enabling
            faster innovation and focus on what matters.
          </p>

          <div className="mt-10">
            <Button asChild variant="primary">
              <Link href="/enterprise">Learn More</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
