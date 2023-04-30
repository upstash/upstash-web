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
import cx from "@/utils/cx";
import Icon, { ICON_NAMES } from "@/components/icon";
import React from "react";

export default function HomeCommunity() {
  return (
    <section className="relative py-16 md:py-32">
      {/* bg */}
      <div
        className={cx(
          "absolute left-1/2 top-32 -z-10 h-1/2 w-4/5",
          "-translate-x-1/2",
          "bg-yellow-500 opacity-5 blur-[100px]"
        )}
      />

      <Container>
        {/* header */}
        <SectionHeader>
          <SectionHeaderTitle>Community</SectionHeaderTitle>
          <SectionHeaderSummary>
            The help you need, when you need it
          </SectionHeaderSummary>
        </SectionHeader>

        <div className="mt-12 grid gap-2 md:mt-24 md:grid-cols-3">
          <CommunityBox>
            <Icon
              icon={ICON_NAMES.FileText}
              className="mb-4 text-4xl group-hover/community-box:text-emerald-300 md:text-5xl"
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
              className="mb-4 text-4xl group-hover/community-box:text-emerald-300 md:text-5xl"
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
              className="mb-4 text-4xl group-hover/community-box:text-emerald-300 md:text-5xl"
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
        </div>
      </Container>
    </section>
  );
}
