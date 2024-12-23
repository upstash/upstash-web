import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@/components/tooltip-base";
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

export default function SectionFeature() {
  return (
    <section className="relative -mt-16 pb-10 md:pb-32">
      <Bg className="opacity-20" />

      <Container className="max-w-screen-2xl">
        <div>
          <PageHeaderTitle as="h2">Enterprise Features</PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Discover the benefits of Upstash for your business.
          </PageHeaderDesc>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-2 md:grid-cols-3 md:gap-4">
          {FEATURES.map((feature, index) => {
            return (
              <TooltipRoot delayDuration={0}>
                <TooltipTrigger>
                  <div
                    key={index}
                    className={cx(
                      "group flex items-center justify-center gap-2 px-6 py-4",
                      "rounded-3xl border-2 border-bg-mute bg-bg-mute",
                      "transition hover:border-white hover:bg-white hover:shadow-xl",
                      "dark:hover:border-bg-mute dark:hover:bg-bg-mute",
                    )}
                  >
                    {feature.icon && (
                      <span
                        className={cx(
                          "inline-flex size-8 shrink-0 items-center justify-center transition md:size-10",
                          "rounded-full bg-primary dark:bg-bg-mute dark:group-hover:bg-primary",
                        )}
                      >
                        {feature.icon}
                      </span>
                    )}

                    <h4 className="font-semibold md:text-lg">
                      {feature.title}
                    </h4>

                    {/*<p className="hidden text-text-mute group-hover:flex">*/}
                    {/*  {feature.desc}*/}
                    {/*</p>*/}
                  </div>
                </TooltipTrigger>
                <TooltipContent hideWhenDetached={true}>
                  {feature.desc}
                </TooltipContent>
              </TooltipRoot>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export const FEATURES = [
  {
    icon: <IconInfinity size={24} stroke={1.5} />,
    title: <>Unlimited Number of Databases</>,
    desc: (
      <>
        Create and manage an unlimited number of databases to support your
        growing business needs.
      </>
    ),
  },

  {
    icon: <IconShield size={24} stroke={1.5} />,
    title: <>HIPAA Compliance</>,
    desc: (
      <>
        Ensure the privacy and security of healthcare-related data with
        HIPAA-compliant infrastructure.
      </>
    ),
  },

  {
    icon: <IconProgressHelp size={24} stroke={1.5} />,
    title: <>Professional Support with Response Time SLA</>,
    desc: (
      <>
        Get professional support with guaranteed response times to keep your
        operations running smoothly.
      </>
    ),
  },

  {
    icon: <IconUserSearch size={24} stroke={1.5} />,
    title: <>Dedicated Account Manager</>,
    desc: (
      <>
        Work with a dedicated account manager who understands your business and
        ensures your success.
      </>
    ),
  },

  {
    icon: <IconPasswordUser size={24} stroke={1.5} />,
    title: <>Single Sign-On (SSO)</>,
    desc: (
      <>
        Simplify and secure user access with enterprise-grade single sign-on
        capabilities.
      </>
    ),
  },

  {
    icon: <IconListSearch size={24} stroke={1.5} />,
    title: <>Access Logs</>,
    desc: (
      <>
        Monitor and audit all access activities with detailed logs for enhanced
        security and compliance.
      </>
    ),
  },

  {
    icon: <IconPointer size={24} stroke={1.5} />,
    title: <>Dedicated Infrastructure</>,
    desc: (
      <>
        Get exclusive access to dedicated instances for optimal performance and
        reliability.
      </>
    ),
  },

  {
    icon: <IconTimeline size={24} stroke={1.5} />,
    title: <>Custom SLAs</>,
    desc: (
      <>
        Enjoy guaranteed uptime and performance with Service Level Agreements
        tailored to your business needs.
      </>
    ),
  },

  {
    icon: <IconChartLine size={24} stroke={1.5} />,
    title: <>Advanced Analytics</>,
    desc: (
      <>
        Leverage real-time monitoring and advanced analytics to gain insights
        into your data usage and system performance.
      </>
    ),
  },

  {
    icon: <IconLifebuoy size={24} stroke={1.5} />,
    title: <>Priority Support</>,
    desc: (
      <>
        Receive 24/7 priority support from our dedicated enterprise team to
        ensure your success.
      </>
    ),
  },

  {
    icon: <IconShieldCheckered size={24} stroke={1.5} />,
    title: <>Compliance and Governance</>,
    desc: (
      <>
        Ensure compliance with data protection regulations and manage access
        with advanced governance tools.
      </>
    ),
  },
];
