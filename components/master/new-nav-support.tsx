import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { IconCheck } from "@tabler/icons-react";

import {
  ListItem,
  NewNavigationContent,
  NewNavigationTrigger,
} from "./new-nav-root";

export default function NewNavigationItemCompany() {
  return (
    <NavigationMenu.Item>
      <NewNavigationTrigger>Support</NewNavigationTrigger>

      <NewNavigationContent
      // forceMount
      >
        <div className="grid w-[400px] p-2">
          <ListItem href="/" title="Discord" icon={<IconCheck />}>
            We manage everything for you
          </ListItem>

          <ListItem href="/" title="Twitter" icon={<IconCheck />}>
            We manage everything for you
          </ListItem>

          <ListItem href="/" title="Github" icon={<IconCheck />}>
            The teams we empower
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
