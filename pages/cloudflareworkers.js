import {
  Box,
  SimpleGrid,
  Container,
  Heading,
  Text,
  Button,
  Link
} from '@chakra-ui/react'
import Section from '../components/section'
import Bg from '../components/bg'
import Global from '../components/icons/Global'
import API from '../components/icons/API'
import SupportCard from '../components/section-support-card'
import Head from 'next/head'
import CodeBlock from '../components/code-block'
import Redis from '../components/icons/Redis'
import Checklist from '../components/icons/Checklist'
import Analytics from '../components/icons/Analytics'
import { LINKS } from '../constants'
import CustomLink from '../components/custom-link'

const FEATURES = [
  {
    title: 'Globally Fast',
    desc: 'Upstash replicates data worldwide for global low latency.',
    icon: <Box as={Global} w={16} mx="auto" color="primary" />
  },
  {
    title: 'REST API',
    desc: 'Access your Redis from edge functions with the Upstash REST API.',
    icon: <Box as={API} w={16} mx="auto" color="primary" />
  },
  {
    title: 'Redis and Kafka',
    desc: 'Serverless Redis and Kafka with per request pricing.',
    icon: <Box as={Redis} w={16} mx="auto" color="primary" />
  }
]

function FeatureItem({ title, desc, icon }) {
  return (
    <Box>
      {icon}

      <Heading as="h3" size="md" mt={5}>
        {title}
      </Heading>
      <Text mt={3} color="whiteAlpha.600">
        {desc}
      </Text>
    </Box>
  )
}

function HomePage() {
  let code1 = `
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
let res = await fetch("https://us1-cool-tiger-31312.upstash.io/incr/counter\\?_token\\=AXpWASQgN2QxMWRlYzdfgjdmNWM1MmE1ZDE3NTMwMzYzYjAzYWI=")
text = await res.text()
return new Response("view count:" +JSON.parse(text).result)
}
  `

  return (
    <>
      <Head>
        <title>Upstash: Serverless Data for Cloudflare Workers</title>
      </Head>

      <Box as="section" py={['70px', '100px']}>
        <Container maxW="5xl">
          <SimpleGrid columns={[1, 2]} spacing={10} alignItems="center">
            <div>
              <Heading as="h1" fontWeight="extrabold" size="2xl">
                Serverless <br />
                Data <br />
                for Cloudflare Workers
              </Heading>

              <Box mt="24px" fontSize={['md', 'xl']} color="whiteAlpha.700">
                <Text>
                  Serverless Redis and Kafka with per request
                  pricing.
                  <br />
                  <br />
                  <CustomLink href="https://docs.upstash.com/features/globaldatabase">
                    {' '}
                    Global Replication{' '}
                  </CustomLink>{' '}
                  together with{' '}
                  <CustomLink href="https://docs.upstash.com/redis/features/restapi">
                    {' '}
                    REST API{' '}
                  </CustomLink>{' '}
                  makes Upstash a perfect database for Cloudflare Workers.
                </Text>
                <Button
                  as={Link}
                  href={LINKS.consoleNextjs}
                  mt="20px"
                  size="lg"
                  color="black"
                  bg="primary"
                  _hover={{
                    textDecoration: 'none'
                  }}
                >
                  Start for free in 30 seconds
                </Button>
              </Box>
            </div>
            <div>
              <img
                src="/assets/upstash-cloudflare-workers.svg"
                alt="Serverless Data for Cloudflare Workers"
              />
            </div>
          </SimpleGrid>
        </Container>

        <Container
          maxW="5xl"
          mt={20}
          p={10}
          textAlign="center"
          bgColor="whiteAlpha.200"
          borderRadius="2xl"
        >
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
          <Heading as="h2" size="2xl">
            Global Store for Edge Functions
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              Add Redis to your Cloudflare Workers function in seconds
            </Text>
          </Container>
        </Box>

        <Container maxW="4xl" mt={12}>
          <CodeBlock fileName="Using REST Client">{code1}</CodeBlock>
        </Container>
      </Section>

      <Section py={['100px', '140px']}>
        <Bg />

        <Box as="header">
          <Heading as="h2" size="2xl">
            Community Resources
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              Check our docs and examples to learn more
            </Text>
          </Container>
        </Box>

        <Container maxW="5xl">
          <SimpleGrid mt={[10, 20]} columns={[1, 3]} spacing={6}>
            <SupportCard
              theme="next"
              href={
                'https://docs.upstash.com/howto/getstartedcloudflareworkers'
              }
            >
              <Box as={Redis} w={20} mx="auto" color="primary" />
              <Text>
                <br /> <b> Cloudflare Workers with Redis </b>
                <br />
                Getting Started Guide
              </Text>
            </SupportCard>
            {/**/}
            <SupportCard
              theme="next"
              href={'https://blog.upstash.com/redis-cloudflare-workers'}
            >
              <Box as={Analytics} w={20} mx="auto" color="primary" />
              <Text>
                <br />
                <b> Analytics at Edge</b>
                <br /> with Redis and CF Workers
              </Text>
            </SupportCard>
            {/**/}
            <SupportCard
              theme="next"
              href={'https://blog.upstash.com/edge-guard'}
            >
              <Box as={Checklist} w={20} mx="auto" color="primary" />
              <Text>
                <br /> <b> Build IP Allow List </b>
                <br />
                Using Upstash Redis and
                <br />
                Edge Functions
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
