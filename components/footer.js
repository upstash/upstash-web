import {
  Box,
  Container,
  Stack,
  VStack,
  HStack,
  Text,
  Grid,
  GridItem,
  Link,
  IconButton
} from '@chakra-ui/react'
import CustomLink from './custom-link'
import Bg from './bg'
import * as Icon from './icons'
import Logo from './logo'

function Footer() {
  // const { colorMode, toggleColorMode } = useColorMode()
  // const isDark = colorMode === 'dark'

  return (
    <Box
      as="footer"
      pos="relative"
      overflow="hidden"
      py={['80px', '120px']}
      textAlign="center"
    >
      <Bg />

      <Container maxW="5xl">
        <VStack spacing={['32px', '40px']}>
          {/**/}

          <Box>
            <Logo />
          </Box>

          {/**/}

          <HStack spacing="16px">
            <IconButton
              as={Link}
              size="lg"
              isRound
              aria-label="Upstash on Twitter"
            >
              <Box as={Icon.Twitter} fontSize={20} />
            </IconButton>
            <IconButton
              as={Link}
              size="lg"
              isRound
              aria-label="Upstash on Twitter"
            >
              <Box as={Icon.Medium} fontSize={20} />
            </IconButton>
            <IconButton
              as={Link}
              size="lg"
              isRound
              aria-label="Upstash on Twitter"
            >
              <Box as={Icon.Devto} fontSize={20} />
            </IconButton>
            <IconButton
              as={Link}
              size="lg"
              isRound
              aria-label="Upstash on Twitter"
            >
              <Box as={Icon.Gitter} fontSize={20} />
            </IconButton>
          </HStack>

          {/**/}

          <Stack
            direction={['column', 'row']}
            align="center"
            spacing={['16px', '24px']}
          >
            <CustomLink isExternal href="/">
              Contact Us
            </CustomLink>
            <CustomLink isExternal href="/">
              Privacy Policy
            </CustomLink>
            <CustomLink isExternal href="/">
              Terms of Service
            </CustomLink>
            <CustomLink isExternal href="/">
              Subcontractors
            </CustomLink>
          </Stack>

          {/**/}

          <Grid templateColumns={['1fr', 'repeat(6, 1fr)']} gap="32px">
            <GridItem colStart={[1, 2]} colEnd={[1, 6]}>
              <Text fontSize="xs" color="whiteAlpha.400">
                * Redis is a trademark of Redis Labs Ltd. Any rights therein are
                reserved to Redis Labs Ltd. Any use by Lambda Store is for
                referential purposes only and does not indicate any sponsorship,
                endorsement or affiliation between Redis and Lambda Store.
              </Text>
            </GridItem>
          </Grid>

          {/*<Button size="lg" onClick={toggleColorMode}>*/}
          {/*  {isDark ? 'Light Theme' : 'Dark Theme'}*/}
          {/*</Button>*/}
        </VStack>
      </Container>
    </Box>
  )
}

export default Footer
