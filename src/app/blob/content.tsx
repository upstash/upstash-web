import IconBlob from "@/components/icon-blob";
import type {
  SectionCtaProps,
  SectionFeaturesProps,
  SectionHeroProps,
  SectionUseCasesProps,
  SectionWhatIsProps,
} from "@/components/product-page/types";
import {
  IconBrandAws,
  IconCloudUpload,
  IconCode,
  IconCoin,
  IconLock,
  IconPlayerPause,
  IconPlus,
  IconShieldCheck,
  IconWorld,
} from "@tabler/icons-react";

export const HERO: SectionHeroProps = {
  icon: IconBlob,
  title: (
    <>
      <span className="block">Serverless file storage</span>{" "}
      <span className="block">for web developers</span>
    </>
  ),
  description: (
    <>
      Upstash Blob is S3-compatible object storage for Next.js and web apps.
      Upload straight from the browser with one route handler and a React hook,
      serve public files from a CDN worldwide, keep private ones behind signed
      URLs, and get 1 TB of free egress a month on pay-as-you-go. No regions to
      pick, no servers to run.
    </>
  ),
  gradient: "to-sky-400",
  primaryAction: {
    href: "https://console.upstash.com/blob",
    label: "Create Bucket",
    icon: <IconPlus size={24} />,
  },
  docsHref: "https://upstash.com/docs/blob/overall/quickstart",
  pricingHref: "/pricing/blob",
};

export const FEATURES: SectionFeaturesProps = {
  title: "Why Upstash Blob",
  description:
    "Object storage built for serverless apps and the browsers that talk to them.",
  items: [
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
      icon: <IconCode className="size-5" stroke={1.5} />,
      title: "Fully typesafe",
      desc: "TypeScript types connect your upload handler to your React hooks, with autocomplete for options, progress, and results.",
    },
    {
      icon: <IconCoin className="size-5" stroke={1.5} />,
      title: "Simple pricing",
      desc: "Egress is free up to 1 TB a month on pay as you go. Pay for storage and operations only. Uploads and deletes are free, and usage never rounds up.",
    },
  ],
};

// Internal links into the Blob docs build an object storage topic cluster.
export const USE_CASES: SectionUseCasesProps = {
  title: "What can you build with Blob?",
  description:
    "Common object storage use cases, with a guide to build each one.",
  items: [
    {
      title: "Avatars & profile images",
      desc: "One object per user at a stable path, served through a versioned URL that changes with the bytes.",
      href: "https://upstash.com/docs/blob/recipes/avatars",
    },
    {
      title: "Attachments",
      desc: "Chat, ticket, and issue attachments uploaded straight from the browser with a row written when they land.",
      href: "https://upstash.com/docs/blob/recipes/attachments",
    },
    {
      title: "Document libraries",
      desc: "Per-user PDF and file libraries with typed constraints on size and content type.",
      href: "https://upstash.com/docs/blob/recipes/private-documents",
    },
    {
      title: "Large video uploads",
      desc: "Multi-gigabyte uploads that pause, resume, and retry per part, with cleanup for abandoned parts.",
      href: "https://upstash.com/docs/blob/recipes/video",
    },
    {
      title: "Private reports & invoices",
      desc: "Files written by your server into a private bucket and read through short-lived signed URLs.",
      href: "https://upstash.com/docs/blob/reference/signing",
    },
    {
      title: "AI-generated media",
      desc: "Store images, audio, and files your agents and models produce, then serve them from the CDN.",
      href: "https://upstash.com/docs/blob/recipes/ai-images",
    },
  ],
};

export const WHAT_IS: SectionWhatIsProps = {
  title: "What is blob storage?",
  description: "A place to put files that does not care what is in them.",
  children: (
    <>
      <p>
        <strong>Blob storage</strong>, also called object storage, keeps files
        as objects in a flat namespace. Each object has a path, a body, a
        content type, and a little metadata. There is no filesystem to mount and
        no schema to design, which is why it is the standard home for images,
        documents, videos, backups, and anything else that does not belong in a
        database row.
      </p>
      <p>
        Most object stores expose an S3-style API and leave the rest to you:
        signing uploads, enforcing limits, handling multipart, cleaning up
        abandoned parts, and wiring a CDN in front. That glue is where the time
        goes.
      </p>
      <p>
        <strong>Upstash Blob</strong> ships that glue as an SDK. A bucket is
        global and replicated to a CDN, so there is no region to pick. The
        upload handler runs in your own route, so a browser can send bytes
        straight to storage while your server decides who may upload and records
        what landed. Underneath it is real S3-compatible storage, so the AWS SDK
        and every S3 tool still work.
      </p>
    </>
  ),
};

export const CTA: SectionCtaProps = {
  title: "Create your first bucket in seconds",
  description:
    "Start on the free tier with 1 GB of storage and 10 GB of bandwidth. No credit card required.",
  gradient: "to-sky-500",
  primaryAction: {
    href: "https://console.upstash.com/blob",
    label: "Create Bucket",
    icon: <IconPlus size={24} />,
  },
  pricingHref: "/pricing/blob",
};
