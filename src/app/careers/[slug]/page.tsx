import Bg from "@/components/bg";
import CareerHeader from "@/components/career/header";
import Container from "@/components/container";
import PageBodyGradient from "@/components/page-body-gradient";
import { Mdx } from "@/components/post/mdx";
import { SITE_URL } from "@/utils/const";
import { allJobs } from "@content";
import type { Job } from "@content";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allJobs
    .filter((job) => !job.draft)
    .map((job) => ({
      slug: job.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  const job = allJobs.find((job: Job) => job.slug === params.slug) as Job;
  const title = job.title;
  const description = job.summary;
  const url = `${SITE_URL}/careers/${job.slug}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title,
      description,
      siteName: title,
      images: "/og-home.jpg",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@upstash",
      creator: "@upstash",
      images: "/og-home.jpg",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const slug = params?.slug;
  const job = allJobs.find((job) => job.slug === slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="relative z-0">
      <Bg />

      <article>
        {/* Header */}
        <CareerHeader job={job} />

        {/* Body */}
        <div className="relative z-0 pt-10">
          <PageBodyGradient />

          <Container className="max-w-screen-md">
            <Mdx code={job.mdx} />
          </Container>
        </div>
      </article>
    </main>
  );
}
