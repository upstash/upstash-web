import Head from 'next/head'
import SectionHero from '../components/section-hero'
import SectionDemo from '../components/section-demo'
import SectionWhat from '../components/section-what'
import SectionSupport from '../components/section-support'
import SectionPricing from '../components/section-pricing'
import SectionFaq from '../components/section-faq'

function HomePage() {
  return (
    <>
      <Head>
        <title>Upstash: Serverless Database for Redis®</title>
      </Head>

      <SectionHero />
      <SectionDemo />
      <SectionWhat />
      <SectionSupport />
      <SectionPricing />
      <SectionFaq />
    </>
  )
}

export default HomePage
