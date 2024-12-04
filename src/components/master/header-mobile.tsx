"use client";

import Container from "@/components/container";
import Icon, { ICON_NAMES } from "@/components/icon";
import { Logo } from "@/components/logo";
import cx from "@/utils/cx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLProps, useEffect, useState } from "react";
import NavMobile from "./nav-mobile";

export interface IAppHeader extends HTMLProps<HTMLHeadElement> {}

export default function Header({ className, ...props }: IAppHeader) {
  const [fix, setFix] = useState(false);
  const { scrollY } = useScroll();

  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setFix(latest > 10);
  });

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 py-4 md:hidden",
        "border-b border-b-white/5",
        fix && "bg-bg",
        className,
      )}
      {...props}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex">
            <Link href="/">
              <Logo height={30} />
            </Link>
          </div>

          <button
            type="button"
            className="flex items-center justify-center p-2 opacity-70"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {showMenu ? (
              <Icon
                title="Collapse menu"
                icon={ICON_NAMES.Cancel}
                className="text-3xl"
              />
            ) : (
              <Icon
                title="Expand menu"
                icon={ICON_NAMES.Menu}
                className="text-3xl"
              />
            )}
          </button>

          <NavMobile hidden={showMenu} />
        </div>
      </Container>
    </header>
  );
}
