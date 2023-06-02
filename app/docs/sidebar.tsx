"use client";

import { docsConfig, SidebarNavItem } from "./config";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DocSidebar() {
  const pathname = usePathname();

  return (
    <div className="grid gap-6">
      {docsConfig.map((item, index) => (
        <div key={index} className="">
          <h4 className="font-medium">{item.title}</h4>
          {item.items ? (
            <DocsSidebarNavItems items={item.items} pathname={pathname} />
          ) : (
            <span />
          )}
        </div>
      ))}
    </div>
  );
}

interface DocsSidebarNavItemsProps {
  items: SidebarNavItem[];
  pathname: string | null;
}

function DocsSidebarNavItems({ items, pathname }: DocsSidebarNavItemsProps) {
  return items?.length ? (
    <div className="grid text-sm">
      {items.map((item, index) =>
        !item.disabled && item.href ? (
          <Link
            key={index}
            href={item.href}
            className=""
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {item.title}
          </Link>
        ) : (
          <span className="">{item.title}</span>
        )
      )}
    </div>
  ) : null;
}
