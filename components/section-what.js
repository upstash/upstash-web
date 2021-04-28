import { Container, Heading, Text, Box, SimpleGrid } from '@chakra-ui/react'
import CustomLink from './custom-link'
import SectionWhatIcon1 from './section-what-icon-1'
import SectionWhatIcon2 from './section-what-icon-2'
import SectionWhatIcon3 from './section-what-icon-3'
import SectionWhatIcon4 from './section-what-icon-4'
// import Bg from './bg'
import { LINKS } from '../constants'

function SectionWhat() {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      pb={['100px', '140px']}
      textAlign="center"
    >
      {/*<Bg />*/}

      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading tag="h3" size="2xl">
            Designed for the Serverless Era
          </Heading>
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 1, 2]} spacing={[6, 8]}>
          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={SectionWhatIcon3}
              d="inline-flex"
              w="80px"
              h="80px"
              color="whiteAlpha.800"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Per-Request Pricing with Cap
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Start free, then pay only for what you use with per-request
                pricing. Forget your expensive server/instance. Use Upstash as
                much as you need, you'll never pay more than $120/month for
                standard databases, guaranteed.
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
              as={SectionWhatIcon2}
              d="inline-flex"
              w="80px"
              h="80px"
              color="whiteAlpha.800"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Low Latency
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                We optimized Upstash for low latency. Multi-tier storage makes
                Upstash faster than DynamoDB/Fauna, and more affordable than
                ElastiCache/RedisLabs.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.compare}>
                Compare vendors
              </CustomLink>
            </Box>
          </Box>

          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={SectionWhatIcon1}
              d="inline-flex"
              w="80px"
              h="80px"
              color="whiteAlpha.800"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Fast, Durable Storage
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Blend the performance of in-memory with the durability of disk
                storage enabling many use cases beyond caching. You can enable
                Strong Consistency mode to have guaranteed replicated, durable
                writes.
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
              as={SectionWhatIcon4}
              d="inline-flex"
              w="80px"
              h="80px"
              color="whiteAlpha.800"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Redis® and GraphQL API
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Upstash is compatible with the majority of the Redis API. It
                works with all Redis clients, so you can run your existing code
                without changing a line. In addition to Redis, you can use GraphQL API
                for connecting your database too.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.redisCompatibility}>
                View API
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
