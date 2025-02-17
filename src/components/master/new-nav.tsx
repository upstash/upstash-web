import cx from "@/utils/cx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import ItemCompany from "./new-nav-company";
import NewNavigationRoot from "./new-nav-root";
import ItemSupport from "./new-nav-support";

export default function NewNavigation() {
  const segment = useSelectedLayoutSegment();
  const isPricing = "pricing" === segment;

  return (
    <NewNavigationRoot>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          asChild
          className={cx(
            "flex select-none items-center gap-0.5 rounded-full px-3 py-2",
            "text-text-mute hover:bg-white/5 hover:text-primary-text",
          )}
        >
          <Link href="/docs">Docs</Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link
          asChild
          className={cx(
            "flex select-none items-center gap-0.5 rounded-full px-3 py-2",
            "text-text-mute hover:bg-white/5 hover:text-primary-text",
          )}
        >
          <Link href="/blog">Blog</Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link
          asChild
          className={cx(
            "flex select-none items-center gap-0.5 rounded-full px-4 py-2",
            "text-text-mute hover:bg-white/5 hover:text-primary-text",
            isPricing ? "bg-white/5 opacity-100" : "",
          )}
        >
          <Link href="/enterprise">Enterprise</Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link
          asChild
          className={cx(
            "flex select-none items-center gap-0.5 rounded-full px-4 py-2",
            "text-text-mute hover:bg-white/5 hover:text-primary-text",
            isPricing ? "bg-white/5 opacity-100" : "",
          )}
        >
          <Link href="/pricing">Pricing</Link>
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <ItemCompany />
      <ItemSupport />
    </NewNavigationRoot>
  );
}
