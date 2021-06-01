import Head from 'next/head'
import SectionHero from '../components/section-hero'
import SectionDemo from '../components/section-demo'
import Investors from '../components/investors'
import SectionWhat from '../components/section-what'
import SectionSupport from '../components/section-support'
import SectionPricing from '../components/section-pricing'
import SectionFaq from '../components/section-faq'
import Section from '../components/section'
import { LINKS } from '../constants'
import { Box } from '@chakra-ui/react'
import Link from '../components/link'

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
  )
}

export default HomePage
