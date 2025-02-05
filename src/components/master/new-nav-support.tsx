import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";
import React from "react";
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
        <div className="grid w-[440px] gap-2 p-4">
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
          <ListItem href="/contact" title1="Contact Us" icon={<IconMail />}>
            Send an Email to Support
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
