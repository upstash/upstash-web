import {
  Box,
  Container,
  Stack,
  VStack,
  HStack,
  Text,
  Link,
  IconButton,
} from "@chakra-ui/react";
import CustomLink from "./custom-link";
import Bg from "./bg";
import * as Icon from "./icons";
import Logo from "./logo";
import { LINKS, SOCIAL_LINKS } from "constants/";

function Footer() {
  return (
    <Box
      as="footer"
      pos="relative"
      overflow="hidden"
      py={["80px", "120px"]}
      textAlign="center"
      zIndex={90}
    >
      <Bg />

      <Container maxW="5xl">
        <VStack spacing={["32px", "40px"]}>
          {/**/}

          <Box>
            <Logo />
          </Box>

          <HStack spacing="16px">
            <IconButton
              as={Link}
              isExternal
              href={SOCIAL_LINKS.twitter}
              size="lg"
              isRound
              aria-label="Upstash on Twitter"
            >
              <Box as={Icon.Twitter} fontSize={20} />
            </IconButton>
            <IconButton
              as={Link}
              isExternal
              href={SOCIAL_LINKS.blog}
              size="lg"
              isRound
              aria-label="Upstash on Medium"
            >
              <Box as={Icon.Medium} fontSize={20} />
            </IconButton>
            <IconButton
              as={Link}
              isExternal
              href={SOCIAL_LINKS.discord}
              size="lg"
              isRound
              aria-label="Upstash on Discord"
            >
              <Box as={Icon.Discord} fontSize={20} />
            </IconButton>
          </HStack>

          <Stack
            direction={["column", "row"]}
            align="center"
            spacing={["16px", "24px"]}
            color="whiteAlpha.700"
          >
            <CustomLink isExternal href={LINKS.support} color="inherit">
              Contact Us
            </CustomLink>
            <CustomLink isExternal href={LINKS.privacy} color="inherit">
              Privacy Policy
            </CustomLink>
            <CustomLink isExternal href={LINKS.terms} color="inherit">
              Terms of Service
            </CustomLink>
          </Stack>

          <Box>
            <Text>
              © {new Date().getFullYear()} Upstash, Inc. Based in California.
            </Text>
          </Box>

          <Box w="full">
            <Container maxW="xl">
              <Text fontSize="xs" color="whiteAlpha.500">
                * Redis is a trademark of Redis Ltd. Any rights therein are
                reserved to Redis Ltd. Any use by Upstash is for referential
                purposes only and does not indicate any sponsorship, endorsement
                or affiliation between Redis and Upstash.
              </Text>
              <Text fontSize="xs" color="whiteAlpha.500">
                ** Cloudflare, the Cloudflare logo, and Cloudflare Workers are
                trademarks and/or registered trademarks of Cloudflare, Inc. in
                the United States and other jurisdictions.
              </Text>
            </Container>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default Footer;
