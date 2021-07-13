import {Box, SimpleGrid, Container, Heading, Text, Button, Link} from '@chakra-ui/react'
import Section from '../components/section'
import Bg from '../components/bg'
import Mission1 from '../components/icons/Mission1'
import Durable from '../components/icons/Durable'
import SupportCard from '../components/section-support-card'
import SectionSupportIconNext from '../components/section-support-icon-next'
import Head from 'next/head'
import CodeBlock from '../components/code-block'
import Redis from '../components/icons/Redis'
import {LINKS} from "../constants";

const FEATURES = [
    {
        title: 'Fast',
        desc: 'Speed up your Next.js app with Low Latency Redis.',
        icon: <Box as={Mission1} w={16} mx="auto" color="primary"/>
    },
    {
        title: 'Durable',
        desc: 'Upstash persists your data to the block storage by default.',
        icon: <Box as={Durable} w={16} mx="auto" color="primary"/>
    },
    {
        title: 'Redis',
        desc: 'Upstash adapted the most loved database to the cloud and serverless.',
        icon: <Box as={Redis} w={16} mx="auto" color="primary"/>
    }
]

function FeatureItem({title, desc, icon}) {
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
    let code1 = `
import styles from '../styles/Home.module.css'
import Redis from 'ioredis'

let redis = new Redis("redis://:3assd1e9bdfbe41bf23edd165f6afda@us1-destined-deer-34130.upstash.io:34130")

export default function Home({ data }) {
  return (
      <div>
            View Count: <b>{data}</b>
      </div>
  )
}

export async function getServerSideProps() {
  const data = await redis.incr('counter')
  return { props: { data } }
}
  `;

    let code2 = `
  export default function Home({ data }) {
  return (
      <div>
            View Count: <b>{data}</b>
      </div>
  )
}

export async function getServerSideProps() {
    let data = await fetch("https://us1-destined-deer-34130.upstash.io/incr/counter", {
        headers: {
            Authorization: "Bearer AYW2ACZDYtZGFjNzYxNjg3ZTc4M2UyZfFjOWfkfWJmMjNlZGQzNjVhNmFmZGE="
        }
    }).then(response => response.json())
        .then(data => data.result);
  return { props: { data } }
}
  `;

    return (
        <>
            <Head>
                <title>Upstash: The Best Database for Next.js</title>
            </Head>

            <Box as="section" py={['70px', '100px']}>
                <Container maxW="5xl">
                    <SimpleGrid columns={[1, 2]} spacing={10} alignItems="center">
                        <div>
                            <Heading as="h1" fontWeight="extrabold" size="2xl">
                                The Best <br/>
                                Database <br/>
                                for Next.js
                            </Heading>

                            <Box mt="24px" fontSize={['md', 'xl']} color="whiteAlpha.700">
                                <Text>
                                    Upstash is a Serverless Database with Redis API and per request pricing.
                                    <br/>
                                    Redis/REST API together with durable storage makes
                                    Upstash a perfect database for your Next.js applications.
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
                                src="/assets/upstash-next.svg"
                                alt="Serverless Database for Next.js"
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
                <Bg/>

                <Box as="header">
                    <Heading tag="h2" size="2xl">
                        Boost Your Next.js App
                    </Heading>
                    <Container maxW="3xl">
                        <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
                            Add Redis to your application in seconds
                        </Text>
                    </Container>
                </Box>

                <Container maxW="4xl" mt={12}>
                    <CodeBlock fileName="Using Redis Client">
                        {code1}
                    </CodeBlock>
                </Container>
                <Container maxW="4xl" mt={12}>
                    <CodeBlock fileName="Using REST">
                        {code2}
                    </CodeBlock>
                </Container>
            </Section>

            <Section py={['100px', '140px']}>
                <Bg/>

                <Box as="header">
                    <Heading tag="h2" size="2xl">
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
                        <SupportCard theme="next" href={'https://docs.upstash.com/tutorials/nextjs_with_redis'}>
                            <SectionSupportIconNext/>
                            <Text>
                                <br/> <b> Next.js with Redis </b>
                                <br/>Getting Started Guide
                            </Text>
                        </SupportCard>
                        {/**/}
                        <SupportCard theme="next" href={'https://blog.upstash.com/roadmap-application'}>
                            <SectionSupportIconNext/>
                            <Text>
                                <b> Roadmap Voting App</b>
                                <br/> for Next.js, Redis
                                <br/> authentication with Auth0
                            </Text>
                        </SupportCard>
                        {/**/}
                        <SupportCard theme="next" href={'https://blog.upstash.com/nextjs-todo'}>
                            <SectionSupportIconNext/>
                            <Text>
                                <b> TODO App</b>
                                <br/>
                                Using Next.js and
                                <br/>
                                Upstash REST API
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
