"use client";

import { HTMLProps, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import cx from "@/utils/cx";

import Container from "@/components/container";
import Icon, { ICON_NAMES } from "@/components/icon";
import { Logo } from "@/components/logo";

import NavMobile from "./nav-mobile";

export interface IAppHeader extends HTMLProps<HTMLHeadElement> {}

export default function Header({ className, ...props }: IAppHeader) {
  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShowMenu(false);
  }, [pathname]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 py-4 md:hidden",
        "border-b border-b-white/5 bg-zinc-950",
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
            className="flex items-center justify-center p-2 opacity-60"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            {showMenu ? (
              <Icon icon={ICON_NAMES.Cancel} className="text-3xl" />
            ) : (
              <Icon icon={ICON_NAMES.Menu} className="text-3xl" />
            )}
          </button>

          <NavMobile hidden={showMenu} />
        </div>
      </Container>
    </header>
  );
}
