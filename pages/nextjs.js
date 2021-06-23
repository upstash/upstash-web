import { Box, SimpleGrid, Container, Heading, Text } from '@chakra-ui/react'
import Section from '../components/section'
import Bg from '../components/bg'
import Mission1 from '../components/icons/Mission1'
import Durable from '../components/icons/Durable'
import Mission3 from '../components/icons/Mission3'
import SupportCard from '../components/section-support-card'
import SectionSupportIconNext from '../components/section-support-icon-next'
import Head from 'next/head'
import CodeBlock from '../components/code-block'
import Redis from "../components/icons/Redis";

const FEATURES = [
  {
    title: 'Fast',
    desc: 'Speed up your Next.js app with Low Latency Redis.',
    icon: <Box as={Mission1} w={16} mx="auto" color="primary" />
  },
  {
    title: 'Durable',
    desc: 'Upstash persists your data to the block storage by default.',
    icon: <Box as={Durable} w={16} mx="auto" color="primary" />
  },
  {
    title: 'Redis',
    desc: 'Upstash adapted the most loved database to the cloud and serverless.',
    icon: <Box as={Redis} w={16} mx="auto" color="primary" />
  }
]

function FeatureItem({ title, desc, icon }) {
  return (
    <Box>
      {icon}

      <Heading tag="h3" size="md" mt={5}>
        {title}
      </Heading>
      <Text mt={3} color="whiteAlpha.600">
        {desc}
      </Text>
    </Box>
  )
}

function HomePage() {
  return (
    <>
      <Head>
        <title>Upstash: Best Database for Next.js Application</title>
      </Head>

      <Box as="section" py={['70px', '100px']} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" fontSize={['90px']}>
            Serverless <br/>
            Database <br/>
            for Next.js
          </Heading>

          <Box mt="24px" fontSize={['md', '2xl']} color="whiteAlpha.700">
            <Text> Redis with Per Request Pricing and REST API </Text>
          </Box>
        </Container>

        <Container maxW="4xl" mt={20}>
          <SimpleGrid columns={[1, 3]} spacing={10}>
            {FEATURES.map((mission) => {
              return <FeatureItem key={mission.title} {...mission} />
            })}
          </SimpleGrid>
        </Container>
      </Box>

      <Section py={['100px', '140px']}>
        <Bg />

        <Box as="header">
          <Heading tag="h2" size="2xl">
            Integrate
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              Database and
            </Text>
          </Container>
        </Box>

        <Container maxW="4xl" mt={12}>
          <CodeBlock fileName="serverless-function.js">
            const redis = require("redis");
          </CodeBlock>
        </Container>
      </Section>

      <Section py={['100px', '140px']}>
        <Bg />

        <Box as="header">
          <Heading tag="h2" size="2xl">
            Resource links
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              description
            </Text>
          </Container>
        </Box>

        <Container maxW="5xl">
          <SimpleGrid mt={[10, 20]} columns={[1, 3]} spacing={6}>
            <SupportCard theme="next" href={''}>
              <SectionSupportIconNext />
              <Text>
                Check out docs for <br />
                <Text as="b" fontWeight="bold">
                  Next.js
                </Text>
                <br /> Integration
              </Text>
            </SupportCard>
            {/**/}
            <SupportCard theme="next" href={''}>
              <SectionSupportIconNext />
              <Text>
                Check out docs for <br />
                <Text as="b" fontWeight="bold">
                  AWS Lambda
                </Text>
                <br /> Integration
              </Text>
            </SupportCard>
            {/**/}
            <SupportCard theme="next" href={''}>
              <SectionSupportIconNext />
              <Text>
                Check out docs <br />
                <Text as="b" fontWeight="bold">
                  Redis API
                </Text>{' '}
                <br />
                Compatibility
              </Text>
            </SupportCard>
            {/**/}
          </SimpleGrid>
        </Container>
      </Section>
    </>
  )
}

export default HomePage
