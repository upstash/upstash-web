import Head from 'next/head'
import { Box, SimpleGrid, Container, Heading, Text } from '@chakra-ui/react'
import Investors from '../components/investors'
import Section from '../components/section'
import Bg from '../components/bg'
import Mission1 from '../components/icons/Mission1'
import Mission2 from '../components/icons/Mission2'
import Mission3 from '../components/icons/Mission3'

const MISSIONS = [
  {
    title: 'Fast',
    desc: 'We know each millisecond is important for you.',
    icon: <Box as={Mission1} w={16} mx="auto" color="primary" />
  },
  {
    title: 'Simple',
    desc: 'Keep the things as simple as possible but not simpler.',
    icon: <Box as={Mission2} w={16} mx="auto" color="primary" />
  },
  {
    title: 'Robust',
    desc: 'We win your trust with robustness.',
    icon: <Box as={Mission3} w={16} mx="auto" color="primary" />
  }
]

function MissionItem({ title, desc, icon }) {
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
  return (
    <>
      <Head>
        <title>About - Upstash</title>
      </Head>

      <Box as="section" py={['100px', '160px']} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
              Make Data Easiest Part of Your Job
          </Heading>

          <Box mt="24px" fontSize={['md', '2xl']} color="whiteAlpha.700">
              <Text>We manage everything for you.
              </Text>
              <Text>
                  You focus on more important things.
                  </Text>
              <Text>
                  With per-request pricing, you pay only for what you use.
                  </Text>
          </Box>
        </Container>

        <Container maxW="4xl" mt={20}>
          <SimpleGrid columns={[1, 3]} spacing={10}>
            {MISSIONS.map((mission) => {
              return <MissionItem key={mission.title} {...mission} />
            })}
          </SimpleGrid>
        </Container>
      </Box>

      <Section py={['100px', '140px']}>
        <Bg />
        <Investors fullList />
      </Section>
    </>
  )
}

export default HomePage
