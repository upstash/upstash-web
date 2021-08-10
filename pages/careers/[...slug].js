import Head from 'next/head'
import { useHydrate } from 'next-mdx/client'
// import { mdxComponents } from 'components/mdx-components'
import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text
} from '@chakra-ui/react'

function CareerDetailPage({ job }) {
  const { title, excerpt, skills, experience, type, location } = job.frontMatter

  const content = useHydrate(job, {
    // components: mdxComponents
  })

  return (
    <>
      <Head>
        <title>Careers - Upstash</title>
      </Head>

      <Box as="section" py={['100px', '120px']} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
            {title}
          </Heading>

          <Stack
            direction={['column', 'row']}
            justify="center"
            spacing={[1, 6]}
            mt={6}
            color="whiteAlpha.600"
          >
            <Text>
              Experience:{' '}
              <Text as="span" color="white">
                {experience}
              </Text>
            </Text>
            <Text>
              Job type:{' '}
              <Text as="span" color="white">
                {type}
              </Text>
            </Text>
            <Text>
              Location:{' '}
              <Text as="span" color="white">
                {location}
              </Text>
            </Text>
          </Stack>

          <HStack mt={4} justify="center" spacing={2}>
            {skills.map((skill) => (
              <Tag key={skill} variant="solid" bg="whiteAlpha.300">
                {skill}
              </Tag>
            ))}
          </HStack>

          <Button
            as="a"
            href="mailto:jobs@upstash.com"
            mt={8}
            color="black"
            bg="primary"
            _hover={{
              textDecoration: 'none'
            }}
          >
            Apply now
          </Button>

          <Box mt={20} textAlign="left" className="post">
            {content}
          </Box>

          <style global jsx>{`
            .post > * {
              margin-top: 1rem;
            }

            .post > h3,
            .post > h4,
            .post > h5 {
              font-weight: bold;
            }

            .post > h3 {
              font-size: 1.6rem;
            }

            .post > p + h3 {
              margin-top: 3rem;
            }

            .post > h4 {
              font-size: 1.2rem;
            }
          `}</style>
        </Container>
      </Box>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('post'),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const job = await getMdxNode('post', context)

  if (!job) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      job
    }
  }
}

export default CareerDetailPage
