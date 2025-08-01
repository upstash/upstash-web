import Bg from "@/components/bg";
import Container from "@/components/container";
import { LogoBranch } from "@/components/customers/logo-branch";
import { LogoDubsh } from "@/components/customers/logo-dubsh";
import { LogoFly } from "@/components/customers/logo-fly";
import { LogoGail } from "@/components/customers/logo-gail";
import { LogoHashnode } from "@/components/customers/logo-hashnode";
import { LogoHumata } from "@/components/customers/logo-humata";
import { LogoMaker } from "@/components/customers/logo-maker";
import { LogoNiftykit } from "@/components/customers/logo-niftykit";
import { LogoNzxt } from "@/components/customers/logo-nzxt";
import { LogoSupabase } from "@/components/customers/logo-supabase";
import { LogoTFashion } from "@/components/customers/logo-tfashion";
import { LogoTinybird } from "@/components/customers/logo-tinybird";
import { LogoVercel } from "@/components/customers/logo-vercel";
import { LogoZapier } from "@/components/customers/logo-zapier";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import cx from "@/utils/cx";

export default function HomeHeroCustomer() {
  return (
    <section className="relative z-10 py-8 md:py-16">
      <Bg />

      <Container>
        {/* title */}
        <SectionHeader>
          <SectionHeaderTitle>Meet our Customers</SectionHeaderTitle>
          <SectionHeaderSummary>
            Upstash enables companies of all sizes to create at the moment of
            inspiration
          </SectionHeaderSummary>
        </SectionHeader>

        {/* QUOTES */}
        <div
          className={cx(
            "mt-16 grid grid-cols-3 gap-2 rounded-2xl text-black md:mt-24 md:grid-cols-6 md:gap-6 dark:text-white",
          )}
        >
          {customers
            .filter((c) => c.quote)
            .map(({ name, icon, quote }) => (
              <div
                key={name}
                className={cx(
                  "group flex flex-col overflow-hidden px-4 py-3 sm:py-4",
                  "rounded-2xl bg-bg-mute md:rounded-4xl dark:bg-bg-mute dark:hover:bg-white",
                  "col-span-3 bg-white py-8 shadow-sm transition-colors sm:px-16 sm:py-10",
                )}
              >
                <span className="flex h-10 items-center justify-center text-text transition-colors group-hover:text-primary group-hover:opacity-100 dark:text-white dark:opacity-80">
                  {icon}
                </span>
                <p
                  className={cx(
                    "mt-4 grow md:text-xl",
                    "text-balance text-text-mute dark:text-text",
                    "transition-colors dark:group-hover:text-bg",
                  )}
                >
                  “{quote}”
                </p>
              </div>
            ))}
        </div>

        {/* CARDS */}
        <div
          className={cx(
            "mt-16 flex flex-wrap justify-center gap-2 rounded-2xl md:mt-24 md:gap-6",
          )}
        >
          {customers
            .filter((c) => !c.quote)
            .map(({ name, icon }) => (
              <div
                key={name}
                className={cx(
                  "group flex h-[72px] w-[180px] flex-col items-center justify-center",
                  "rounded-2xl bg-bg-mute transition-colors hover:text-primary md:rounded-4xl dark:bg-bg-mute dark:hover:bg-white",
                )}
              >
                {icon}
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
}

const customers = [
  {
    name: "Dub.co",
    quote: (
      <>
        The Upstash JS SDK is incredibly easy to use – all I needed to do was
        run npm install, initialize the Redis instance, and start running redis
        commands – super simple!
      </>
    ),
    icon: <LogoDubsh height={27} />,
  },
  {
    name: "Zapier",
    quote: (
      <>
        We chose Upstash specifically because it offers an HTTP interface for
        Redis, which perfectly suited our needs
      </>
    ),
    icon: <LogoZapier height={24} />,
  },
  {
    name: "Branch",
    icon: <LogoBranch height={32} />,
  },
  {
    name: "Humata",
    icon: <LogoHumata height={32} />,
  },
  {
    name: "Gail",
    icon: <LogoGail height={18} />,
  },
  {
    name: "Maker.co",
    icon: <LogoMaker height={24} />,
  },
  {
    name: "NiftyKit",
    icon: <LogoNiftykit height={21} />,
  },
  {
    name: "TFashion",
    icon: <LogoTFashion height={18} />,
  },
  {
    name: "NZXT",
    icon: <LogoNzxt height={16} />,
  },
  {
    name: "Fly.io",
    icon: <LogoFly height={22} />,
  },
  {
    name: "Vercel",
    icon: <LogoVercel height={22} />,
  },
  {
    name: "Supabase",
    icon: <LogoSupabase height={24} />,
  },
  {
    name: "Tinybird",
    icon: <LogoTinybird height={32} />,
  },
  {
    name: "Hashnode",
    icon: <LogoHashnode height={18} />,
  },
];
