import Head from 'next/head'
import Layout from '../components/layout'
import SectionHero from '../components/section-hero'
import SectionDemo from '../components/section-demo'
import SectionWhat from '../components/section-what'
import SectionSupport from '../components/section-support'
import SectionPricing from '../components/section-pricing'
import SectionFaq from '../components/section-faq'

function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Home Page</title>
      </Head>

      <SectionHero />
      <SectionDemo />
      <SectionWhat />
      <SectionSupport />
      <SectionPricing />
      <SectionFaq />
    </Layout>
  )
}

export default HomePage
