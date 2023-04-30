import { HTMLAttributes } from "react";
import cx from "@/utils/cx";
import { Logo } from "@/components/app/logo";
import Link from "next/link";
import Button from "@/components/button";
import Container from "@/components/container";
import Nav from "./nav";

export interface IAppHeader extends HTMLAttributes<HTMLDivElement> {}

export default function Header({ className, ...props }: IAppHeader) {
  return (
    <header className={cx("group py-10", className)} {...props}>
      <Container>
        <div className="flex items-center md:grid md:grid-cols-4">
          <div className="flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* nav */}
          <Nav />

          {/* cta */}
          <div className="flex justify-end">
            <Button type="button" hideIcon href="https://console.upstash.com">
              Login
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
