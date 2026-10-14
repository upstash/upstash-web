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
          What is an AI agent sandbox?
        </PageHeaderTitle>
        <PageHeaderDesc className="mt-3 text-center">
          A computer the agent can use, without access to yours.
        </PageHeaderDesc>

        <div className="mt-10 space-y-5 text-lg leading-relaxed text-text-mute">
          <p>
            An <strong>AI agent sandbox</strong> is an isolated environment
            where an agent runs the code it writes. Coding agents like Claude
            Code and Codex install packages, run builds and execute commands
            with real permissions. On a laptop or a shared server, one wrong
            command or one malicious package can reach your files, your
            credentials and your network. In a sandbox, the worst it can break
            is a disposable machine.
          </p>
          <p>
            Most sandboxes stop there: they give you an isolated machine and
            leave the rest to you. You install the agent, stream and parse its
            output, keep its files between sessions, run git, add a browser, and
            track what each run costs. That integration work is where the time
            goes.
          </p>
          <p>
            <strong>Upstash Box</strong> ships it. Each box is an isolated
            container with the coding agent already inside, a workspace that
            persists, git with pull requests, a headless browser and cron
            schedules, all driven from the SDK. Boxes pause when idle and bill
            active CPU only, so an agent that spends most of its time waiting on
            the model costs little to keep around.
          </p>
        </div>
      </Container>
    </section>
  );
}
