import { Container, Heading, Text, Box, SimpleGrid } from '@chakra-ui/react'
import CustomLink from './custom-link'
import What1 from './icons/What1'
import What2 from './icons/What2'
import What3 from './icons/What3'
import What4 from './icons/What4'
// import Bg from './bg'
import { LINKS } from '../constants'

function SectionWhat() {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      mt={['100px', '140px']}
      mb={['100px', '220px']}
      textAlign="center"
    >
      {/*<Bg />*/}

      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading as="h3" size="2xl">
            Designed for the Serverless Era
          </Heading>
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 1, 2]} spacing={[6, 8]}>
          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={What1}
              d="inline-flex"
              w="80px"
              h="80px"
              color="whiteAlpha.800"
              mb={6}
            />
            <Heading as="h4" fontSize={['xl', '2xl']}>
              Durable Redis with global low latency
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Blend the performance of in-memory with the durability of disk
                storage enabling many use cases beyond caching. You can leverage
                multi region replication with global databases.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.durability}>
                Learn more
              </CustomLink>
            </Box>
          </Box>

          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={What4}
              d="inline-flex"
              w="80px"
              h="80px"
              color="whiteAlpha.800"
              mb={6}
            />
            <Heading as="h4" fontSize={['xl', '2xl']}>
              Finally! Kafka meets simplicity
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                True Serverless Kafka where price scales to zero. With per-request-pricing you only pay what you use.
                Built-in REST API allows you to produce and consume your Kafka topics from anywhere.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.kafkaDocs}>
                Learn More
              </CustomLink>
            </Box>
          </Box>

          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
                as={What3}
                d="inline-flex"
                w="80px"
                h="80px"
                color="whiteAlpha.800"
                mb={6}
            />
            <Heading as="h4" fontSize={['xl', '2xl']}>
              Per-Request Pricing with Cap
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Start free, then pay only for what you use with per-request
                pricing. Forget your expensive server/instance. Use Upstash as
                much as you need, you'll never pay more than the cap price, guaranteed.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.pricing}>
                Start saving
              </CustomLink>
            </Box>
          </Box>

          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
                as={What2}
                d="inline-flex"
                w="80px"
                h="80px"
                color="whiteAlpha.800"
                mb={6}
            />
            <Heading as="h4" fontSize={['xl', '2xl']}>
              Designed for the Edge
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Upstash REST API enables access from Cloudflare Workers and Fastly Compute@Edge.
                With Global Database, you can access your database from anywhere with very low latency.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.compare}>
                Learn More
              </CustomLink>
            </Box>
          </Box>
        </SimpleGrid>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionWhat
