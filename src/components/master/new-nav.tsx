import cx from "@/utils/cx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
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
          className={cx(
            "flex select-none items-center gap-0.5 rounded-full px-4 py-2",
            "opacity-60 hover:bg-white/5 hover:opacity-100",
            isPricing ? "bg-white/5 opacity-100" : "",
          )}
          href="/pricing"
        >
          Pricing
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link
          className={cx(
            "flex select-none items-center gap-0.5 rounded-full px-3 py-2",
            "opacity-60 hover:bg-white/5 hover:opacity-100",
          )}
          href="/docs"
        >
          Docs
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link
          className={cx(
            "flex select-none items-center gap-0.5 rounded-full px-3 py-2",
            "opacity-60 hover:bg-white/5 hover:opacity-100",
          )}
          href="/blog"
        >
          Blog
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <ItemCompany />
      <ItemSupport />
    </NewNavigationRoot>
  );
}
