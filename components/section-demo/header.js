import { Flex, Box, Heading, Text } from '@chakra-ui/react'

function SectionDemoHeader({ number, title, desc }) {
  return (
    <Box as="header">
      <Flex
        align="center"
        justify="center"
        boxSize="40px"
        bg="white"
        borderRadius="full"
        mx="auto"
      >
        <Text fontSize={['md', 'xl']} color="gray.800" fontWeight="bold">
          {number}
        </Text>
      </Flex>

      <Heading tag="h4" fontSize="2xl" mt={2}>
        {title}
      </Heading>

      {desc && (
        <Text fontSize={['md', 'xl']} color="gray.400" mt={2}>
          {desc}
        </Text>
      )}
    </Box>
  )
}

export default SectionDemoHeader
