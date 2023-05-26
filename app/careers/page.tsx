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

      <section className="">
        <Container className="max-w-screen-md text-left">
          {jobs.map((job) => {
            console.log(job.slug)
            return (
              <Link
                key={job.slug}
                className="grid p-6 transition rounded-lg group/job-item bg-white/03 hover:bg-emerald-200/5 md:rounded-3xl md:p-8"
                href={`/careers/${job.slug}`}
              >
                <h2
                  className="text-xl font-semibold font-display text-emerald-400 group-hover/job-item:underline"
                >
                  {job.title}
                </h2>

                <p className="mt-1 opacity-80">{job.summary}</p>

                <div className="flex flex-wrap items-center gap-1 mt-6">
                  {job.skills.map((skill: string) => (
                    <span
                      className="px-3 py-1 rounded bg-white/03 text-zinc-400"
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
