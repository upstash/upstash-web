import { Container, Heading, Text, Box, Accordion } from '@chakra-ui/react'
import FaqAccordionItem from './section-faq-accordion-item'
import CustomLink from './custom-link'

function SectionFaq() {
  return (
    <Box as="section" py={['100px', '140px']} textAlign="center">
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading tag="h2" size="2xl">
            FAQ
          </Heading>
          <Text fontSize="lg" mt={2} color="gray.500">
            Frequently Asked Questions
          </Text>
        </Box>

        <Accordion mt={[10, 20]}>
          {/**/}

          <FaqAccordionItem title="What are the use cases?">
            <Text>
              Upstash works for all the common usecases for Redis®. You can use
              Upstash in your serverless stack. In addition, you can use Upstash
              as storage (or caching) for your serverless functions.
            </Text>
            <CustomLink isExternal>See more</CustomLink>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="Do you support Redis Cluster?">
            <Text>
              Upstash works for all the common usecases for Redis®. You can use
              Upstash in your serverless stack. In addition, you can use Upstash
              as storage (or caching) for your serverless functions.
            </Text>
            <CustomLink isExternal>See more</CustomLink>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="Which regions do you support in AWS?">
            <Text>
              Upstash works for all the common usecases for Redis®. You can use
              Upstash in your serverless stack. In addition, you can use Upstash
              as storage (or caching) for your serverless functions.
            </Text>
            <CustomLink isExternal>See more</CustomLink>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="I have database with 10GB data, I pay nothing if I do not use it. Is that correct?">
            <Text>
              Upstash works for all the common usecases for Redis®. You can use
              Upstash in your serverless stack. In addition, you can use Upstash
              as storage (or caching) for your serverless functions.
            </Text>
            <CustomLink isExternal>See more</CustomLink>
          </FaqAccordionItem>

          {/**/}

          <FaqAccordionItem title="When I upgrade my free database, do I lose data?">
            <Text>
              Upstash works for all the common usecases for Redis®. You can use
              Upstash in your serverless stack. In addition, you can use Upstash
              as storage (or caching) for your serverless functions.
            </Text>
            <CustomLink isExternal>See more</CustomLink>
          </FaqAccordionItem>

          {/**/}
        </Accordion>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionFaq
