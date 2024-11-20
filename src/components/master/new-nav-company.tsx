import { allJobs } from "@content";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  IconMoodSmileBeam,
  IconUserPlus,
  IconUsers,
} from "@tabler/icons-react";
import React from "react";
import {
  ListItem,
  NewNavigationContent,
  NewNavigationTrigger,
} from "./new-nav-root";

const jobLength = allJobs.filter((o) => !o.draft).length;

export default function NewNavigationItemCompany() {
  return (
    <NavigationMenu.Item>
      <NewNavigationTrigger>
        Company{" "}
        <span className="ml-1 flex items-center rounded-full bg-emerald-400/20 px-1.5 py-1 font-mono text-sm leading-none text-emerald-700 dark:text-primary">
          {jobLength}
        </span>
      </NewNavigationTrigger>

      <NewNavigationContent>
        <div className="grid w-[440px] gap-2 p-4">
          <ListItem
            href="/customers"
            title1="Customers"
            icon={<IconMoodSmileBeam strokeWidth={1.5} />}
          >
            The teams we empower
          </ListItem>

          <ListItem
            href="/careers"
            title1={
              <>
                Careers
                <span className="ml-1 inline-flex items-center rounded-full bg-emerald-400/20 px-1.5 py-1 font-mono text-sm leading-none text-emerald-700 dark:text-primary">
                  {jobLength}
                </span>
              </>
            }
            icon={<IconUserPlus strokeWidth={1.5} />}
          >
            Help us build the cutting edge data platform
          </ListItem>

          <ListItem
            href="/about"
            title1="About"
            icon={<IconUsers strokeWidth={1.5} />}
          >
            Data Platform for Developers
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
