import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  IconMoodSmileBeam,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";

import {
  ListItem,
  NewNavigationContent,
  NewNavigationTrigger,
} from "./new-nav-root";

export default function NewNavigationItemCompany() {
  return (
    <NavigationMenu.Item>
      <NewNavigationTrigger>Company</NewNavigationTrigger>

      <NewNavigationContent
      // forceMount
      >
        <div className="grid w-[400px] p-2">
          <ListItem
            href="/"
            title="About"
            icon={<IconUsers strokeWidth={1.5} />}
          >
            We manage everything for you
          </ListItem>

          <ListItem
            href="/"
            title="Careers"
            icon={<IconUserPlus strokeWidth={1.5} />}
          >
            We manage everything for you
          </ListItem>

          <ListItem
            href="/"
            title="Customers"
            icon={<IconMoodSmileBeam strokeWidth={1.5} />}
          >
            The teams we empower
          </ListItem>

          <NavigationMenu.Link className="" href="/">
            All systems operational
          </NavigationMenu.Link>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
