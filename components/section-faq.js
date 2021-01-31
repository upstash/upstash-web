import { Container, Heading, Text, Box, Accordion } from '@chakra-ui/react'
import FaqAccordionItem from './section-faq-accordion-item'
import CustomLink from './custom-link'

function SectionFaq() {
  return (
    <Box
      as="section"
      pt={['100px', '80px']}
      pb={['100px', '220px']}
      textAlign="center"
    >
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading tag="h2" size="2xl">
            FAQ
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              Frequently Asked Questions
            </Text>
          </Container>
        </Box>

        <Accordion mt={[10, 20]}>
          {/**/}

          <FaqAccordionItem title="What does it mean Serverless Database?">
            <Text>
              You do not have to plan and provision servers. You do not deal
              with configuring or maintaining any server. You just use the
              service and pay per request. You do not pay if you are not using.
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="My stack is not serverless. Can I use Upstash?">
            <Text>
              Absolutely. Your application can be running on an EC2 Instance or
              a container, still you can use Upstash.
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="How do you compare Upstash with Elasticache and RedisLabs?">
            <Text>
              With ElastiCache or Redislabs you pay even you do not utilize the
              database. Their price is based on provisioned memory size. Upstash
              pricing is pay per request.
            </Text>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="What about Dynamodb and Fauna?">
            <Text>
              DynamoDB can not compete with Upstash on latency. In Upstash the
              latency of a read query is submillisecond while it is up to 10
              msec in DynamoDB. Besides latency, you will miss the simplicity
              and elegance of Redis API much if you are working with DynamoDB.
              Moreover your investment into the DynamoDB worthies only if you
              are on AWS meanwhile Redis is everywhere.
            </Text>
            <Text>
              Fauna's latency is even worse than Dynamodb because they replicate
              the data to multiple regions in a strongly consistent way. If your
              use case is very consistency sensitive, then Fauna is good.
              Otherwise, it is slow and expensive.
            </Text>
          </FaqAccordionItem>

          {/**/}
        </Accordion>

        <Box mt={6}>
          <CustomLink isExternal href="/">
            See more FAQs
          </CustomLink>
        </Box>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionFaq
