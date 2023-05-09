import { Metadata } from "next";
import Container from "@/components/container";
import PageHeaderTitle from "@/components/page-header-title";
import PageHeaderDesc from "@/components/page-header-desc";
import PageBodyGradient from "@/components/page-body-gradient";
import Bg from "@/components/bg";
import cx from "@/utils/cx";
import { HTMLAttributes } from "react";
import CopyButton from "@/components/copy-button";

export const metadata: Metadata = {
  title: "Brand Assets",
};

export default function HomePage() {
  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-16 md:pb-24 md:pt-16">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>Brand Assets</PageHeaderTitle>

            <PageHeaderDesc className="mt-2">
              Lorem ipsum dolor sit amet
            </PageHeaderDesc>
          </header>
        </Container>
      </section>

      {/* body */}
      <section className="relative z-0 py-10 md:py-20">
        <PageBodyGradient />

        <Container className="max-w-screen-lg">
          <div className="grid gap-6 md:grid-cols-5">
            {/**/}
            <LogoBox className="order-1 md:col-span-2">
              <img
                src="logo/upstash-icon-dark-bg.svg"
                alt="Upstash icon with dark background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-icon-dark-bg.png"
                svgURL="logo/upstash-icon-dark-bg.svg"
                copyCode="dad"
              />
            </LogoBox>
            {/**/}
            <LogoBox className="order-2 md:col-span-3">
              <img
                src="logo/upstash-dark-bg.svg"
                alt="Upstash Logo with dark background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-dark-bg.png"
                svgURL="logo/upstash-dark-bg.svg"
                copyCode="dad"
              />
            </LogoBox>
            {/**/}
            <LogoBox className="order-4 bg-zinc-100 md:order-3 md:col-span-3">
              <img
                src="logo/upstash-white-bg.svg"
                alt="Upstash Logo with white background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-white-bg.png"
                svgURL="logo/upstash-white-bg.svg"
                copyCode="dad"
              />
            </LogoBox>
            {/**/}
            <LogoBox className="order-3 bg-zinc-100 md:order-4 md:col-span-2">
              <img
                src="logo/upstash-icon-white-bg.svg"
                alt="Upstash icon with white background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-icon-white-bg.png"
                svgURL="logo/upstash-icon-white-bg.svg"
                copyCode="dad"
              />
            </LogoBox>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ActionButtons({
  className,
  copyCode,
  pngURL,
  svgURL,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  copyCode: string;
  pngURL: string;
  svgURL: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "grid place-items-center rounded-[inherit]",
        "inset-2 z-10 transition md:absolute md:bg-emerald-500/80 md:opacity-0",
        "group-hover/logo-box:opacity-100",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-px overflow-hidden rounded-full border border-zinc-200 bg-zinc-200 md:border-none">
        <a
          className="inline-flex h-10 w-14 items-center justify-center bg-white
          text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          href={pngURL}
          download
        >
          PNG
        </a>
        <a
          className="inline-flex h-10 w-14 items-center justify-center bg-white
          text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
          href={svgURL}
          download
        >
          SVG
        </a>
        <CopyButton
          className="h-10 w-14 bg-white text-sm text-zinc-950 hover:bg-zinc-200"
          code={copyCode}
        />
      </div>
    </div>
  );
}

function LogoBox({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { className?: string }) {
  return (
    <div
      className={cx(
        "group/logo-box relative flex flex-col items-center justify-center gap-6 py-14",
        "rounded-2xl border border-zinc-800 bg-zinc-950",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
