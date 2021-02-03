import { Link, Container, Button, Box, Heading, Text } from '@chakra-ui/react'
import { LINKS } from '../constants'

function SectionHero() {
  return (
    <Box as="section" py={['100px', '100px']} textAlign="center">
      <Container maxW="5xl">
        {/**/}

        <Heading
          as="h1"
          fontSize={['60px', '110px']}
          fontWeight="extrabold"
          lineHeight="none"
          letterSpacing="tight"
        >
          Serverless <br />
          Database <br />
          for Redis
          <Text as="span" verticalAlign="super" fontSize=".4em">
            ®
          </Text>
        </Heading>

        <Box mt="24px" fontSize={['md', '2xl']} color="whiteAlpha.700">
          <Text>Fast. Simple. Serverless.</Text>
        </Box>

        <Button
          as={Link}
          href={LINKS.console}
          mt="40px"
          size="lg"
          color="black"
          bg="primary"
          _hover={{
            textDecoration: 'none'
          }}
        >
          Get started for free
        </Button>

        {/**/}
      </Container>
    </Box>
  )
}

export default SectionHero
