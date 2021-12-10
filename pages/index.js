import Head from 'next/head'
import SectionHero from '../components/section-hero'
import Investors from '../components/investors'
import SectionWhat from '../components/section-what'
import SectionSupport from '../components/section-support'
import SectionPricing from '../components/section-pricing'
import SectionFaq from '../components/section-faq'
import Section from '../components/section'
import { Box } from '@chakra-ui/react'
import Link from '../components/link'
import SectionTestimonial from '../components/section-testimonial'

function HomePage() {
  return (
    <>
      <Head>
        <title>Upstash: Serverless Database for Redis®</title>
      </Head>

      <SectionHero />
      <SectionWhat />
      <Section>
        <Investors />
        <Box mt={16}>
          <Link href="/about">See the full list</Link>
        </Box>
      </Section>
      <SectionSupport />
      <SectionTestimonial />
      <SectionPricing />
      <SectionFaq />
    </>
  )
}

export default HomePage
