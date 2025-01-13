import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales",
  description: "Unlock the full potential of Upstash for your business.",
};

export default function HomePage() {
  return (
    <main className="relative z-0 py-16 text-center md:py-24 md:text-left">
      <Bg />

      <Container>
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div className="grid gap-4">
            <h1 className="font-display text-4xl font-semibold leading-title md:text-5xl">
              Let's Connect
            </h1>
            <p className="text-balance text-lg opacity-60 md:text-xl">
              We're happy to assist you with any questions about our technology,
              pricing plans, custom contract options, and migrations assistance.
            </p>

            <p>
              <Button asChild variant="primary">
                <a target="_blank" href="">
                  Book a meeting directly {`->`}
                </a>
              </Button>
            </p>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-left shadow-xl">
            <form className="grid gap-6 md:grid-cols-2 md:gap-8">
              {/* name, email, message */}
              <div className="grid gap-2">
                <label htmlFor="name">Name</label>
                <input
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-2"
                  type="text"
                  id="name"
                  name="name"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-2"
                  type="email"
                  id="email"
                  name="email"
                />
              </div>

              <div className="col-span-2 grid gap-2">
                <label htmlFor="message">Message</label>
                <textarea
                  className="block w-full rounded-lg border border-zinc-300 px-4 py-2"
                  id="message"
                  name="message"
                />
              </div>

              <div className="col-span-2">
                <p>
                  By submitting you agree to the Terms Service and acknowledge
                  the Privacy Policy.
                </p>

                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}
