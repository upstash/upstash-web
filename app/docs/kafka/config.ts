export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  href?: string;
  items?: SidebarNavItem[];
};

export const docsConfig: SidebarNavItem[] = [
  {
    title: "Overall",
    items: [
      {
        title: "Getting Started",
        href: "/docs/redis/getting-started",
      },
      {
        title: "Pricing",
        href: "/docs/redis/pricing",
      },
      {
        title: "Kafka API",
        href: "/docs/redis/compatibility",
      },
      {
        title: "Credentials",
        href: "/docs/redis/use-cases",
      },
      {
        title: "Pro and Enterprise Plans",
        href: "/docs/redis/compare",
      },
      {
        title: "SDK For Javascript",
        href: "/docs/redis/pro-and-enterprise-plans",
      },
    ],
  },
  {
    title: "REST API",
    items: [],
  },
  {
    title: "Connectors",
    items: [],
  },
  {
    title: "How to",
    items: [],
  },
  {
    title: "Integrations",
    items: [],
  },
  {
    title: "Monitoring",
    items: [],
  },
];
