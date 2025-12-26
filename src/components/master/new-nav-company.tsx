import { allJobs } from "@content";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import {
  IconBrandOpenSource,
  IconMail,
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
            href="/about"
            title1="About"
            icon={<IconUsers strokeWidth={1.5} />}
          >
            Data Platform for Developers
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
            href="/open-source"
            title1="Open-Source Program"
            icon={<IconBrandOpenSource strokeWidth={1.5} />}
          >
            We sponsor open-source projects
          </ListItem>

          <ListItem
            href="/contact"
            title1="Contact Us"
            icon={<IconMail strokeWidth={1.5} />}
          >
            Get in touch with our team
          </ListItem>
        </div>
      </NewNavigationContent>
    </NavigationMenu.Item>
  );
}
