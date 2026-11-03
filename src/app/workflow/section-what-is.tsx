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
          What is durable execution?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3 text-center">
          Code that finishes what it started, even when the machine running it
          does not.
        </PageHeaderDesc>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-text-mute">
          <p>
            <strong>Durable execution</strong> means a function's progress is
            saved as it runs. The work is split into steps, and each step's
            result is recorded once it completes. If the process crashes, times
            out, or is redeployed halfway through, it resumes from the last
            completed step instead of starting over or leaving work half done.
          </p>
          <p>
            Serverless functions are the opposite by default. They have short
            time limits, keep no state between invocations, and a failure in the
            middle of a multi-step job usually means retrying everything or
            cleaning up by hand. Teams end up building their own queues, state
            tables, and retry logic around them.
          </p>
          <p>
            <strong>Upstash Workflow</strong> provides that layer on top of
            QStash. Your workflow is an ordinary endpoint in your app. Workflow
            calls it once per step, passes in the results of earlier steps, and
            retries any step that fails. Sleeps and waits use no compute while
            they last, because nothing is running.
          </p>
        </div>
      </Container>
    </section>
  );
}
