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
          {/*<Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>*/}
          {/*  Frequently Asked Questions*/}
          {/*</Text>*/}
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 1, 2]} spacing={[6, 8]}>
          <Box bg="whiteAlpha.100" borderRadius="2xl" p={10}>
            <Box
              as={SectionWhatIcon1}
              d="inline-flex"
              w="80px"
              h="80px"
              color="primary"
              mb={6}
            />
            <Heading tag="h4" fontSize="2xl">
              Serverless
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Lambda Store has been designed to be serverless from day 1. You
                create the database without knowing about the backend servers.
                We maintain it, we deal with any issue if anything happens.
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
              color="primary"
              mb={6}
            />
            <Heading tag="h4" fontSize="2xl">
              Redis® Compatible
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                We implemented serverless data structures compatible with the
                Redis® API. You will enjoy Lambda Store without thinking how to
                maintain servers or how to replicate your data to keep your
                cluster available.
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
              color="primary"
              mb={6}
            />
            <Heading tag="h4" fontSize="2xl">
              Pay As You Go
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                Lambda Store has a free tier, so you can start using Lambda
                Store without entering your credit card. Free tier has a limit
                of 5000 commands per day and 256 MB total data storage.
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
              color="primary"
              mb={6}
            />
            <Heading tag="h4" fontSize="2xl">
              Low Latency For Low Cost
            </Heading>
            <Box mt={4}>
              <Text color="whiteAlpha.600">
                If you are running AWS Lambda functions, each extra millisecond
                costs you. That's why we optimize Lambda Store for low latency.
                Keeping the data in memory provides us the advantage against our
                alternatives like DynamoDB.
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
