import Head from "next/head";
import SectionHero from "components/redis/section-hero";
import SectionDemo from "components/redis/section-demo";
import Investors from "components/investors";
import SectionWhat from "components/redis/section-what";
import SectionSupport from "components/redis/section-support";
import SectionPricing from "components/redis/section-pricing";
import SectionFaq from "components/redis/section-faq";
import Section from "components/section";
import { Box } from "@chakra-ui/react";
import Link from "components/link";

function HomePage() {
  return (
    <>
      <Head>
        <title>Upstash: Serverless Database for Redis®</title>
      </Head>

      <SectionHero />
      <SectionDemo />
      <SectionWhat />
      <Section>
        <Investors />
        <Box mt={16}>
          <Link href="/about">See the full list</Link>
        </Box>
      </Section>
      <SectionSupport />
      <SectionPricing />
      <SectionFaq />
    </>
  );
}

export default HomePage;
