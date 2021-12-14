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
import Bg from '../components/bg'

function HomePage() {
  return (
    <>
      <Head>
        <title>Upstash: Serverless Data for Redis® and Kafka®</title>
      </Head>

      <SectionHero />
      <SectionWhat />
      <SectionPricing />
      <Box
        as="section"
        pos="relative"
        overflow="hidden"
        py={['100px', '140px']}
        textAlign="center"
      >
        <Bg />
        <Investors />
        <Box mt={16}>
          <Link href="/about">See the full list</Link>
        </Box>
      </Box>
      <SectionTestimonial />
      <SectionSupport />
      <SectionFaq />
    </>
  )
}

export default HomePage
