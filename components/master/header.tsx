import { HTMLAttributes } from "react";
import cx from "@/utils/cx";
import { Logo } from "@/components/logo";
import Link from "next/link";
import Button from "@/components/button";
import Container from "@/components/container";
import Nav from "./nav";

export interface IAppHeader extends HTMLAttributes<HTMLHeadElement> {}

export default function Header({ className, ...props }: IAppHeader) {
  return (
    <header className={cx("hidden py-10 md:block", className)} {...props}>
      <Container>
        <div className="flex items-center md:grid md:grid-cols-4">
          <div className="flex">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <Nav />

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
