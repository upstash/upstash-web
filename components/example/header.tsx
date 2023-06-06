import type { Job } from "contentlayer/generated";
import Balancer from "react-wrap-balancer";
import Container from "@/components/container";
import Button from "@/components/button";
import { Example } from "@/utils/type";

type Props = {
  example: Example;
};

export default function ExampleHeader({ example }: Props) {
  return (
    <header className="py-20 text-center">
      <Container className="max-w-screen-lg">
        {/* title */}
        <h1 className="mx-4 mt-2 font-display text-4xl font-bold !leading-title md:text-6xl">
          <Balancer>{example.title}</Balancer>
        </h1>

        {/* meta */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {example.products.map((item) => {
            return (
              <div key={item} className="inline-flex gap-1 text-lg">
                <span className="opacity-40">Products:</span>
                <span>{item}</span>
              </div>
            );
          })}
        </div>

        <Button
          type="button"
          href="mailto:jobs@upstash.com"
          className="mt-10 bg-emerald-400 text-zinc-950"
        >
          Apply now
        </Button>
      </Container>
    </header>
  );
}
