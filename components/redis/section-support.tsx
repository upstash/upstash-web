import { Container, SimpleGrid, Heading, Text, Box } from "@chakra-ui/react";
import SectionSupportIconRedis from "../section-support-icon-redis";
import SectionSupportIconNext from "../section-support-icon-next";
import SectionSupportIconAws from "../section-support-icon-aws";
import SupportCard from "../section-support-card";
import SectionSupportIconRest from "../section-support-icon-rest";

function SectionSupport() {
  return (
    <Box as="section" my={["100px", "220px"]} textAlign="center">
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading as="h2" size="2xl">
            Best Choice for the Jamstack
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={["md", "xl"]} color="whiteAlpha.600" mt={3}>
              Low latency data, ease of use, and pay-per-request pricing makes
              Upstash a perfect choice for the Jamstack and Serverless world.
            </Text>
          </Container>
        </Box>

        <SimpleGrid mt={[10, 20]} columns={[1, 2, 4]} spacing={6}>
          <SupportCard
            bgColor="#fff"
            textColor="#000"
            href="'https://docs.upstash.com/tutorials/nextjs_with_redis'"
          >
            <SectionSupportIconNext />
            <Text>
              Check out docs for <br />
              <Text as="b" fontWeight="bold">
                Next.js
              </Text>
              <br /> Integration
            </Text>
          </SupportCard>

          <SupportCard
            bgColor="#ffe8d3"
            textColor="#7b512d"
            href="https://docs.upstash.com/redis/howto/getstartedawslambda"
          >
            <SectionSupportIconAws />
            <Text>
              Check out docs for <br />
              <Text as="b" fontWeight="bold">
                AWS Lambda
              </Text>
              <br /> Integration
            </Text>
          </SupportCard>

          <SupportCard
            bgColor="#ffdada"
            textColor="#791514"
            href="https://docs.upstash.com/redis/overall/rediscompatibility"
          >
            <SectionSupportIconRedis />
            <Text>
              Check out docs <br />
              <Text as="b" fontWeight="bold">
                Redis API
              </Text>{" "}
              <br />
              Compatibility
            </Text>
          </SupportCard>

          <SupportCard
            bgColor="#dafff2"
            textColor="#205643"
            href="https://docs.upstash.com/redis/features/restapi"
          >
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
  );
}

export default SectionSupport;
