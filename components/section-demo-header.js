import { Flex, Box, Heading, Text } from '@chakra-ui/react'

function SectionDemoHeader({ number, title, desc }) {
  return (
    <Box as="header">
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

      <Heading tag="h4" fontSize="2xl" mt={2}>
        {title}
      </Heading>

      {desc && (
        <Text fontSize={['md', 'xl']} color="whiteAlpha.600" mt={3}>
          {desc}
        </Text>
      )}
    </Box>
  )
}

export default SectionDemoHeader
