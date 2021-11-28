import Head from 'next/head'
import {
  Box,
  Container,
  Flex,
  Heading,
  StackDivider,
  VStack
} from '@chakra-ui/react'
import Bg from '../../components/bg'
import Section from '../../components/section'
import CareerCard from '../../components/career-card'
import { getAllNodes } from 'next-mdx'

function CareerPage({ jobs }) {
  const hasJobs = jobs.length > 0

  return (
    <>
      <Head>
        <title>Careers - Upstash</title>
      </Head>

      <Box as="section" py={['100px', '140px']} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
            Join Upstash
          </Heading>

          <Heading
            fontWeight="normal"
            as="h4"
            mt="5"
            lineHeight=""
            fontSize={['md', 'xl']}
            color="whiteAlpha.600"
          >
            Help us build the cutting edge data platform for the serverless era.{' '}
            <br />
          </Heading>

          {hasJobs ? (
            <Flex
              as="a"
              href="#list"
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
                px={1}
                h={5}
                minW={5}
                borderRadius="full"
                bg="white"
                color="black"
                fontSize="sm"
                fontWeight="semibold"
              >
                {jobs.length}
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

      {hasJobs && (
        <Section id="list" py={['100px', '120px']}>
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
              {jobs.map((job) => {
                return (
                  <CareerCard
                    key={job.slug}
                    {...job.frontMatter}
                    slug={job.slug}
                    url={job.url}
                  />
                )
              })}
            </VStack>
          </Container>
        </Section>
      )}
    </>
  )
}

export async function getStaticProps() {
  const jobs = await getAllNodes('post')

  return {
    props: {
      jobs
    }
  }
}

export default CareerPage
