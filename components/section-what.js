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
          <Text fontSize="lg" mt={2} color="gray.500">
            Frequently Asked Questions
          </Text>
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 1, 2]} spacing={6}>
          <Box bg="gray.700" borderRadius="2xl" p={6}>
            <Box
              as={SectionWhatIcon1}
              d="inline-flex"
              w="80px"
              h="80px"
              color="white"
              mb={2}
            />
            <Heading tag="h4" fontSize="3xl">
              Serverless
            </Heading>
            <Box mt={2}>
              <Text color="gray.300">
                Upstash has been designed to be serverless from day 1. You
                create the database without knowing about the backend servers.
                We maintain it, we deal with any issue if anything happens. With
                the `pay-as-you-go` pricing, you only pay when you actively use
                the database. Your cost does not increase proportionally to your
                data size. See Serverless Model for more information.
              </Text>
              <CustomLink isExternal>See more</CustomLink>
            </Box>
          </Box>

          <Box bg="gray.700" borderRadius="2xl" p={4}>
            <Box
              as={SectionWhatIcon2}
              d="inline-flex"
              w="80px"
              h="80px"
              color="white"
              mb={2}
            />
            <Heading tag="h4" fontSize="3xl">
              Redis® Compatible
            </Heading>
            <Box mt={2}>
              <Text color="gray.300">
                Upstash has been designed to be serverless from day 1. You
                create the database without knowing about the backend servers.
                We maintain it, we deal with any issue if anything happens. With
                the `pay-as-you-go` pricing, you only pay when you actively use
                the database. Your cost does not increase proportionally to your
                data size. See Serverless Model for more information.
              </Text>
              <CustomLink isExternal>See more</CustomLink>
            </Box>
          </Box>

          <Box bg="gray.700" borderRadius="2xl" p={4}>
            <Box
              as={SectionWhatIcon2}
              d="inline-flex"
              w="80px"
              h="80px"
              color="white"
              mb={2}
            />
            <Heading tag="h4" fontSize="3xl">
              Pay As You Go
            </Heading>
            <Box mt={2}>
              <Text color="gray.300">
                Upstash has been designed to be serverless from day 1. You
                create the database without knowing about the backend servers.
                We maintain it, we deal with any issue if anything happens. With
                the `pay-as-you-go` pricing, you only pay when you actively use
                the database. Your cost does not increase proportionally to your
                data size. See Serverless Model for more information.
              </Text>
              <CustomLink isExternal>See more</CustomLink>
            </Box>
          </Box>

          <Box bg="gray.700" borderRadius="2xl" p={4}>
            <Box
              as={SectionWhatIcon3}
              d="inline-flex"
              w="80px"
              h="80px"
              color="white"
              mb={2}
            />
            <Heading tag="h4" fontSize="3xl">
              Low Latency For Low Cost
            </Heading>
            <Box mt={2}>
              <Text color="gray.300">
                Upstash has been designed to be serverless from day 1. You
                create the database without knowing about the backend servers.
                We maintain it, we deal with any issue if anything happens. With
                the `pay-as-you-go` pricing, you only pay when you actively use
                the database. Your cost does not increase proportionally to your
                data size. See Serverless Model for more information.
              </Text>
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
