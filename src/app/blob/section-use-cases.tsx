import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import { IconArrowUpRight } from "@tabler/icons-react";

export default function SectionUseCases() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">What can you build with Blob?</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Common object storage use cases, with a guide to build each one.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:gap-4">
          {USE_CASES.map(({ title, desc, href }, index) => (
            <a
              key={index}
              href={href}
              target="_blank"
              className={cx(
                "group flex flex-col gap-2 p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
                "transition hover:border-primary/40 hover:bg-white dark:hover:bg-white/5",
              )}
            >
              <h3 className="flex items-center gap-1 font-display text-lg font-semibold">
                {title}
                <IconArrowUpRight
                  size={18}
                  className="opacity-40 transition group-hover:opacity-100"
                />
              </h3>
              <p className="text-text-mute">{desc}</p>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Internal links into the Blob docs build an object storage topic cluster.
const USE_CASES = [
  {
    title: "Avatars & profile images",
    desc: "One object per user at a stable path, served through a versioned URL that changes with the bytes.",
    href: "https://upstash.com/docs/blob/formulas/overview",
  },
  {
    title: "Attachments",
    desc: "Chat, ticket, and issue attachments uploaded straight from the browser with a row written when they land.",
    href: "https://upstash.com/docs/blob/browser/upload-handler",
  },
  {
    title: "Document libraries",
    desc: "Per-user PDF and file libraries with typed constraints on size and content type.",
    href: "https://upstash.com/docs/blob/browser/constraints",
  },
  {
    title: "Large video uploads",
    desc: "Multi-gigabyte uploads that pause, resume, and retry per part, with cleanup for abandoned parts.",
    href: "https://upstash.com/docs/blob/browser/large-files",
  },
  {
    title: "Private reports & invoices",
    desc: "Files written by your server into a private bucket and read through short-lived signed URLs.",
    href: "https://upstash.com/docs/blob/overall/signing",
  },
  {
    title: "AI-generated media",
    desc: "Store images, audio, and files your agents and models produce, then serve them from the CDN.",
    href: "https://upstash.com/docs/blob/bucket/writing",
  },
];
