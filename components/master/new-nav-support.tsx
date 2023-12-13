import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandX,
} from "@tabler/icons-react";

import {
  ListItem,
  NewNavigationContent,
  NewNavigationTrigger,
} from "./new-nav-root";

export default function NewNavigationItemCompany() {
  return (
    <NavigationMenu.Item>
      <NewNavigationTrigger>Support</NewNavigationTrigger>

      <NewNavigationContent>
        <div className="grid w-[440px] gap-4 p-6">
          <ListItem href="/" title1="Discord" icon={<IconBrandDiscord />}>
            We manage everything for you
          </ListItem>

          <ListItem href="/" title1="Twitter" icon={<IconBrandX />}>
            We manage everything for you
          </ListItem>

          <ListItem href="/" title1="Github" icon={<IconBrandGithub />}>
            The teams we empower
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
