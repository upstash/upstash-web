import Bg from "@/components/bg";
import Container from "@/components/container";
import CopyButton from "@/components/copy-button";
import OutLink from "@/components/out-link";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";

const INSTALL_COMMAND =
  "npx skills add https://github.com/upstash/skills --skill upstash";

const START_REDIS_COMMAND = "curl -X POST https://upstash.com/start-redis";

export default function SectionSkills() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-md">
        <PageHeaderTitle as="h2">Build Redis with your AI agent</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Install the Upstash skill so Claude Code, Cursor, and other coding
          agents know how to build with Upstash Redis and every Upstash SDK.
        </PageHeaderDesc>

        <div
          className={cx(
            "mx-auto mt-10 flex w-fit max-w-full items-center gap-4 overflow-x-auto",
            "rounded-2xl border-2 border-bg-mute bg-bg-mute py-4 pl-5 pr-8",
          )}
        >
          <code className="whitespace-nowrap text-left font-mono text-sm text-text md:text-base">
            {INSTALL_COMMAND}
          </code>
          <CopyButton
            code={INSTALL_COMMAND}
            className="shrink-0 text-text-mute hover:text-primary"
          />
        </div>

        <div className="mt-6 flex justify-center">
          <OutLink href="https://github.com/upstash/skills">
            View the Upstash skills on GitHub
          </OutLink>
        </div>

        <PageHeaderDesc className="mt-12">
          Your agent can also create a free Redis database instantly - no
          signup or authentication required:
        </PageHeaderDesc>

        <div
          className={cx(
            "mx-auto mt-6 flex w-fit max-w-full items-center gap-4 overflow-x-auto",
            "rounded-2xl border-2 border-bg-mute bg-bg-mute py-4 pl-5 pr-8",
          )}
        >
          <code className="whitespace-nowrap text-left font-mono text-sm text-text md:text-base">
            {START_REDIS_COMMAND}
          </code>
          <CopyButton
            code={START_REDIS_COMMAND}
            className="shrink-0 text-text-mute hover:text-primary"
          />
        </div>

        <p className="mt-4 text-center text-sm text-text-mute">
          The response is markdown with credentials and a quickstart. Unclaimed
          databases are deleted after 3 days.
        </p>
      </Container>
    </section>
  );
}
