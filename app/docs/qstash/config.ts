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
        title: "API Examples",
        href: "/docs/redis/compatibility",
      },
      {
        title: "Compare",
        href: "/docs/redis/use-cases",
      },
    ],
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
    title: "Quickstarts",
    items: [],
  },
  {
    title: "Recipes",
    items: [],
  },
  {
    title: "Integrations",
    items: [],
  },
];
