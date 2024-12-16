import Bg from "@/components/bg";
import Container from "@/components/container";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import cx from "@/utils/cx";
import Link from "next/link";

export default function HomeHeroPartner() {
  return (
    <section className="relative pt-32">
      <Bg />

      <Container>
        {/* title */}
        <SectionHeader>
          <SectionHeaderTitle className="text-2xl md:text-4xl">
            Meet our Customers
          </SectionHeaderTitle>
          <SectionHeaderSummary className="text-lg md:text-xl">
            Upstash enables companies of all sizes to create at the moment of
            inspiration
          </SectionHeaderSummary>
        </SectionHeader>

        <div
          className={cx(
            "mt-16 grid grid-cols-3 gap-4 overflow-hidden rounded-2xl md:mt-24 md:grid-cols-4 md:gap-6 md:rounded-4xl",
          )}
        >
          {customers.map(({ name, slug, icon, quote }) => (
            <div
              key={slug}
              className={cx(
                "group relative flex flex-col justify-center overflow-hidden",
                "rounded-2xl border-2 border-bg-mute p-8 md:rounded-4xl md:border-4",
                quote && "col-span-3 md:col-span-2",
              )}
            >
              <span className="absolute inset-0 bg-gradient-to-br hover:from-emerald-500/10 hover:to-emerald-500/0" />

              <Link
                href={slug}
                className="flex h-12 items-center justify-center opacity-60 group-hover:opacity-100"
              >
                {icon}
              </Link>

              {quote && (
                <p
                  className={cx(
                    "mt-4 text-base text-transparent md:text-xl",
                    "bg-gradient-to-br from-primary-text to-text bg-clip-text",
                  )}
                >
                  {quote}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const customers = [
  {
    name: "Zapier",
    slug: "",
    icon: <img src="customer/logo-zapier.svg" className="h-9" />,
    quote: (
      <>
        We chose Upstash specifically because it offers an HTTP interface for
        Redis, which perfectly suited our needs
      </>
    ),
  },
  {
    name: "Dub.co",
    slug: "",
    icon: <img src="customer/logo-dubsh.svg" className="h-10" />,
    quote: (
      <>
        The Upstash JS SDK is incredibly easy to use – all I needed to do was
        run npm install, initialize the Redis instance, and start running redis
        commands – super simple!
      </>
    ),
  },
  {
    name: "NiftyKit",
    slug: "",
    icon: <img src="customer/logo-niftykit.svg" className="h-8" />,
    // quote: (
    //   <>
    //     Upstash service has been bulletproof, with almost zero issues, and their
    //     support team is some of the most incredible people. They helped us
    //     troubleshoot issues down to the code level
    //   </>
    // ),
  },
  {
    name: "Branch",
    slug: "",
    icon: <img src="customer/logo-branch.svg" className="h-12" />,
    // quote: (
    //   <>
    //     Before Upstash we used Redis Cloud. This was not serverless, you had to
    //     think about instance size, memory usage etc. which we really don't want
    //     to do as it pulls our focus from product engineering, any time spent on
    //     operations like this is less time spent on our products and what
    //     differentiates Branch.
    //   </>
    // ),
  },
  {
    name: "Maker.co",
    slug: "",
    icon: <img src="customer/logo-maker.svg" className="h-8" />,
  },
  {
    name: "NZXT",
    slug: "",
    icon: <img src="customer/logo-nzxt.svg" className="h-5" />,
  },
  {
    name: "Fly.io",
    slug: "",
    icon: <img src="customer/logo-fly.svg" className="h-8" />,
  },
  {
    name: "Vercel",
    slug: "",
    icon: <img src="customer/logo-vercel.svg" className="h-7" />,
  },
  {
    name: "Supabase",
    slug: "",
    icon: <img src="customer/logo-supabase.svg" className="h-8" />,
  },

  {
    name: "Materialize",
    slug: "",
    icon: <img src="customer/logo-materialize.svg" className="h-7" />,
  },
  {
    name: "Tinybird",
    slug: "",
    icon: <img src="customer/logo-tinybird.svg" className="h-11" />,
  },
  {
    name: "Hashnode",
    slug: "",
    icon: <img src="customer/logo-hashnode.svg" className="h-7" />,
  },
  {
    name: "Ding",
    slug: "",
    icon: <img src="customer/logo-ding.svg" className="h-8" />,
  },
  {
    name: "Texture",
    slug: "",
    icon: <img src="customer/logo-texture.svg" className="h-10" />,
  },
];
