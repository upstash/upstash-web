import {
  Container,
  IconButton,
  Grid,
  GridItem,
  Box,
  Stack
} from '@chakra-ui/react'
import CustomLink from './custom-link'
import * as Icon from './icons'
import Logo from './logo'

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
            color="gray.400"
          >
            <Stack
              as="nav"
              direction={['column', 'row']}
              spacing="24px"
              justify="center"
            >
              <CustomLink href="/">Pricing</CustomLink>
              <CustomLink href="https://docs.lambda.store/" isExternal>
                Docs
              </CustomLink>
              <CustomLink href="https://medium.com/lambda-store" isExternal>
                Blog
              </CustomLink>
            </Stack>
          </GridItem>

          {/* console */}
          <GridItem d={['none', 'flex']} justifyContent="flex-end">
            <CustomLink isExternal href="https://console.lambda.store">
              Console
            </CustomLink>
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
