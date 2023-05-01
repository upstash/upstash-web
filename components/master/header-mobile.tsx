"use client";

import React, { HTMLAttributes } from "react";
import cx from "@/utils/cx";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Container from "@/components/container";
import NavMobile from "./nav-mobile";
import Icon, { ICON_NAMES } from "@/components/icon";

export interface IAppHeader extends HTMLAttributes<HTMLHeadElement> {}

export default function Header({ className, ...props }: IAppHeader) {
  const [showMenu, setShowMenu] = React.useState(false);

  return (
    <header
      className={cx("relative z-50 py-6 md:hidden", className)}
      {...props}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex">
            <Link href="/">
              <Logo />
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
