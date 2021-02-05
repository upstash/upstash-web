import { Container, Heading, Text, Box, SimpleGrid } from '@chakra-ui/react'
import CustomLink from './custom-link'
import SectionWhatIcon1 from './section-what-icon-1'
import SectionWhatIcon2 from './section-what-icon-2'
import SectionWhatIcon3 from './section-what-icon-3'
import SectionWhatIcon4 from './section-what-icon-4'
import Bg from './bg'
import { LINKS } from '../constants'

function SectionWhat() {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      py={['100px', '140px']}
      textAlign="center"
    >
      <Bg />

      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading tag="h2" size="2xl">
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
              Simple Pricing, No Surprises
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Upstash costs you nothing to run if nobody is using it thanks to
                pey-per-request pricing. The max monthly (ceiling) price
                guarantees that you will not pay more than ceiling price (that
                is $120 per month for Standard databases).
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.pricing}>
                See more
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
                In Serverless world, extra millisecond is a cost. That's why we
                optimized Upstash for low latency. Multi tier storage makes
                Upstash faster than DynamoDB and Fauna. Pay-per-request model
                makes Upstash more affordable than ElastiCache and RedisLabs.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.compare}>
                See more
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
              Memory + Disk = Fast + Durable
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Multi tier storage blends the performance of memory with
                durability of the disk. Upstash instantly persists all entries
                to the block storage in addition to memory. This enables many
                other use cases beyond caching.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.serverless}>
                See more
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
                works with all Redis clients, so you can run your legacy code
                without changing a line. In addition to Redis, GraphQL API is
                coming soon.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal href={LINKS.redisCompatibility}>
                See more
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
