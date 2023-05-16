import {
  SectionHeader,
  SectionHeaderSummary,
  SectionHeaderTitle,
} from "@/components/home/section-header";
import Container from "@/components/container";
import {
  CommunityBox,
  CommunityBoxButton,
  CommunityBoxDesc,
  CommunityBoxTitle,
} from "./comp";
import Icon, { ICON_NAMES } from "@/components/icon";
import React from "react";
import Bg from "@/components/bg";
import { HOME_SECTIONS } from "@/utils/const";

export default function HomeCommunity() {
  return (
    <section
      id={`#${HOME_SECTIONS.COMMUNITY}`}
      className="relative py-16 md:py-28"
    >
      <Bg className="top-32 h-1/2 bg-yellow-500" />

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
              className="mb-4 text-4xl group-hover/community-box:text-emerald-400 md:text-5xl"
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
              className="mb-4 text-4xl group-hover/community-box:text-emerald-400 md:text-5xl"
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
            <Icon
              icon={ICON_NAMES.Twitter}
              className="mb-4 text-4xl group-hover/community-box:text-emerald-400 md:text-5xl"
              strokeWidth="1"
            />
            <CommunityBoxTitle>Twitter</CommunityBoxTitle>
            <CommunityBoxDesc>
              Follow us on Twitter to stay up to date with the latest news from
              Upstash.
            </CommunityBoxDesc>
            <CommunityBoxButton href="https://twitter.com/upstash">
              Follow
            </CommunityBoxButton>
          </CommunityBox>

          <CommunityBox>
            <Icon
              icon={ICON_NAMES.Github}
              className="mb-4 text-4xl group-hover/community-box:text-emerald-400 md:text-5xl"
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
