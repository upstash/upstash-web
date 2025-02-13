import Button from "@/components/button";
import Container from "@/components/container";
import type { Job } from "@content";
import Balancer from "react-wrap-balancer";

type Props = {
  job: Job;
};

export default function CareerHeader({ job }: Props) {
  return (
    <header className="py-20 text-center">
      <Container className="max-w-screen-lg">
        {/* title */}
        <h1 className="mx-4 mt-2 font-display text-4xl font-bold !leading-title md:text-6xl">
          <Balancer>{job.title}</Balancer>
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

        <Button
          type="button"
          href="mailto:jobs@upstash.com"
          className="mt-10 bg-primary"
        >
          Apply now
        </Button>
      </Container>
    </header>
  );
}
