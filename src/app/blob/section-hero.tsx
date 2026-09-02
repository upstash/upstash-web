import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import IconBlob from "@/components/icon-blob";
import cx from "@/utils/cx";
import { IconNotes, IconPlus, IconTag } from "@tabler/icons-react";
import Link from "next/link";

export default function SectionHero() {
  return (
    <section className="relative py-10 md:py-24">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-lg">
        <div className="grid place-items-center">
          <h1
            className={cx(
              "flex flex-col items-center gap-4 md:gap-6",
              "text-center font-display text-4xl font-bold md:text-7xl",
              "bg-gradient-to-r bg-clip-text text-transparent",
              "from-primary-text via-primary to-sky-400",
            )}
          >
            <IconBlob className="size-12 shrink-0 md:size-20" />
            <span>
              <span className="block">Serverless Object Storage</span>
              <span className="block">with a Global CDN</span>
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-lg text-text-mute md:text-2xl">
            Upstash Blob is S3-compatible object storage for your files. Upload
            straight from the browser, serve public files from a CDN worldwide,
            keep private ones behind signed URLs, and pay only for what you
            store and serve. No regions to pick, no servers to run.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <a href="https://console.upstash.com/blob" target="_blank">
              <Button variant="primary" className="h-[42px] px-5">
                Create Bucket
                <IconPlus size={24} />
              </Button>
            </a>
            <a href="https://upstash.com/docs/blob" target="_blank">
              <Button variant="defaultDark" className="h-[42px] px-5">
                Documentation
                <IconNotes size={24} />
              </Button>
            </a>
            <Link href="/pricing/blob">
              <Button variant="default" className="h-[42px] px-5">
                View Pricing
                <IconTag size={24} />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
