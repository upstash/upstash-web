import Bg from "@/components/bg";
import Container from "@/components/container";
import PageHeaderDesc from "@/components/page-header-desc";
import PageHeaderTitle from "@/components/page-header-title";
import cx from "@/utils/cx";

export default function SectionWhy() {
  return (
    <section className="relative py-10 md:py-24">
      <Bg className="opacity-20" />

      <Container className="max-w-screen-lg">
        <div>
          <PageHeaderTitle as="h2">
            Why Choose Upstash for Enterprise?
          </PageHeaderTitle>
          <PageHeaderDesc className="mt-2">
            Fast, safe, and private.
          </PageHeaderDesc>
        </div>

        <div className="mt-16 grid gap-6">
          {WHY.map(({ title, desc, icon }, index) => (
            <article
              key={index}
              className={cx(
                "group flex items-center justify-between gap-2 p-8 md:px-16 md:py-12",
                "rounded-3xl bg-white shadow-sm dark:bg-bg-mute",
                "cursor-default transition",
              )}
            >
              <div className="text-left md:w-1/2">
                <h4 className="text-lg font-semibold leading-tight text-primary-text md:text-xl">
                  {title}
                </h4>
                <p className="mt-2 text-text-mute">{desc}</p>
              </div>

              <div>{icon}</div>
            </article>
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
    icon: (
      <svg
        width="216"
        height="137"
        viewBox="0 0 216 137"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="126" width="32" height="11" rx="5.5" fill="#064E3B" />
        <rect x="46" y="110" width="32" height="27" rx="8" fill="#065F46" />
        <rect x="92" y="91" width="32" height="46" rx="8" fill="#047857" />
        <rect x="138" y="62" width="32" height="75" rx="8" fill="#059669" />
        <rect x="184" y="23" width="32" height="114" rx="8" fill="#10B981" />
        <path
          d="m61.5 102.5-.604.797a1 1 0 0 0 1.604-.797h-1ZM107 82l-.433.901A1.001 1.001 0 0 0 108 82h-1Zm45.5-29-.367.93a1.002 1.002 0 0 0 1.358-.8L152.5 53Zm41.167-47a5.333 5.333 0 1 0 10.666 0 5.333 5.333 0 1 0-10.666 0ZM16 120.5c0-3.548 1.72-7.163 4.687-10.438 2.96-3.269 7.1-6.129 11.772-8.144 9.384-4.048 20.586-4.569 28.437 1.379l1.208-1.594c-8.649-6.552-20.697-5.823-30.438-1.621-4.891 2.11-9.281 5.125-12.462 8.637C16.03 112.226 14 116.298 14 120.5h2Zm46.5-18c0-2.605 1.174-5.878 3.42-9.18 2.235-3.284 5.478-6.515 9.487-9.036 7.996-5.028 19.007-7.216 31.16-1.383l.866-1.802c-12.847-6.167-24.586-3.856-33.09 1.492-4.242 2.667-7.686 6.091-10.076 9.604-2.379 3.496-3.767 7.16-3.767 10.305h2ZM108 82c0-8.74 6.898-17.35 16.088-23.024 9.185-5.672 20.214-8.13 28.045-5.046l.734-1.86c-8.669-3.416-20.39-.624-29.83 5.204C113.602 63.1 106 72.24 106 82h2Zm45.491-28.87c1.238-9.407 4.325-20.538 11.239-29.506 6.882-8.93 17.61-15.789 34.32-16.625L198.95 5c-17.29.866-28.562 8.006-35.805 17.402-7.211 9.356-10.374 20.875-11.636 30.467l1.982.26Z"
          fill="#10B981"
        />
      </svg>
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
    icon: (
      <svg
        width="238"
        height="120"
        viewBox="0 0 238 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M123.5 96a5.5 5.5 0 1 0 11 0h-11ZM129 0 97.246 55h63.508L129 0Zm5.5 96V49.5h-11V96h11Z"
          fill="#10B981"
        />
        <path
          d="M57 69a4 4 0 0 0 8 0h-8Zm4-64L37.906 45h46.188L61 5Zm4 64V41h-8v28h8Z"
          fill="#047857"
        />
        <path
          d="M177 112a4 4 0 0 0 8 0h-8Zm4-64-23.094 40h46.188L181 48Zm4 64V84h-8v28h8Z"
          fill="#059669"
        />
        <path
          d="M20 114a4 4 0 0 0 8 0h-8Zm4-64L.906 90h46.188L24 50Zm4 64V86h-8v28h8Z"
          fill="#065F46"
        />
        <path
          d="M206 56a3 3 0 1 0 6 0h-6Zm3-43-17.321 30h34.642L209 13Zm3 43V40h-6v16h6Z"
          fill="#047857"
        />
        <path
          d="M87 118a2 2 0 1 0 4 0h-4Zm2-43L77.453 95h23.094L89 75Zm2 43V93h-4v25h4Z"
          fill="#059669"
        />
        <path
          d="M224 114a2 2 0 1 0 4 0h-4Zm2-43-11.547 20h23.094L226 71Zm2 43V89h-4v25h4Z"
          fill="#065F46"
        />
      </svg>
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
    icon: (
      <svg
        width="241"
        height="105"
        viewBox="0 0 241 105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="25" y=".5" width="48" height="48" rx="8" fill="#065F46" />
        <path
          d="M39.667 36.5C40.333 30.5 43 25.833 49 23.167M45 32.5c8.29 0 14-4.384 14.667-16v-2.667h-5.352c-12 0-15.982 5.334-16 12 0 1.334 0 4 2.666 6.667H45Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="81" y=".5" width="48" height="48" rx="8" fill="#047857" />
        <path
          d="M105 24.5a1.333 1.333 0 1 1 0-2.666 1.333 1.333 0 0 1 0 2.666Zm0 0v3.333m0-15.333a16.001 16.001 0 0 0 11.334 4 15.993 15.993 0 0 1-5.611 17.206A15.996 15.996 0 0 1 105 36.5a15.997 15.997 0 0 1-11.877-13.654 16 16 0 0 1 .544-6.346c4.154.19 8.219-1.245 11.333-4Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="137" y=".5" width="48" height="48" rx="8" fill="#059669" />
        <path
          d="M161 31.167V36.5m-2.667-1.333 5.334-2.667m-5.334 0 5.334 2.667m-12-4V36.5M149 35.167l5.333-2.667m-5.333 0 5.333 2.667m16-4V36.5m-2.666-1.333L173 32.5m-5.333 0L173 35.167m-18.667-8A2.667 2.667 0 0 1 157 24.5h8a2.668 2.668 0 0 1 2.667 2.667M157 16.5a3.997 3.997 0 0 0 4 4 3.998 3.998 0 0 0 2.828-6.828A3.998 3.998 0 0 0 157 16.5Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="193" y=".5" width="48" height="48" rx="8" fill="#10B981" />
        <path
          d="M226.333 32.5a4.666 4.666 0 1 0 0-9.333H225c.529-2.358-.38-4.791-2.384-6.383-2.004-1.59-4.8-2.1-7.333-1.333-2.534.766-4.42 2.692-4.95 5.049-2.932-.117-5.54 1.768-6.221 4.497-.683 2.73.752 5.539 3.421 6.703m6.8-3.2v-2.667a2.667 2.667 0 0 1 5.334 0V28.5m-8 1.333A1.333 1.333 0 0 1 213 28.5h8a1.333 1.333 0 0 1 1.333 1.333v4A1.333 1.333 0 0 1 221 35.167h-8a1.333 1.333 0 0 1-1.333-1.334v-4Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="25" y="56.5" width="48" height="48" rx="8" fill="#065F46" />
        <path
          d="M49 75.833v9.334m-4-7.334 8 5.334m-8 0 8-5.334m-16-6.666a2.667 2.667 0 0 1 2.667-2.667h18.666A2.667 2.667 0 0 1 61 71.167v18.666a2.667 2.667 0 0 1-2.667 2.667H39.667A2.667 2.667 0 0 1 37 89.833V71.167Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="81" y="56.5" width="48" height="48" rx="8" fill="#047857" />
        <path
          d="M98.333 85.833H93l4.627-6.213A2.667 2.667 0 1 0 93 77.567m9.333 8.266V75.167h5.334m-5.334 5.333h4m5.334 5.333v-8a2.667 2.667 0 0 1 5.333 0v8m-5.333-4H117"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="137" y="56.5" width="48" height="48" rx="8" fill="#059669" />
        <path
          d="M155.667 79.167v-5.334a5.334 5.334 0 0 1 10.666 0v5.334m-14.666 2.666a2.667 2.667 0 0 1 2.666-2.666h13.334a2.665 2.665 0 0 1 2.666 2.666v8a2.667 2.667 0 0 1-2.666 2.667h-13.334a2.666 2.666 0 0 1-2.666-2.667v-8Zm8 4a1.333 1.333 0 1 0 2.666.002 1.333 1.333 0 0 0-2.666-.002Z"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="193" y="56.5" width="48" height="48" rx="8" fill="#10B981" />
        <path
          d="M226.2 73.833a10.663 10.663 0 0 1 1.466 6.667v1.333a8.01 8.01 0 0 0 1.067 4m-17.066-6.666a5.334 5.334 0 0 1 10.666 0V80.5c0 2.885.936 5.692 2.667 8m-8-9.333v2.666a18.67 18.67 0 0 0 3.333 10.667m-8.666-8a23.98 23.98 0 0 0 2.4 8m-6.534-2.667a29.35 29.35 0 0 1-1.2-9.333v-1.333a10.669 10.669 0 0 1 10.66-10.696 10.666 10.666 0 0 1 5.34 1.429"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
    icon: (
      <svg
        width="229"
        height="135"
        viewBox="0 0 229 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M187.331 129.862A67.502 67.502 0 0 1 161.5 135h-94A67.504 67.504 0 0 1 5.138 93.331 67.5 67.5 0 0 1 67.5 0h94a67.498 67.498 0 0 1 62.362 93.331 67.493 67.493 0 0 1-36.531 36.531Z"
          fill="#064E3B"
        />
        <path
          d="M155 19.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM82.5 33a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM57.5 37a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM77.5 46a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM97 44.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM50 57.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM65.5 58a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM125 63.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM110.5 59a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM110 70.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM124.5 52a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM148 70.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM134.5 36a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM131 76.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM88.5 110a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM191 56.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM177.5 71a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM196 72.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM169.5 107a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM158 109.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM186.5 41a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM84.5 93a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM77 79.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM67.5 98a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z"
          fill="#1BBE8F"
        />
      </svg>
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
    icon: (
      <svg
        width="200"
        height="134"
        viewBox="0 0 200 134"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M121.5 45.175a7 7 0 0 1 7 0l13.651 7.882a7.002 7.002 0 0 1 3.5 6.062V74.88c0 2.501-1.335 4.812-3.5 6.062L128.5 88.825a7 7 0 0 1-7 0l-13.651-7.882a7.002 7.002 0 0 1-3.5-6.062V59.12c0-2.501 1.335-4.812 3.5-6.062l13.651-7.882Z"
          stroke="#10B981"
          strokeWidth="2"
        />
        <path
          d="M71 44.31a8 8 0 0 1 8 0l13.65 7.88a8 8 0 0 1 4 6.929V74.88a8 8 0 0 1-4 6.928L79 89.691a8 8 0 0 1-8 0l-13.65-7.882a8 8 0 0 1-4-6.928V59.12a8 8 0 0 1 4-6.928L71 44.309Z"
          fill="#10B981"
        />
        <path
          d="M21.5 45.175a7 7 0 0 1 7 0l13.65 7.882a7 7 0 0 1 3.5 6.062V74.88a7 7 0 0 1-3.5 6.062L28.5 88.825a7 7 0 0 1-7 0L7.85 80.943a7 7 0 0 1-3.5-6.062V59.12a7 7 0 0 1 3.5-6.062l13.65-7.882Z"
          stroke="#10B981"
          strokeWidth="2"
        />
        <path
          d="M171 44.31a8 8 0 0 1 8 0l13.651 7.88a8 8 0 0 1 4 6.929V74.88a8 8 0 0 1-4 6.928L179 89.691a8 8 0 0 1-8 0l-13.651-7.882a8 8 0 0 1-4-6.928V59.12a8 8 0 0 1 4-6.928L171 44.309Z"
          fill="#065F46"
        />
        <path
          d="M96.5 3.175a7 7 0 0 1 7 0l13.651 7.882a7.002 7.002 0 0 1 3.5 6.062V32.88c0 2.501-1.335 4.812-3.5 6.062L103.5 46.825a7 7 0 0 1-7 0l-13.65-7.882a7 7 0 0 1-3.5-6.062V17.12a7 7 0 0 1 3.5-6.062L96.5 3.175Z"
          stroke="#10B981"
          strokeWidth="2"
        />
        <path
          d="M46 2.31a8 8 0 0 1 8 0l13.65 7.88a8 8 0 0 1 4 6.929V32.88a8 8 0 0 1-4 6.928L54 47.691a8 8 0 0 1-8 0l-13.65-7.882a8 8 0 0 1-4-6.928V17.12a8 8 0 0 1 4-6.928L46 2.309ZM146 2.31a8 8 0 0 1 8 0l13.651 7.88a8 8 0 0 1 4 6.929V32.88a8 8 0 0 1-4 6.928L154 47.691a8 8 0 0 1-8 0l-13.651-7.882a8 8 0 0 1-4-6.928V17.12a8 8 0 0 1 4-6.928L146 2.309ZM96 86.31a8 8 0 0 1 8 0l13.651 7.88a8 8 0 0 1 4 6.929v15.762a8 8 0 0 1-4 6.928L104 131.691a8 8 0 0 1-8 0l-13.65-7.882a8 8 0 0 1-4-6.928v-15.762a8 8 0 0 1 4-6.928L96 86.309ZM46 86.31a8 8 0 0 1 8 0l13.65 7.88a8 8 0 0 1 4 6.929v15.762a8 8 0 0 1-4 6.928L54 131.691a8 8 0 0 1-8 0l-13.65-7.882a8 8 0 0 1-4-6.928v-15.762a8 8 0 0 1 4-6.928L46 86.309Z"
          fill="#065F46"
        />
        <path
          d="M146.5 87.175a7 7 0 0 1 7 0l13.651 7.882a7.002 7.002 0 0 1 3.5 6.062v15.762a7 7 0 0 1-3.5 6.062l-13.651 7.882a7.002 7.002 0 0 1-7 0l-13.651-7.882a7 7 0 0 1-3.5-6.062v-15.762a7.002 7.002 0 0 1 3.5-6.062l13.651-7.882Z"
          stroke="#10B981"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];
