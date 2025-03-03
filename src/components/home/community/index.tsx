import Bg from "@/components/bg";
import Container from "@/components/container";
import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Icon, { ICON_NAMES } from "@/components/icon";
import { IconBrandX } from "@tabler/icons-react";
import React from "react";
import {
  CommunityBox,
  CommunityBoxButton,
  CommunityBoxDesc,
  CommunityBoxTitle,
} from "./comp";

export default function HomeCommunity() {
  return (
    <section className="relative z-10 py-8 md:py-16">
      <Bg />

      <Container>
        {/* header */}
        <SectionHeader>
          <SectionHeaderTitle>Community</SectionHeaderTitle>
          <SectionHeaderSummary>
            The help you need, when you need it
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-10 grid gap-2 md:mt-20 md:grid-cols-2 lg:grid-cols-4">
          <CommunityBox>
            <Icon
              icon={ICON_NAMES.FileText}
              className="mb-4 hidden text-4xl group-hover:text-primary sm:inline-flex md:text-5xl"
              strokeWidth="1"
            />
            <CommunityBoxTitle>Blog</CommunityBoxTitle>
            <CommunityBoxDesc>
              Read the latest news and product updates from the Upstash Blog.
            </CommunityBoxDesc>
            <CommunityBoxButton href="https://upstash.com/blog">
              Read
            </CommunityBoxButton>
          </CommunityBox>

          <CommunityBox>
            <Icon
              icon={ICON_NAMES.Discord}
              className="mb-4 hidden text-4xl group-hover:text-primary sm:inline-flex md:text-5xl"
              strokeWidth="1"
            />
            <CommunityBoxTitle>Discord</CommunityBoxTitle>
            <CommunityBoxDesc>
              Join our Discord community to chat with other developers and the
              Upstash team.
            </CommunityBoxDesc>
            <CommunityBoxButton href="https://upstash.com/discord">
              Join
            </CommunityBoxButton>
          </CommunityBox>

          <CommunityBox>
            <IconBrandX
              size={48}
              className="mb-4 hidden text-4xl group-hover:text-primary sm:inline-flex md:text-5xl"
              strokeWidth={1}
            />
            <CommunityBoxTitle>X</CommunityBoxTitle>
            <CommunityBoxDesc>
              Follow us on X to stay up to date with the latest news from
              Upstash.
            </CommunityBoxDesc>
            <CommunityBoxButton href="https://twitter.com/upstash">
              Follow
            </CommunityBoxButton>
          </CommunityBox>

          <CommunityBox>
            <Icon
              icon={ICON_NAMES.Github}
              className="mb-4 hidden text-4xl group-hover:text-primary sm:inline-flex md:text-5xl"
              strokeWidth="1"
            />
            <CommunityBoxTitle>Github</CommunityBoxTitle>
            <CommunityBoxDesc>
              You can view all the projects we have developed as open source on
              our Github page.
            </CommunityBoxDesc>
            <CommunityBoxButton href="https://github.com/upstash">
              View
            </CommunityBoxButton>
          </CommunityBox>
        </div>
      </Container>
    </section>
  );
}
