import Button from "@/components/button";
import Container from "@/components/container";
import type { Job } from "@content";
import { IconArrowUpRight } from "@tabler/icons-react";

type Props = {
  job: Job;
};

export default function CareerHeader({ job }: Props) {
  return (
    <header className="py-20 text-center">
      <Container className="max-w-screen-lg">
        {/* title */}
        <h1 className="mx-4 mt-2 text-balance font-display text-4xl font-bold !leading-title md:text-6xl">
          {job.title}
        </h1>

        {/* meta */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {[
            { title: "Experience", value: job.experience },
            { title: "Job type", value: job.how },
            { title: "Location", value: job.location },
          ].map((o) => {
            return (
              <div key={o.title} className="inline-flex gap-1">
                <span className="opacity-60">{o.title}:</span>
                <span className="font-semibold">{o.value}</span>
              </div>
            );
          })}
        </div>

        {/* skills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {job.skills.map((skill: string) => (
            <span className="rounded bg-bg-mute px-3 py-1" key={skill}>
              {skill}
            </span>
          ))}
        </div>

        <Button asChild variant="primary" className="mt-10">
          <a href="mailto:jobs@upstash.com" target="_blank">
            Apply now <IconArrowUpRight size={20} />
          </a>
        </Button>
      </Container>
    </header>
  );
}
