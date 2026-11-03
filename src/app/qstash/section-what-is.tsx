import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export default function SectionWhatIs() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md text-left">
        <PageHeaderTitle as="h2" className="text-center">
          What is a message queue?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3 text-center">
          A buffer between the code that asks for work and the code that does
          it.
        </PageHeaderDesc>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-text-mute">
          <p>
            A <strong>message queue</strong> lets one part of a system hand off
            work to another without waiting for it to finish. The producer
            publishes a message, the queue stores it durably, and a consumer
            processes it when it can. If the consumer is slow or down, the
            message waits instead of being lost.
          </p>
          <p>
            Traditional queues assume long-running consumers that hold a
            connection open and poll for messages. Serverless functions do not
            work that way: they start on a request, run briefly, and stop. That
            mismatch is why background jobs and cron are awkward on platforms
            like Vercel and Cloudflare Workers.
          </p>
          <p>
            <strong>Upstash QStash</strong> flips the model. Instead of your
            code pulling messages, QStash pushes each one to your endpoint as an
            HTTP request and keeps retrying until it succeeds. Anything that can
            serve HTTP can be a consumer, and every request is signed so your
            endpoint can verify it came from QStash.
          </p>
        </div>
      </Container>
    </section>
  );
}
