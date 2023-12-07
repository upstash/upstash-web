import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";

import ItemCompany from "./new-nav-company";
import ItemResource from "./new-nav-resource";
import NewNavigationRoot from "./new-nav-root";
import ItemSupport from "./new-nav-support";

export default function NewNavigation() {
  return (
    <NewNavigationRoot>
      <NavigationMenu.Item>
        <NavigationMenu.Link
          className="flex select-none items-center gap-0.5 rounded-full px-3 py-2 hover:bg-white/10"
          href="/"
        >
          Pricing
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link
          className="flex select-none items-center gap-0.5 rounded-full px-3 py-2 hover:bg-white/10"
          href="/"
        >
          Docs
        </NavigationMenu.Link>
      </NavigationMenu.Item>

      <ItemResource />
      <ItemCompany />
      <ItemSupport />
    </NewNavigationRoot>
  );
}
