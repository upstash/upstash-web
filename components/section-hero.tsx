import {
  Link,
  HStack,
  Container,
  Button,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { LINKS } from "constants/";
import React from "react";
import Typist from "react-typist";
import LinkNext from "./link";

function SectionHero() {
  return (
    <Box as="section" pt={["80px", "100px"]} textAlign="center">
      <Container maxW="5xl">
        {/**/}

        <Heading
          as="h1"
          fontSize={["60px", "110px"]}
          fontWeight="extrabold"
          lineHeight="none"
          letterSpacing="tight"
        >
          <div>Serverless</div>
          <div>Data</div>
          <Typist avgTypingDelay={100}>
            <span>
              for Redis
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
            <Typist.Backspace count={6} delay={3000} />
            <span>
              Kafka
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
            <Typist.Backspace count={6} delay={3000} />
            <span>
              Redis
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
            <Typist.Backspace count={6} delay={3000} />
            <span>
              Kafka
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
            <Typist.Backspace count={6} delay={3000} />
            <span>
              Redis
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
            <Typist.Backspace count={6} delay={3000} />
            <span>
              Kafka
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
            <Typist.Backspace count={6} delay={3000} />
            <span>
              Redis
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
            <Typist.Backspace count={6} delay={3000} />
            <span>
              Kafka
              <Text
                as="span"
                verticalAlign="super"
                fontSize=".6em"
                fontWeight="normal"
              >
                ®
              </Text>
            </span>
          </Typist>
        </Heading>

        <Box mt="24px" fontSize={["md", "2xl"]} color="whiteAlpha.700">
          <Text>Global Low Latency</Text>
          <Text>Per-Request Pricing with Cap</Text>
        </Box>

        <Button
          as={Link}
          href={LINKS.console}
          mt="40px"
          size="lg"
          color="black"
          bg="primary"
          _hover={{
            textDecoration: "none",
          }}
        >
          Start free in 30 seconds
        </Button>

        <HStack
          mt="40px"
          spacing="24px"
          justifyContent="center"
          fontSize={["lg", "2xl"]}
        >
          <LinkNext
            href="/redis"
            color="primary"
            display="inline-flex"
            alignItems="center"
          >
            <Box as="span" opacity={0.3}>
              #
            </Box>
            redis
          </LinkNext>
          <LinkNext
            href="/kafka"
            color="primary"
            display="inline-flex"
            alignItems="center"
          >
            <Box as="span" opacity={0.3}>
              #
            </Box>
            kafka
          </LinkNext>
          <LinkNext
            href="/qstash"
            color="primary"
            display="inline-flex"
            alignItems="center"
          >
            <Box as="span" opacity={0.3}>
              #
            </Box>
            QStash
          </LinkNext>
        </HStack>

        {/**/}
      </Container>
    </Box>
  );
}

export default SectionHero;
