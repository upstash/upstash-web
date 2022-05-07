import { Container, Heading, Text, Box, Accordion } from "@chakra-ui/react";
import FaqAccordionItem from "./section-faq-accordion-item";
import CustomLink from "./custom-link";
import { LINKS } from "constants/";

function SectionFaq() {
  return (
    <Box
      as="section"
      pt={["100px", "80px"]}
      pb={["100px", "220px"]}
      textAlign="center"
    >
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading as="h2" size="2xl">
            FAQ
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={["md", "xl"]} color="whiteAlpha.600" mt={3}>
              Frequently Asked Questions
            </Text>
          </Container>
        </Box>

        <Accordion defaultIndex={0} mt={[10, 20]}>
          {/**/}

          <FaqAccordionItem title="What is a Serverless Data?">
            <Text>
              With servers/instances, you pay per-hour or a fixed price. With
              Serverless, you pay per-request. This means you're not charged
              when your data isn't in use. And Upstash configures and manages
              the everything for you.
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="My app is not serverless. Can I still use Upstash?">
            <Text>
              Yes! You can use whatever architecture you like, you can still use
              Upstash Redis and Kafka.
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="Can I use Upstash Redis as a database?">
            <Text>
              Definitely, yes. Some users are worried that Redis data will be
              lost when a server crashes. This is not the case for Upstash
              thanks to Durable Storage. Data is reloaded to memory from block
              storage in case of a server crash. For more information, see our
              documentation{" "}
              <CustomLink isExternal noIcon href={LINKS.durability}>
                durable storage.
              </CustomLink>
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="How does Upstash Redis compare to Elasticache and RedisLabs?">
            <Text>
              With ElastiCache and Redislabs, you pay a fixed price even when
              not using your database. Their price is based on instance-hour.
              Upstash pricing is pay per request.
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="How does Upstash Kafka compare to Confluent and AWS MSK?">
            <Text>
              Both Confluent and AWS MSK have fixed cost, that means you pay a
              fixed amount even if you are not accessing your Kafka cluster.
              Upstash Kafka pricing is based on per messages. So you do not pay
              if you are not using the cluster.
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="When should I prefer REST API over the Kafka/Redis clients?">
            <Text>
              If your application runs on serverless or edge functions (AWS
              Lambda, Cloudflare Workers) then using REST protocol will free
              your from any connection problem which are common in serverless
              functions.
            </Text>
          </FaqAccordionItem>

          {/**/}
        </Accordion>

        <Box mt={6}>
          <CustomLink isExternal href={LINKS.faq}>
            See more FAQs
          </CustomLink>
        </Box>

        {/**/}
      </Container>
    </Box>
  );
}

export default SectionFaq;
