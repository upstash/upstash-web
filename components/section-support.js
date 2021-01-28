import { Container, SimpleGrid, Heading, Text, Box } from '@chakra-ui/react'
import SectionSupportIconRedis from './section-support-icon-redis'
import SectionSupportIconNext from './section-support-icon-next'
import SectionSupportIconAws from './section-support-icon-aws'
import SupportCard from './section-support-card'

function SectionSupport() {
  return (
    <Box as="section" py={['100px', '140px']} textAlign="center">
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading tag="h2" size="2xl">
            Best Choice for Jamstack
          </Heading>
          <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
            Low latency data, ease of use and pay-per-request pricing makes
            Upstash a perfect choice for Jamstack and Serverless world.
          </Text>
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 1, 3]} spacing={6}>
          <SupportCard theme="next">
            <SectionSupportIconNext />
            <Text>
              Check out docs to <br />
              <Text tag="b" fontWeight="bold">
                Next
              </Text>
            </Text>
          </SupportCard>
          {/**/}
          <SupportCard theme="aws">
            <SectionSupportIconAws />
            <Text>
              Check out docs to <br />
              <Text tag="b" fontWeight="bold">
                AWS Lambda
              </Text>
            </Text>
          </SupportCard>
          {/**/}
          <SupportCard theme="redis">
            <SectionSupportIconRedis />
            <Text>
              Check out docs to <br />
              <Text tag="b" fontWeight="bold">
                Redis
              </Text>
            </Text>
          </SupportCard>
          {/**/}
        </SimpleGrid>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionSupport
