import EnterpriseCobe from "@/app/enterprise/cobe";
import Bg from "@/components/bg";
import Button from "@/components/button";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";
import {
  IconChartLine,
  IconInfinity,
  IconLifebuoy,
  IconListSearch,
  IconPasswordUser,
  IconPointer,
  IconProgressHelp,
  IconShield,
  IconShieldCheckered,
  IconTimeline,
  IconUserSearch,
} from "@tabler/icons-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise",
  description: "Unlock the full potential of Upstash for your business.",
};

export default function HomePage() {
  return (
    <main className="text-center">
      {/**/}

      {/* HERO */}
      <section className="relative py-10 md:py-32">
        <Bg className="opacity-20" />

        <Container className="max-w-screen-lg">
          <div className="grid">
            <h1 className="mb-4 font-display text-xl uppercase tracking-wider text-text-mute md:text-2xl">
              Enterprise
            </h1>

            <h2
              className={cx(
                "font-display text-4xl font-bold md:text-7xl",
                "bg-gradient-to-r bg-clip-text text-transparent",
                "from-emerald-800 via-emerald-500 to-amber-500",
              )}
            >
              Unlock the Full Potential of Upstash for Your Business
            </h2>

            <p className="mt-4 text-balance text-lg text-text-mute md:text-2xl">
              Upstash empowers businesses to scale with our serverless data
              platform. It offers flexibility, performance, and security,
              enabling faster innovation and focus on what matters.
            </p>

            <div className="mt-8">
              <Button
                type="button"
                className="bg-primary text-lg text-bg"
                href="https://console.upstash.com"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <EnterpriseCobe />

      {/* FEATURES */}

      <section className="-mt-16">
        <Container>
          <div>
            <PageHeaderTitle as="h2">Enterprise Features</PageHeaderTitle>
            <PageHeaderDesc className="mt-2">
              Enterprise Features
            </PageHeaderDesc>
          </div>

          <div className="mt-16 grid grid-cols-3 justify-center gap-6">
            {FEATURES.map((feature, index) => (
              <div
                key={index}
                className={cx(
                  "group flex flex-col items-center gap-2 px-8 py-6",
                  "rounded-3xl bg-bg-mute",
                  "cursor-default transition",
                  // "hover:bg-white hover:shadow-xl",
                )}
              >
                {feature.icon && (
                  <span
                    className={cx(
                      "mb-4 inline-flex size-14 items-center justify-center",
                      "rounded-full bg-bg-mute text-primary text-white",
                    )}
                  >
                    {feature.icon}
                  </span>
                )}
                <h4 className="text-lg font-semibold leading-tight text-primary-text">
                  {feature.title}
                </h4>
                <p className="text-text-mute">{feature.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* WHY */}

      <section>
        <Container className="max-w-screen-2xl">
          <div></div>
        </Container>
      </section>
    </main>
  );
}

const FEATURES = [
  {
    icon: <IconInfinity size={32} stroke={1.5} />,
    title: <>Unlimited Number of Databases</>,
    desc: (
      <>
        Create and manage an unlimited number of databases to support your
        growing business needs.
      </>
    ),
  },

  {
    icon: <IconShield size={32} stroke={1.5} />,
    title: <>HIPAA Compliance</>,
    desc: (
      <>
        Ensure the privacy and security of healthcare-related data with
        HIPAA-compliant infrastructure.
      </>
    ),
  },

  {
    icon: <IconProgressHelp size={32} stroke={1.5} />,
    title: <>Professional Support with Response Time SLA</>,
    desc: (
      <>
        Get professional support with guaranteed response times to keep your
        operations running smoothly.
      </>
    ),
  },

  {
    icon: <IconUserSearch size={32} stroke={1.5} />,
    title: <>Dedicated Account Manager</>,
    desc: (
      <>
        Work with a dedicated account manager who understands your business and
        ensures your success.
      </>
    ),
  },

  {
    icon: <IconPasswordUser size={32} stroke={1.5} />,
    title: <>Single Sign-On (SSO)</>,
    desc: (
      <>
        Simplify and secure user access with enterprise-grade single sign-on
        capabilities.
      </>
    ),
  },

  {
    icon: <IconListSearch size={32} stroke={1.5} />,
    title: <>Access Logs</>,
    desc: (
      <>
        Monitor and audit all access activities with detailed logs for enhanced
        security and compliance.
      </>
    ),
  },

  {
    icon: <IconPointer size={32} stroke={1.5} />,
    title: <>Dedicated Infrastructure</>,
    desc: (
      <>
        Get exclusive access to dedicated instances for optimal performance and
        reliability.
      </>
    ),
  },

  {
    icon: <IconTimeline size={32} stroke={1.5} />,
    title: <>Custom SLAs</>,
    desc: (
      <>
        Enjoy guaranteed uptime and performance with Service Level Agreements
        tailored to your business needs.
      </>
    ),
  },

  {
    icon: <IconChartLine size={32} stroke={1.5} />,
    title: <>Advanced Analytics</>,
    desc: (
      <>
        Leverage real-time monitoring and advanced analytics to gain insights
        into your data usage and system performance.
      </>
    ),
  },

  {
    icon: <IconLifebuoy size={32} stroke={1.5} />,
    title: <>Priority Support</>,
    desc: (
      <>
        Receive 24/7 priority support from our dedicated enterprise team to
        ensure your success.
      </>
    ),
  },

  {
    icon: <IconShieldCheckered size={32} stroke={1.5} />,
    title: <>Compliance and Governance</>,
    desc: (
      <>
        Ensure compliance with data protection regulations and manage access
        with advanced governance tools.
      </>
    ),
  },
];
