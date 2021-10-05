import { Container, SimpleGrid, Heading, Text, Box } from '@chakra-ui/react'
import SectionSupportIconRedis from './section-support-icon-redis'
import SectionSupportIconNext from './section-support-icon-next'
import SectionSupportIconAws from './section-support-icon-aws'
import SupportCard from './section-support-card'
import { LINKS } from '../constants'
import SectionSupportIconRest from "./section-support-icon-rest";

function SectionSupport() {
  return (
    <Box as="section" my={['100px', '220px']} textAlign="center">
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading as="h2" size="2xl">
            Best Choice for the Jamstack
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              Low latency data, ease of use, and pay-per-request pricing makes
              Upstash a perfect choice for the Jamstack and Serverless world.
            </Text>
          </Container>
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 2, 4]} spacing={6}>
          <SupportCard theme="next" href={LINKS.nextjs}>
            <SectionSupportIconNext />
            <Text>
              Check out docs for <br />
              <Text as="b" fontWeight="bold">
                Next.js
              </Text>
              <br /> Integration
            </Text>
          </SupportCard>
          {/**/}
          <SupportCard theme="aws" href={LINKS.aws}>
            <SectionSupportIconAws />
            <Text>
              Check out docs for <br />
              <Text as="b" fontWeight="bold">
                AWS Lambda
              </Text>
              <br /> Integration
            </Text>
          </SupportCard>
          {/**/}
          <SupportCard theme="redis" href={LINKS.redisCompatibility}>
            <SectionSupportIconRedis />
            <Text>
              Check out docs <br />
              <Text as="b" fontWeight="bold">
                Redis API
              </Text>{' '}
              <br />
              Compatibility
            </Text>
          </SupportCard>
          {/**/}
          <SupportCard theme="graphql" href={LINKS.restApi}>
            <SectionSupportIconRest />
            <Text>
              Check out docs for
              <br />
              <Text as="b" fontWeight="bold">
                REST API
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
