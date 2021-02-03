import { Flex, Box, Heading, Text } from '@chakra-ui/react'

function SectionDemoHeader({ number, title, desc }) {
  return (
    <Box as="header" pos="relative">
      <Box
        pos="absolute"
        left="50%"
        bottom="100%"
        w="2px"
        height="80px"
        bg="linear-gradient(to bottom, rgb(255 255 255 / 0%), rgb(255 255 255 / 50%))"
      />
      <Flex
        align="center"
        justify="center"
        boxSize="bubble"
        bg="white"
        borderRadius="full"
        mx="auto"
      >
        <Text fontSize={['md', 'xl']} color="black" fontWeight="bold">
          {number}
        </Text>
      </Flex>

      <Heading tag="h4" fontSize="2xl" mt={3}>
        {title}
      </Heading>

      {desc && (
        <Text fontSize={['md', 'xl']} color="whiteAlpha.700" mt={1}>
          {desc}
        </Text>
      )}
    </Box>
  )
}

export default SectionDemoHeader
