import { HStack, Flex, Text } from '@chakra-ui/react'

function Title({ number, children }) {
  return (
    <HStack as="header" justify="center">
      <Flex
        align="center"
        w="34px"
        h="34px"
        justify="center"
        bg="white"
        borderRadius="full"
      >
        <Text fontSize={['md', 'xl']} color="black" fontWeight="bold">
          {number}
        </Text>
      </Flex>

      <Text fontWeight="medium" fontSize={['md', 'xl']} mt={1}>
        {children}
      </Text>
    </HStack>
  )
}

export default Title
