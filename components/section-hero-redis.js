import { Link, Container, Button, Box, Heading, Text } from '@chakra-ui/react'
import { LINKS } from '../constants'

function SectionHeroRedis() {
    return (
        <Box as="section" py={['80px', '100px']} textAlign="center">
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
                    <Text>Global Low Latency</Text>
                    <Text>Per-Request Pricing with Cap</Text>
                    <Text>Durable Storage</Text>
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
                    Start free in 30 seconds
                </Button>

                {/**/}
            </Container>
        </Box>
    )
}

export default SectionHeroRedis
