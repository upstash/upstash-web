import {
  Box,
  SimpleGrid,
  Container,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import Section from "components/section";
import Bg from "components/bg";
import Simple from "components/icons/Mission2";
import Kafka from "components/icons/API";
import SupportCard from "components/section-support-card";
import Docs from "components/icons/Docs";
import Head from "next/head";
import CodeBlock from "components/code-block";
import Redis from "components/icons/Global";
import { LINKS } from "constants/index.js";

const FEATURES = [
  {
    title: "Simple",
    desc: "Start Using Kafka in 15 seconds.",
    icon: <Box as={Simple} w={16} mx="auto" color="primary" />,
  },
  {
    title: "Apache Kafka",
    desc: "Works with all Kafka Clients.",
    icon: <Box as={Kafka} w={16} mx="auto" color="primary" />,
  },
  {
    title: "REST API",
    desc: "Designed for serverless and edge functions.",
    icon: <Box as={Redis} w={16} mx="auto" color="primary" />,
  },
];

function FeatureItem({ title, desc, icon }) {
  return (
    <Box>
      {icon}

      <Heading as="h3" size="md" mt={5}>
        {title}
      </Heading>
      <Text mt={3} color="whiteAlpha.600">
        {desc}
      </Text>
    </Box>
  );
}

function HomePage() {
  let code1 = `
const { Kafka } = require('kafkajs')
 
const kafka = new Kafka({
  brokers: ['full-mantis-14187-us1-kafka.upstash.io:9092'],
  sasl: {
    mechanism: 'scram-sha-256',
    username: 'ZnVsbC1tYW50aXMtMTQyODkHBV9Jjzow03SnUtRQ',
    password: '4-R-fmtoalXnoeu9TjQBOOL4njfSKwEsE10YvjqUrrq5_yAq4TPGd9c6JbqfQ==',
  },
  ssl: true,
})
 
const producer = kafka.producer()
producer.connect()
// ...
producer.disconnect()
  `;

  let code2 = `
fetch("https://full-mantis-14187-us1-rest-kafka.upstash.io/produce/github-events/MESSAGE", {
  headers: {
    Authorization: "Basic Wm5Wc2JDMXRZVrthtr56VdFJROjQtUi1mbXRvYWxYbm9ldTlUalFCT09MNG5qZlNLd0VzRTEwWXZITWlXNjNoRmxqcVVycnE1X3lBcTRUUEdkOWM2SmJxZlE9PQ=="
  }
}).then(response => response.json())
  .then(data => {
    console.log(data)
  });
  `;

  return (
    <>
      <Head>
        <title>Upstash: The Serverless Kafka</title>
      </Head>

      <Box as="section" py={["70px", "100px"]}>
        <Container maxW="5xl">
          <SimpleGrid columns={[1, 2]} spacing={10} alignItems="center">
            <div>
              <Heading as="h1" fontWeight="extrabold" size="2xl">
                Serverless <br />
                Kafka <br />
              </Heading>

              <Box mt="24px" fontSize={["md", "xl"]} color="whiteAlpha.700">
                <Text>
                  Kafka as a service with per request pricing.
                  <br />
                  <br />
                  Kafka/REST API together with flexible pricing makes Upstash
                  Kafka a perfect event streaming solution for modern
                  architectures.
                </Text>
                <Button
                  as={Link}
                  href={LINKS.consoleNextjs}
                  mt="20px"
                  size="lg"
                  color="black"
                  bg="primary"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  Start for free in 30 seconds
                </Button>
              </Box>
            </div>
            <div>
              <img
                src="/assets/upstash-kafka.svg"
                alt="Serverless Database for Apache Kafka"
              />
            </div>
          </SimpleGrid>
        </Container>

        <Container
          maxW="5xl"
          mt={20}
          p={10}
          textAlign="center"
          bgColor="whiteAlpha.200"
          borderRadius="2xl"
        >
          <SimpleGrid columns={[1, 3]} spacing={10}>
            {FEATURES.map((mission) => {
              return <FeatureItem key={mission.title} {...mission} />;
            })}
          </SimpleGrid>
        </Container>
      </Box>

      <Section py={["100px", "140px"]}>
        <Bg />

        <Box as="header">
          <Heading as="h2" size="2xl">
            Kafka Easier Than Ever
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={["md", "xl"]} color="whiteAlpha.600" mt={3}>
              Add Kafka to your application in seconds
            </Text>
          </Container>
        </Box>

        <Container maxW="4xl" mt={12}>
          <CodeBlock fileName="Using Kafka Client">{code1}</CodeBlock>
        </Container>
        <Container maxW="4xl" mt={12}>
          <CodeBlock fileName="Using REST">{code2}</CodeBlock>
        </Container>
      </Section>

      <Section py={["100px", "140px"]}>
        <Bg />

        <Box as="header">
          <Heading as="h2" size="2xl">
            Community Resources
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={["md", "xl"]} color="whiteAlpha.600" mt={3}>
              Check our docs and examples to learn more
            </Text>
          </Container>
        </Box>

        <Container maxW="5xl">
          <SimpleGrid mt={[10, 20]} columns={[1, 3]} spacing={6}>
            <SupportCard theme="next" href={"https://docs.upstash.com/kafka"}>
              <Box as={Docs} w={20} mx="auto" color="primary" />
              <Text>
                <br /> <b> Upstash Kafka </b>
                <br />
                Getting Started Guide
              </Text>
            </SupportCard>
            {/**/}
            <SupportCard
              theme="next"
              href={
                "https://docs.upstash.com/kafka/tutorials/getstarted_awslambda_kafka"
              }
            >
              <Box as={Docs} w={20} mx="auto" color="primary" />
              <Text>
                <br />
                <b> Get started</b>
                <br /> with AWS Lambda
              </Text>
            </SupportCard>
            {/**/}
            <SupportCard
              theme="next"
              href={
                "https://docs.upstash.com/kafka/tutorials/getstarted_cloudflare_workers_kafka"
              }
            >
              <Box as={Docs} w={20} mx="auto" color="primary" />
              <Text>
                <br />
                <b> Get started</b>
                <br /> with Cloudflare Workers
              </Text>
            </SupportCard>
            {/**/}
          </SimpleGrid>
        </Container>
      </Section>
    </>
  );
}

export default HomePage;
