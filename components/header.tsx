import {
  Badge,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  IconButton,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react";
import CustomLink from "./custom-link";
import * as Icon from "./icons";
import Logo from "./logo";
import { LINKS, SOCIAL_LINKS } from "constants/";
import { useRouter } from "next/router";
import Link from "./link";
import { allJobs } from "contentlayer/generated";

function Header({ onOpen }: { onOpen: () => void }) {
  const { pathname } = useRouter();
  const isSubPage = pathname !== "/";

  return (
    <Box as="header" pt={[10, 14]} pos="relative" zIndex={90}>
      <Container maxW="5xl">
        <Grid
          templateColumns={["repeat(2, 1fr)", "repeat(4, 1fr)"]}
          alignItems="center"
        >
          {/* logo */}
          <GridItem display="flex">
            <Logo />
          </GridItem>

          {/* nav */}
          <GridItem
            colSpan={2}
            display={["none", "flex"]}
            justifyContent="center"
            color="whiteAlpha.700"
          >
            <Stack
              as="nav"
              direction={["column", "row"]}
              spacing="24px"
              justify="center"
            >
              {isSubPage ? (
                <CustomLink href="/#section-pricing" color="inherit">
                  Pricing
                </CustomLink>
              ) : (
                <CustomLink href="#section-pricing" color="inherit">
                  Pricing
                </CustomLink>
              )}

              <Link href="/about" color="inherit">
                About
              </Link>

              <Link href="/blog" color="inherit" alignItems="baseline">
                <Text as="span">Blog</Text>
              </Link>

              <Link href="/careers" color="inherit" alignItems="baseline">
                <Text as="span">Careers</Text>{" "}
                <Badge
                  ml={1}
                  variant="subtle"
                  colorScheme="green"
                  fontWeight="normal"
                >
                  {allJobs.filter((o) => !o.draft).length}
                </Badge>
              </Link>

              <CustomLink isExternal href={LINKS.docs} color="inherit">
                Docs
              </CustomLink>

              <CustomLink
                isExternal
                href={SOCIAL_LINKS.discord}
                color="inherit"
              >
                Discord
              </CustomLink>
            </Stack>
          </GridItem>

          {/* console */}
          <GridItem display={["none", "flex"]} justifyContent="flex-end">
            <Button
              as={ChakraLink}
              href={LINKS.console}
              _hover={{
                textDecoration: "none",
              }}
            >
              Console
            </Button>
          </GridItem>

          {/* mobile */}
          <GridItem display={["flex", "none"]} justifyContent="flex-end">
            <IconButton
              size="lg"
              onClick={onOpen}
              bg="transparent"
              aria-label="Open menu"
            >
              <Box as={Icon.Menu} fontSize="24px" />
            </IconButton>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}

export default Header;
