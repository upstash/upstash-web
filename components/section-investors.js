import {
  Container,
  Box,
  Avatar,
  Text,
  Wrap,
  WrapItem,
  Heading
} from '@chakra-ui/react'

function Investor({ name, title, src }) {
  return (
    <Box>
      <Avatar name={name} src={src} size="lg" />
      <Heading tag="h5" size="md" mt={4}>
        {name}
      </Heading>
      <Text color="whiteAlpha.600">{title}</Text>
    </Box>
  )
}

function SectionInvestors(props) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      textAlign="center"
      mb={[20, 40]}
      {...props}
    >
      <Container maxW="5xl">
        {/**/}

        <Box as="header">
          <Heading tag="h2" size="2xl">
            Our investors
          </Heading>
          <Container maxW="3xl">
            <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
              We are fortunate to work with some of the best investors in the
              world. Chances are you are already using the products they helped
              to create.
            </Text>
          </Container>
        </Box>

        <Wrap spacing="30px" justify="center" mt={20}>
          <WrapItem
            width={['calc(50% - 30px)', 'calc(33% - 30px)']}
            justifyContent="center"
          >
            <Investor
              name="Robin Vasan"
              title="Enterprise Seed, Early Stage Investor"
              src="/investors/robin.jpeg"
            />
          </WrapItem>
          <WrapItem
            width={['calc(50% - 30px)', 'calc(33% - 30px)']}
            justifyContent="center"
          >
            <Investor
              name="Naval Ravikant"
              title="Founder of AngelList. Investor in Twitter, Uber"
              src="/investors/naval.jpeg"
            />
          </WrapItem>
          <WrapItem
            width={['calc(50% - 30px)', 'calc(33% - 30px)']}
            justifyContent="center"
          >
            <Investor
              name="Guillermo Rauch"
              title="CEO @vercel"
              src="/investors/rauchg.jpeg"
            />
          </WrapItem>
          <WrapItem
            width={['calc(50% - 30px)', 'calc(33% - 30px)']}
            justifyContent="center"
          >
            <Investor
              name="Matias Woloski"
              title="Co-Founder @auth0"
              src="/investors/woloski.jpeg"
            />
          </WrapItem>
          <WrapItem
            width={['calc(50% - 30px)', 'calc(33% - 30px)']}
            justifyContent="center"
          >
            <Investor
              name="Max Stoiber"
              title="Creator of styled-components, Investor"
              src="/investors/mxstbr.jpeg"
            />
          </WrapItem>
        </Wrap>
      </Container>
    </Box>
  )
}

export default SectionInvestors
