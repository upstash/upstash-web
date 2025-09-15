import Bg from "@/components/bg";
import Container from "@/components/container";
import PageBodyGradient from "@/components/page-body-gradient";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { ApplyNow } from "./apply-now";
import { Benefits } from "./benefits";

const Page = () => {
  return (
    <main className="relative z-0 text-center">
      <Bg className="opacity-10" />
      <section className="py-16 md:py-24">
        <Container className="flex max-w-screen-lg flex-col items-center gap-6">
          {/* header */}
          <header>
            <PageHeaderTitle>Upstash Open Source Program</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              We support open-source projects building on Upstash with credit
              grants and exclusive access to support.
            </PageHeaderDesc>
          </header>

          <div className="mt-16 max-w-md text-left">
            <img
              alt=""
              src="/open-source/josh.jpg"
              className="ring-3 z-30 float-left mb-2 mr-5 sm:mr-7 inline-block size-16 sm:size-24 shrink-0 rotate-2 rounded-xl shadow-lg outline -outline-offset-1 outline-black/5 ring-neutral-100"
            />

            <p className="text-xl font-semibold">Nice to meet you! ✌️</p>

            <p className="mt-4 opacity-60 inline sm:block">
              I'm Josh and I lead our open-source program.
            </p>

            <p className="mt-0 sm:mt-6 inline sm:block">
              <span className="opacity-60">
                If you have any questions about Upstash, our open-source program
                or just want to chat, you can always reach me directly
              </span>{" "}
              <span className="underline opacity-80">@joshtriedcoding</span>
              <span className="opacity-60">.</span>
            </p>
          </div>
        </Container>
      </section>

      <section className="relative z-0 py-16 md:py-32">
        <PageBodyGradient />

        <Container className="max-w-screen-lg">
          <header>
            <PageHeaderTitle as="h2">Program Benefits</PageHeaderTitle>
            <PageHeaderDesc className="mt-4">
              Direct access to support, technical help, co-marketing
              opportunities and much more.
            </PageHeaderDesc>
          </header>
        </Container>

        <div className="mt-12 md:mt-24">
          <Benefits />
        </div>
      </section>

      <section className="relative z-0 py-16 md:py-32">
        <PageBodyGradient />

        <Container className="max-w-screen-lg">
          <header>
            <PageHeaderTitle as="h2">Apply now</PageHeaderTitle>
            <PageHeaderDesc className="mt-4">
              Applications are reviewed on a rolling basis. Open until September
              29th.
            </PageHeaderDesc>
          </header>
        </Container>

        <div className="mx-auto max-w-lg">
          <ApplyNow />
        </div>
      </section>
    </main>
  );
};

export default Page;
