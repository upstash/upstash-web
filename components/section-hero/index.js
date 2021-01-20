import { Container, Button, Box, Heading, Text } from '@chakra-ui/react'

function SectionHero() {
  return (
    <Box as="section" py={['100px', '120px']} textAlign="center">
      <Container maxW="5xl">
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

        <Box mt="24px" fontSize={['md', '2xl']} color="gray.400">
          <Text>
            Run Lambda Store Database without thinking about the servers.
          </Text>
          <Text d={['none', 'block']}>
            Start for free, then just pay for what you use.
          </Text>
        </Box>

        <Button href="/" mt="40px" size="lg" colorScheme="yellow">
          Get started for free
        </Button>
      </Container>
    </Box>
  )
}

export default SectionHero
