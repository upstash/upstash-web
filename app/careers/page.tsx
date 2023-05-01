import { Metadata } from "next";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import PageBodyGradient from "@/components/page-body-gradient";
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

      <section className="relative z-0 py-10 md:py-20">
        <PageBodyGradient />

        <Container className="max-w-screen-sm">
          {jobs.map((job) => {
            return (
              <div className="text-left" key={job.slug}>
                <h2>
                  <Link href={`/careers/${job.slug}`}>{job.title}</Link>
                </h2>

                <p className="">{job.summary}</p>

                <div className="flex flex-wrap items-center gap-1">
                  {job.skills.map((skill: string) => (
                    <span className="rounded bg-white/5 px-2 py-1" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </main>
  );
}
