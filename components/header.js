import {
  Container,
  IconButton,
  Grid,
  Button,
  GridItem,
  Box,
  Stack,
  Link
} from '@chakra-ui/react'
import CustomLink from './custom-link'
import * as Icon from './icons'
import Logo from './logo'
import { LINKS, SOCIAL_LINKS } from '../constants'

function Header({ onOpen }) {
  return (
    <Box as="header" mt={[10, 14]}>
      <Container maxW="5xl">
        <Grid
          templateColumns={['repeat(2, 1fr)', 'repeat(4, 1fr)']}
          alignItems="center"
        >
          {/* logo */}
          <GridItem d="flex">
            <Logo />
          </GridItem>

          {/* nav */}
          <GridItem
            colSpan={2}
            d={['none', 'flex']}
            justifyContent="center"
            color="whiteAlpha.700"
          >
            <Stack
              as="nav"
              direction={['column', 'row']}
              spacing="24px"
              justify="center"
            >
              <CustomLink href="#section-pricing" color="inherit">
                Pricing
              </CustomLink>
              <CustomLink isExternal href={LINKS.docs} color="inherit">
                Docs
              </CustomLink>
              <CustomLink isExternal href={SOCIAL_LINKS.blog} color="inherit">
                Blog
              </CustomLink>
            </Stack>
          </GridItem>

          {/* console */}
          <GridItem d={['none', 'flex']} justifyContent="flex-end">
            <Button
              as={Link}
              href={LINKS.console}
              _hover={{
                textDecoration: 'none'
              }}
            >
              Console
            </Button>
          </GridItem>

          {/* mobile */}
          <GridItem d={['flex', 'none']} justifyContent="flex-end">
            <IconButton size="lg" onClick={onOpen} bg="transparent">
              <Box as={Icon.Menu} fontSize="24px" />
            </IconButton>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

export default Header
