import React from "react";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { IconCheck } from "@tabler/icons-react";

import {
  ListItem,
  NewNavigationContent,
  NewNavigationTrigger,
} from "./new-nav-root";

export default function NewNavigationItemResource() {
  return (
    <NavigationMenu.Item>
      <NewNavigationTrigger>Resource</NewNavigationTrigger>

      <NewNavigationContent
      // forceMount
      >
        <div className="grid w-[400px] p-2">
          <ListItem href="/" title="Blog" icon={<IconCheck />}>
            Articles and tutorials from Upstash and community
          </ListItem>

          <ListItem href="/" title="Example" icon={<IconCheck />}>
            Jumpstart your development with our pre-built solutions
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
