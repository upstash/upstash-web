import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";

export default function SectionWhy() {
  return (
    <section className="relative py-10 md:py-32">
      <Bg className="opacity-20" />

      <Container className="max-w-screen-2xl">
        <div>
          <PageHeaderTitle as="h2">
            Why Choose Upstash for Enterprise?
          </PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Fast, safe, and private.
          </PageHeaderDesc>
        </div>

        <div className="mt-16 grid grid-cols-3 justify-center gap-6">
          {WHY.map((why, index) => (
            <div
              key={index}
              className={cx(
                "group flex flex-col items-center gap-2 px-8 py-6",
                "rounded-3xl bg-white dark:bg-bg-mute",
                "cursor-default transition",
              )}
            >
              <h4 className="text-lg font-semibold leading-tight text-primary-text">
                {why.title}
              </h4>
              <p className="text-text-mute">{why.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

const WHY = [
  {
    title: <>Scalability Without Limits</>,
    desc: (
      <>
        Our platform is built to handle the demands of businesses at any scale.
        With serverless infrastructure, you pay only for what you use, ensuring
        cost-efficiency as your data needs grow.
      </>
    ),
  },
  {
    title: <>High Performance</>,
    desc: (
      <>
        Experience ultra-low latency and high throughput, making Upstash the
        ideal choice for real-time applications and large-scale workflows.
      </>
    ),
  },
  {
    title: <>Enterprise-Grade Security</>,
    desc: (
      <>
        Protect your data with robust encryption, role-based access control
        (RBAC), and compliance with industry standards like GDPR, SOC 2, HIPAA
        and ISO 27001.
      </>
    ),
  },
  {
    title: <>Global Availability</>,
    desc: (
      <>
        Deploy your data closer to your users with a globally distributed
        architecture, reducing latency and ensuring high availability.
      </>
    ),
  },
  {
    title: <>Custom Integrations</>,
    desc: (
      <>
        Seamlessly integrate Upstash with your existing tools and workflows.
        Whether you use AWS, GCP, CloudFlare or other platforms, we have you
        covered.
      </>
    ),
  },
];
