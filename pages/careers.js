import Head from 'next/head'
import {
  Box,
  Container,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack
} from '@chakra-ui/react'
import Bg from '../components/bg'
import Section from '../components/section'
import CareerCard from '../components/career-card'

const JOBS = [
  {
    title: 'Redis Engineer',
    description: 'We know each millisecond is important for you.',
    skills: ['aws-lambda', 'redis', 'docker', 'linux']
  },
  {
    title: 'Full Stack Engineer',
    description: 'Building well designed web app for orthodontists',
    skills: ['react', 'redux', 'rest', 'design-system']
  }
]

function CareerPage() {
  return (
    <>
      <Head>
        <title>Careers - Upstash</title>
      </Head>

      <Box as="section" py={['100px', '140px']} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
            Join the Upstash Team
          </Heading>

          <Heading
            fontWeight="normal"
            as="h4"
            mt="5"
            fontSize={['md', 'xl']}
            color="whiteAlpha.600"
          >
            Upstash is a Serverless Database with Redis API.
          </Heading>

          <Flex
            justify="center"
            alignItems="center"
            mt="5"
            fontSize={['md', 'xl']}
            color="whiteAlpha.600"
          >
            <Text>
              Size:{' '}
              <Text as="span" color="white">
                1-5 People
              </Text>
            </Text>

            <Text ml={4}>
              Location:{' '}
              <Text as="span" color="white">
                Remote
              </Text>
            </Text>
          </Flex>

          {JOBS.length > 0 ? (
            <Flex
              d="inline-flex"
              justify="center"
              alignItems="center"
              mt="6"
              borderRadius="full"
              bg="primary"
              color="black"
              px={4}
              py={2}
            >
              Open positions
              <Flex
                alignItems="center"
                justify="center"
                ml={2}
                mr={-1}
                px={2}
                h={6}
                minW={6}
                borderRadius="full"
                bg="white"
                color="black"
                fontWeight="bold"
              >
                {JOBS.length}
              </Flex>
            </Flex>
          ) : (
            <Flex
              d="inline-flex"
              justify="center"
              alignItems="center"
              mt="6"
              borderRadius="full"
              bg="red.600"
              px={4}
              py={2}
            >
              No Open positions
            </Flex>
          )}
        </Container>
      </Box>

      {JOBS.length > 0 && (
        <Section py={['100px', '140px']}>
          <Bg />

          <Container maxW="2xl">
            <Heading as="h2" size="xl">
              Open Positions
            </Heading>

            <VStack
              mt={20}
              spacing={8}
              align="stretch"
              divider={<StackDivider borderColor="whiteAlpha.300" />}
            >
              {JOBS.map((job) => {
                return <CareerCard key={job.title} {...job} />
              })}
            </VStack>
          </Container>
        </Section>
      )}
    </>
  )
}

export default CareerPage
