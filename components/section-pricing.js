import { Box, Container, VStack, Text, Heading } from '@chakra-ui/react'
import Bg from './bg'
import DesktopTable from './pricing-desktop'
import CustomLink from './custom-link'

function SectionPricing() {
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
            Plans & Pricing
          </Heading>
          <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
            Flexible pricing for all usecases
          </Text>
        </Box>

        <Box mt={[10, 20]}>
          <DesktopTable />
        </Box>

        <VStack spacing={2} mt={14}>
          <Text>
            Disk storage cost is $0.15 per GB per month for all database types.
          </Text>
          <Text>
            See{' '}
            <CustomLink isExternal href="/">
              reserved plans
            </CustomLink>{' '}
            pricing for high throughput use cases.
          </Text>
          <Text>
            See{' '}
            <CustomLink isExternal href="/">
              database types
            </CustomLink>{' '}
            for more information on databases.
          </Text>
        </VStack>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionPricing
