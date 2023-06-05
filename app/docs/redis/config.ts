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
      // {
      //   title: "Redis® API Compatibility",
      //   href: "/docs/redis/compatibility",
      // },
      // {
      //   title: "Use Cases",
      //   href: "/docs/redis/use-cases",
      // },
      // {
      //   title: "Compare",
      //   href: "/docs/redis/compare",
      // },
      // {
      //   title: "Pro and Enterprise Plans",
      //   href: "/docs/redis/pro-and-enterprise-plans",
      // },
    ],
  },
  {
    title: "Quickstarts",
    items: [],
  },
  {
    title: "Features",
    items: [],
  },
  {
    title: "How To",
    items: [],
  },
  {
    title: "SDKs",
    items: [],
  },
  {
    title: "Devops Tools",
    items: [],
  },
  {
    title: "Troubleshooting",
    items: [],
  },
  {
    title: "Account & Users",
    items: [],
  },
  {
    title: "Help",
    items: [],
  },
];
