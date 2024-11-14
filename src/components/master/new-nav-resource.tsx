import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { IconBook, IconCategory2 } from "@tabler/icons-react";
import React from "react";
import {
  ListItem,
  NewNavigationContent,
  NewNavigationTrigger,
} from "./new-nav-root";

export default function NewNavigationItemResource() {
  return (
    <NavigationMenu.Item>
      <NewNavigationTrigger>Resources</NewNavigationTrigger>

      <NewNavigationContent>
        <div className="grid w-[440px] gap-4 p-6">
          <ListItem
            href="/blog"
            title1="Blog"
            icon={<IconBook strokeWidth={1.5} />}
            className="hover:bg-emerald-50 hover:text-emerald-900"
          >
            Articles and tutorials from Upstash and community
          </ListItem>

          <ListItem
            href="/examples"
            title1="Examples"
            icon={<IconCategory2 strokeWidth={1.5} />}
            className="hover:bg-indigo-50 hover:text-indigo-900"
          >
            Jumpstart your development with our pre-built solutions
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
