import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconBrandAws,
  IconCloudUpload,
  IconCoin,
  IconLock,
  IconPlayerPause,
  IconShieldCheck,
  IconWebhook,
  IconWorld,
} from "@tabler/icons-react";
import React from "react";

export default function SectionFeatures() {
  return (
    <section className="relative py-10 md:py-20">
      <Bg className="top-32 h-1/2" />

      <Container className="max-w-screen-xl">
        <PageHeaderTitle as="h2">Why Upstash Blob</PageHeaderTitle>
        <PageHeaderDesc className="mt-3">
          Object storage built for serverless apps and the browsers that talk
          to them.
        </PageHeaderDesc>

        <div className="mt-12 grid gap-3 text-left sm:grid-cols-2 md:mt-16 md:gap-4 xl:grid-cols-4">
          {FEATURES.map(({ title, desc, icon }, index) => (
            <div
              key={index}
              className={cx(
                "flex flex-col gap-3 p-5 md:p-6",
                "rounded-3xl border-2 border-bg-mute bg-bg-mute",
              )}
            >
              <span
                className={cx(
                  "inline-flex size-10 shrink-0 items-center justify-center",
                  "rounded-full bg-primary text-white dark:bg-white/10",
                )}
              >
                {icon}
              </span>
              <h3 className="whitespace-nowrap font-display text-lg font-semibold">
                {title}
              </h3>
              <p className="text-text-mute">{desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const FEATURES = [
  {
    icon: <IconCloudUpload className="size-5" stroke={1.5} />,
    title: "Direct browser uploads",
    desc: "Bytes go straight from the browser to storage. Your server only authorizes, signs, and records the upload.",
  },
  {
    icon: <IconWorld className="size-5" stroke={1.5} />,
    title: "Global CDN, no regions",
    desc: "Every file is replicated to a CDN worldwide. Public buckets get a URL out of the box, with no region to choose.",
  },
  {
    icon: <IconBrandAws className="size-5" stroke={1.5} />,
    title: "S3 compatible",
    desc: "Exchange your bucket token for temporary S3 credentials and use the AWS SDK, the AWS CLI, or any S3 tool.",
  },
  {
    icon: <IconLock className="size-5" stroke={1.5} />,
    title: "Public or private",
    desc: "Public buckets serve from a URL anyone can read. Private buckets have no URL and every read is signed.",
  },
  {
    icon: <IconPlayerPause className="size-5" stroke={1.5} />,
    title: "Resumable uploads",
    desc: "Large files go up as multipart with pause, resume, cancel, and per-part retry built into the SDK.",
  },
  {
    icon: <IconShieldCheck className="size-5" stroke={1.5} />,
    title: "Server-enforced limits",
    desc: "Declare size and content type constraints per route. The server stays authoritative and the file picker follows.",
  },
  {
    icon: <IconWebhook className="size-5" stroke={1.5} />,
    title: "Completion in your route",
    desc: "A callback runs in your own route once the object exists. Works on localhost, no tunnel or webhook needed.",
  },
  {
    icon: <IconCoin className="size-5" stroke={1.5} />,
    title: "Simple pricing",
    desc: "Four meters: storage, operations, and outbound bandwidth. Uploads and deletes are free, and nothing rounds up.",
  },
];
