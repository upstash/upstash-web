import dynamic from "next/dynamic";
import { Box, Button, Container, Heading, Link, Text } from "@chakra-ui/react";
import { LINKS } from "../constants";
import React from "react";

const AnimatedGlobe = dynamic(() => import("components/globe"), {
  ssr: false,
});

export default function TestPage() {
  return (
    <Box pt={200} pb={160}>
      <Container maxW="5xl">
        <Box width="40%" pos="relative" zIndex={1}>
          <Box as="header">
            <Heading as="h1" size="2xl">
              Global Latency Benchmark for Serverless Redis
            </Heading>
            <Text
              mt={4}
              fontSize={["md", "2xl"]}
              fontWeight={"light"}
              color="whiteAlpha.700"
              lineHeight="short"
            >
              We have implemented an AWS Lambda function which reads a value
              from an Upstash database using the REST API.
            </Text>

            {/*We have deployed this function to 8 different regions all over the world.*/}

            <Button mt={8} size="lg" color="black" bg="primary" _hover={{}}>
              Start
            </Button>
          </Box>
        </Box>

        <Box
          zIndex={0}
          pos="absolute"
          left="50%"
          top={-100}
          transform="translateX(-200px)"
        >
          <AnimatedGlobe width={1200} height={1200} />
        </Box>
      </Container>
    </Box>
  );
}
