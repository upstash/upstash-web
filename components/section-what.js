import { Container, Heading, Text, Box, SimpleGrid } from '@chakra-ui/react'
import CustomLink from './custom-link'
import SectionWhatIcon1 from './section-what-icon-1'
import SectionWhatIcon2 from './section-what-icon-2'
import SectionWhatIcon3 from './section-what-icon-3'
import Bg from './bg'

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
            Rails moment of <br />
            Serverless Database
          </Heading>
          {/*<Container maxW="3xl">*/}
          {/*<Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>*/}
          {/*  Frequently Asked Questions*/}
          {/*</Text>*/}
          {/*</Container>*/}
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 1, 2]} spacing={[6, 8]}>
          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={SectionWhatIcon1}
              d="inline-flex"
              w="80px"
              h="80px"
              color="purple.300"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Serverless
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Upstash has been designed to be Serverless from day 1. You start
                using the database, knowing nothing about the servers. We
                maintain it, we scale it, we deal with any issue. You focus on
                what you are building.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal>See more</CustomLink>
            </Box>
          </Box>

          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={SectionWhatIcon2}
              d="inline-flex"
              w="80px"
              h="80px"
              color="purple.300"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Low Latency For Low Cost
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                In Serverless world, extra millisecond is a cost. That's why we
                optimize Upstash for low latency. In-memory-data makes Upstash
                faster than DynamoDB and Fauna. Pay-per-request model makes
                Upstash more affordable than ElastiCache and RedisLabs.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal>See more</CustomLink>
            </Box>
          </Box>

          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={SectionWhatIcon3}
              d="inline-flex"
              w="80px"
              h="80px"
              color="purple.300"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Simple Pricing, No Surprises
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                In Upstash pricing model, you pay per request. If you are not
                using the database, you are not paying. The max monthly
                (ceiling) price, guarantees that you will not pay more than
                ceiling price (that is $120 per month for Standard databases).
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal>See more</CustomLink>
            </Box>
          </Box>

          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={SectionWhatIcon3}
              d="inline-flex"
              w="80px"
              h="80px"
              color="purple.300"
              mb={6}
            />
            <Heading tag="h4" fontSize={['xl', '2xl']}>
              Redis® Compatible
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                We have implemented data structures compatible with the Redis®
                API. Upstash works with all Redis clients, so you can run your
                legacy code without changing a line. Upstash provides you low
                latency and high availability minimizing operational burden.
              </Text>
            </Box>
            <Box mt={4}>
              <CustomLink isExternal>See more</CustomLink>
            </Box>
          </Box>
        </SimpleGrid>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionWhat
