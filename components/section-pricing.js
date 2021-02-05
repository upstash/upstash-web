import { Box, Container, VStack, Text, Heading } from '@chakra-ui/react'
import Bg from './bg'
import DesktopTable from './pricing-desktop'
import MobileTable from './pricing-mobile'
import CustomLink from './custom-link'
import { LINKS } from '../constants'

function SectionPricing() {
  return (
    <Box
      as="section"
      id="section-pricing"
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
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              It costs you nothing if nobody is using.
            </Text>
          </Container>
        </Box>

        <Box mt={[10, 20]}>
          <Box d={['none', 'block']}>
            <DesktopTable />
          </Box>
          <Box d={['block', 'none']}>
            <MobileTable />
          </Box>
        </Box>

        <VStack spacing={2} mt={14}>
          <Text>
            Disk storage cost is $0.25 per GB per month for all database types.
          </Text>
          <Text>
            See{' '}
            <CustomLink isExternal noIcon href={LINKS.reservedPricing}>
              reserved plans
            </CustomLink>{' '}
            for high throughput use cases.
          </Text>
          <Text>
            See{' '}
            <CustomLink isExternal noIcon href={LINKS.databaseTypes}>
              database types
            </CustomLink>{' '}
            for more information on databases.
          </Text>
          <Text>
            Talk to{' '}
            <CustomLink isExternal noIcon href={LINKS.support}>
              us
            </CustomLink>{' '}
            for advanced needs.
          </Text>
        </VStack>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionPricing
