"use client";

import { HTMLProps, useEffect, useState } from "react";
import cx from "@/utils/cx";
import { HOME_SECTIONS } from "@/utils/const";
import {
  HTMLMotionProps,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { LogoIcon } from "@/components/logo";
import Button from "@/components/button";
import { animateScroll, Events, Link as SpyLink } from "react-scroll";

export default function SectionMenu({
  children,
  className,
  ...props
}: HTMLMotionProps<any> & {}) {
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 200) {
      setShow(true);
    } else {
      setShow(false);
    }
  });

  useEffect(() => {
    Events.scrollEvent.register("begin", function () {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register("end", function () {
      console.log("end", arguments);
    });

    return () => {
      Events.scrollEvent.remove("begin");
      Events.scrollEvent.remove("end");
    };
  }, [show]);

  return (
    <motion.div
      className={cx(
        "fixed inset-x-0 top-0 z-50 pt-10",
        "hidden justify-center md:flex",
        show ? "pointer-events-auto" : "pointer-events-none",
        className
      )}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: -60 },
      }}
      transition={{ duration: 0.16 }}
      {...props}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10
      h-40 bg-gradient-to-b from-zinc-950 to-transparent"
      />

      <div
        className={cx(
          "flex cursor-pointer items-center gap-4 rounded-full bg-white p-2"
        )}
      >
        <SpyLink
          to={""}
          onClick={() =>
            animateScroll.scrollToTop({
              duration: 0,
            })
          }
          className="flex h-10 w-10 items-center justify-center rounded-full
          hover:bg-zinc-100"
        >
          <LogoIcon lightBg height={30} />
        </SpyLink>

        <div className={cx("flex items-center")}>
          <SectionMenuItem href={HOME_SECTIONS.FAST}>Fast</SectionMenuItem>
          <SectionMenuItem href={HOME_SECTIONS.SERVERLESS}>
            Serverless
          </SectionMenuItem>
          <SectionMenuItem href={HOME_SECTIONS.PRODUCTS}>
            Products
          </SectionMenuItem>
          <SectionMenuItem href={HOME_SECTIONS.PRICING}>
            Pricing
          </SectionMenuItem>
          <SectionMenuItem href={HOME_SECTIONS.OPEN_SOURCE}>
            Open Source
          </SectionMenuItem>
          <SectionMenuItem href={HOME_SECTIONS.COMMUNITY}>
            Community
          </SectionMenuItem>
        </div>

        <div className="flex justify-end">
          <Button
            target="_self"
            type="button"
            hideIcon
            className="bg-emerald-400 text-emerald-950"
            href="https://console.upstash.com"
          >
            Login
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

function SectionMenuItem({
  children,
  className,
  ...props
}: HTMLProps<HTMLAnchorElement>) {
  return (
    <SpyLink spy={true} activeClass="active" to={props.href}>
      <span
        className={cx(
          "select-none px-4 py-2 text-zinc-700",
          "cursor-pointer rounded-full transition",
          "[.active_&]:bg-zinc-200 [.active_&]:text-zinc-950",
          "hover:bg-zinc-200",
          className
        )}
      >
        {children}
      </span>
    </SpyLink>
  );
}
