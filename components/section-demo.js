import { Container, Box, HStack, Flex, SimpleGrid } from '@chakra-ui/react'
// import Bg from './bg'
import Step1 from './step-1/step-1'
import Step2 from './step-2'

function Header({ children }) {
  function Dot() {
    return (
      <Box as="span" w="9px" h="9px" borderRadius="full" bg="whiteAlpha.300" />
    )
  }

  return (
    <Flex pos="relative" align="center" height="40px" bg="whiteAlpha.200">
      <HStack spacing={1} ml={4}>
        <Dot />
        <Dot />
        <Dot />
      </HStack>
      {children}
    </Flex>
  )
}

function SectionDemo(props) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      pb="220px"
      textAlign="center"
      {...props}
    >
      {/*<Bg top="40px" />*/}

      <Container maxW="5xl">
        {/* */}

        <SimpleGrid columns={2} spacing={8}>
          {/* */}

          <Box bg="mainBlack" borderRadius="xl" boxShadow="lg">
            <Flex
              direction="column"
              height="100%"
              overflow="hidden"
              bg="whiteAlpha.200"
              borderRadius="xl"
            >
              <Header>
                <Box
                  pos="absolute"
                  left="50%"
                  top="50%"
                  transform="translate(-50%, -50%)"
                  width="60%"
                  height="22px"
                  bg="whiteAlpha.200"
                  borderRadius="md"
                />
              </Header>
              <Step1 />
            </Flex>
          </Box>

          <Box bg="mainBlack" borderRadius="xl">
            <Box
              height="100%"
              overflow="hidden"
              bg="whiteAlpha.200"
              borderRadius="xl"
            >
              <Header />
              <Step2 />
            </Box>
          </Box>

          {/* */}
        </SimpleGrid>

        {/*  */}
      </Container>
    </Box>
  )
}

export default SectionDemo
