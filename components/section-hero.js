import { Link, Container, Button, Box, Heading, Text } from '@chakra-ui/react'

function SectionHero() {
  return (
    <Box as="section" py={['100px', '120px']} textAlign="center">
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
        </Heading>

        <Box mt="24px" fontSize={['md', '2xl']} color="whiteAlpha.700">
          <Text>Fast. Simple. Serverless.</Text>
        </Box>

        <Button
          as={Link}
          href="/"
          mt="40px"
          size="lg"
          bg="purple.500"
          _hover={{
            bg: 'purple.600',
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
