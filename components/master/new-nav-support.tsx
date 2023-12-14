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
          <ListItem
            href="/discord"
            title1="Discord"
            icon={<IconBrandDiscord />}
          >
            Join Our Discord Community
          </ListItem>

          <ListItem href="/x" title1="X" icon={<IconBrandX />}>
            Follow Us on X
          </ListItem>

          <ListItem href="/github" title1="Github" icon={<IconBrandGithub />}>
            Explore Our Code on GitHub
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
