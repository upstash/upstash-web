import { Box, Container, VStack, Text, Heading } from "@chakra-ui/react";
import Bg from "../bg";
import RedisDesktopTable from "../redis-pricing-desktop";
import RedisMobileTable from "../redis-pricing-mobile";
import CustomLink from "../custom-link";
import { LINKS } from "constants/index.js";

function SectionPricing() {
  return (
    <Box
      as="section"
      id="section-pricing"
      pos="relative"
      overflow="hidden"
      py={["100px", "140px"]}
      textAlign="center"
    >
      <Bg />

      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading as="h2" size="2xl">
            Plans & Pricing
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={["md", "xl"]} color="whiteAlpha.600" mt={3}>
              Pay only for what you use with per-request pricing.
            </Text>
          </Container>
        </Box>

        <Box mt={[10, 20]}>
          <Box d={["none", "block"]}>
            <RedisDesktopTable />
          </Box>
          <Box d={["block", "none"]}>
            <RedisMobileTable />
          </Box>
        </Box>

        <VStack spacing={2} mt={14}>
          <Text>Disk storage cost is $0.25 per GB per month.</Text>
          <Text>
            Enabling Multi Zone Replication doubles both request and storage
            price.
          </Text>
          <Text>
            See{" "}
            <CustomLink isExternal noIcon href={LINKS.pricing}>
              pricing page
            </CustomLink>{" "}
            for more information.
          </Text>
          <Text>
            Talk to{" "}
            <CustomLink isExternal noIcon href={LINKS.support}>
              us
            </CustomLink>{" "}
            for advanced needs.
          </Text>
        </VStack>

        {/**/}
      </Container>
    </Box>
  );
}

export default SectionPricing;
