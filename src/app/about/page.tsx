import { Metadata } from "next";

import Balancer from "react-wrap-balancer";

import Bg from "@/components/bg";
import Container from "@/components/container";
import * as AboutIcon from "@/components/investor/icons";
import Investors from "@/components/investor/investors";
import PageBodyGradient from "@/components/page-body-gradient";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";

export const metadata: Metadata = {
  title: "About",
  description: "We manage everything for you.",
};

export default function HomePage() {
  return (
    <main className="relative z-0 text-center">
      <Bg />

      <section className="py-16 md:pb-32 md:pt-20">
        <Container className="max-w-screen-lg">
          {/* header */}
          <header>
            <PageHeaderTitle>
              Data Platform
              <br />
              for Developers
            </PageHeaderTitle>

            <PageHeaderDesc className="mt-2">
              <span className="grid gap-1 md:gap-2">
                <span>We manage everything for you.</span>
                <span>You focus on more important things.</span>
                <span>
                  With per-request pricing, you pay only for what you use.
                </span>
              </span>
            </PageHeaderDesc>
          </header>

          {/* mission */}
          <div className="mt-10 grid gap-6 md:mt-20 md:grid-cols-3">
            {MISSIONS.map((mission) => {
              return (
                <div key={mission.title} className="flex flex-col items-center">
                  {mission.icon}

                  <h3 className="mt-4 font-display text-xl font-semibold">
                    {mission.title}
                  </h3>
                  <p className="mx-12 mt-2 opacity-60 md:mx-6">
                    <Balancer>{mission.desc}</Balancer>
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="relative z-0 py-16 md:py-32">
        <PageBodyGradient />

        <Container className="max-w-screen-lg">
          <header>
            <PageHeaderTitle as="h2">Our Investors</PageHeaderTitle>
            <PageHeaderDesc className="mt-4">
              We are fortunate to work with some of the best investors in the
              world. Chances are you are already using the products they helped
              to create.
            </PageHeaderDesc>
          </header>

          <div className="mt-12 md:mt-24">
            <Investors />
          </div>
        </Container>
      </section>
    </main>
  );
}

const MISSIONS = [
  {
    title: "Fast",
    desc: "We understand that every millisecond matters to you.",
    icon: (
      <AboutIcon.Fast className="text-[60px] text-emerald-400 md:text-[70px]" />
    ),
  },
  {
    title: "Simple",
    desc: "Keep the things as simple as possible but not simpler.",
    icon: (
      <AboutIcon.Simple className="text-[60px] text-emerald-400 md:text-[70px]" />
    ),
  },
  {
    title: "Robust",
    desc: "We aim to earn your trust with robust solutions.",
    icon: (
      <AboutIcon.Robust className="text-[60px] text-emerald-400 md:text-[70px]" />
    ),
  },
];
