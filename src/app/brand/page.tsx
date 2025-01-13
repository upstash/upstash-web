import Bg from "@/components/bg";
import Container from "@/components/container";
import CopyButton from "@/components/copy-button";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import { Metadata } from "next";
import { HTMLAttributes } from "react";

export const metadata: Metadata = {
  title: "Brand Assets",
};

export default function HomePage() {
  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-16 md:py-20">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>Brand Assets</PageHeaderTitle>
          </header>
        </Container>
      </section>

      {/* body */}
      <section>
        <Container className="max-w-screen-lg">
          <div className="grid gap-6 md:grid-cols-12">
            {/*upstash-dark*/}
            <LogoBox className="md:col-span-4">
              <img
                src="logo/upstash-icon-dark-bg.svg"
                alt="Upstash icon with dark background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-icon-dark-bg.png"
                svgURL="logo/upstash-icon-dark-bg.svg"
              />
            </LogoBox>
            {/*upstash-dark-logo*/}
            <LogoBox className="md:col-span-8">
              <img
                src="logo/upstash-dark-bg.svg"
                alt="Upstash Logo with dark background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-dark-bg.png"
                svgURL="logo/upstash-dark-bg.svg"
              />
            </LogoBox>

            {/*upstash-light*/}
            <LogoBox className="bg-zinc-100 md:col-span-8">
              <img
                src="logo/upstash-white-bg.svg"
                alt="Upstash Logo with white background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-white-bg.png"
                svgURL="logo/upstash-white-bg.svg"
              />
            </LogoBox>
            {/*upstash-light-logo*/}
            <LogoBox className="bg-zinc-100 md:col-span-4">
              <img
                src="logo/upstash-icon-white-bg.svg"
                alt="Upstash icon with white background"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/upstash-icon-white-bg.png"
                svgURL="logo/upstash-icon-white-bg.svg"
              />
            </LogoBox>
            {/*light-color1*/}
            <LogoBox className="bg-emerald-300 py-6 md:col-span-6">
              <span className="font-semibold text-black">#6ee7b7</span>
              <ActionButtons copyCode="#6ee7b7" />
            </LogoBox>
            {/*light-color2*/}
            <LogoBox className="bg-emerald-500 py-6 md:col-span-6">
              <span className="font-semibold text-black">#10b981</span>
              <ActionButtons copyCode="#10b981" />
            </LogoBox>

            {/*redis*/}
            <LogoBox className="md:col-span-6">
              <img
                src="logo/redis-icon.svg"
                alt="Upstash Redis icon"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/redis-icon.png"
                svgURL="logo/redis-icon.svg"
              />
            </LogoBox>
            {/*vector*/}
            <LogoBox className="md:col-span-6">
              <img
                src="logo/vector-icon.svg"
                alt="Upstash Vector icon"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/vector-icon.png"
                svgURL="logo/vector-icon.svg"
              />
            </LogoBox>
            {/*qstash*/}
            <LogoBox className="md:col-span-6">
              <img
                src="logo/qstash-icon.svg"
                alt="Upstash QStash icon"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/qstash-icon.png"
                svgURL="logo/qstash-icon.svg"
              />
            </LogoBox>
            {/**/}
            {/*workflow*/}
            <LogoBox className="md:col-span-6">
              <img
                src="logo/workflow-icon.svg"
                alt="Upstash Workflow icon"
                className="h-12 md:h-16"
              />
              <ActionButtons
                pngURL="logo/workflow-icon.png"
                svgURL="logo/workflow-icon.svg"
              />
            </LogoBox>
            {/**/}
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
  copyCode?: string;
  pngURL?: string;
  svgURL?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "grid place-items-center rounded-lg",
        "inset-2 z-10 transition md:absolute md:bg-emerald-500/80 md:opacity-0",
        "group-hover:opacity-100",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-px overflow-hidden rounded-full border border-zinc-200 bg-zinc-200 md:border-none">
        {pngURL && (
          <a
            className="inline-flex h-10 w-14 items-center justify-center bg-white text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            href={pngURL}
            download
          >
            PNG
          </a>
        )}
        {svgURL && (
          <a
            className="inline-flex h-10 w-14 items-center justify-center bg-white text-sm font-medium text-zinc-950 transition hover:bg-zinc-200"
            href={svgURL}
            download
          >
            SVG
          </a>
        )}
        {copyCode && (
          <CopyButton
            className="h-10 w-14 bg-white text-sm text-zinc-950 hover:bg-zinc-200"
            code={copyCode}
          />
        )}
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
        "group relative flex flex-col items-center justify-center gap-6 py-14",
        "rounded-2xl border border-zinc-800 bg-zinc-950",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
