import { Metadata } from "next";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import { allJobs } from "contentlayer/generated";
import Link from "next/link";
import Bg from "@/components/bg";

const description =
  "Help us build the cutting edge data platform for the serverless era.";

export const metadata: Metadata = {
  title: "Careers",
  description,
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
                className="group/job-item grid rounded-lg bg-white/3 p-6 transition hover:bg-emerald-200/5 md:rounded-3xl md:p-8"
                href={`/careers/${job.slug}`}
              >
                <h2 className="font-display text-xl font-semibold text-emerald-400 group-hover/job-item:underline">
                  {job.title}
                </h2>

                <p className="mt-1 opacity-80">{job.summary}</p>

                <div className="mt-6 flex flex-wrap items-center gap-1">
                  {job.skills.map((skill: string) => (
                    <span
                      className="rounded bg-white/3 px-3 py-1 text-zinc-400"
                      key={skill}
                    >
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
