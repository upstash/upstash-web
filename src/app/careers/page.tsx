import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import { allJobs } from "@content";
import { Metadata } from "next";
import Link from "next/link";

const description =
  "Help us build the cutting edge data platform for the serverless era.";

export const metadata: Metadata = {
  title: "Careers",
  description,
  alternates: {
    canonical: "/careers",
  },
};

export default function HomePage() {
  const jobs = allJobs.filter((o) => !o.draft);

  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-10 md:py-20">
        <Container className="max-w-screen-lg">
          <header>
            <PageHeaderTitle>Join Upstash</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">{description}</PageHeaderDesc>
          </header>
        </Container>
      </section>

      <section className="pb-40">
        <Container className="max-w-screen-md space-y-6 text-left">
          {jobs.map((job) => {
            return (
              <Link
                key={job.slug}
                className="group grid rounded-lg bg-bg-mute p-6 transition md:rounded-3xl md:p-8"
                href={`/careers/${job.slug}`}
              >
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-xl font-semibold text-primary-text group-hover:underline">
                    {job.title}
                  </h2>

                  {job.frozen && (
                    <span className="shrink-0 rounded-full border border-primary/20 bg-bg-mute px-2.5 py-0.5 text-xs text-text-mute">
                      Not actively hiring
                    </span>
                  )}
                </div>

                <p className="mt-1 opacity-80">{job.summary}</p>

                <div className="mt-6 flex flex-wrap items-center gap-1">
                  {job.skills.map((skill: string) => (
                    <span className="rounded bg-bg px-3 py-1" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </Container>
      </section>
    </main>
  );
}
