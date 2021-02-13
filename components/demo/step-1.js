import { Flex, Box, Text, VStack } from '@chakra-ui/react'
import Window from './window'
import WindowHeader from './window-header'

function FormItem({ label, input, ...props }) {
  return (
    <Box w="full" {...props}>
      <Text
        fontSize="11px"
        lineHeight="none"
        letterSpacing="wider"
        textTransform="uppercase"
        color="whiteAlpha.500"
      >
        {label}
      </Text>
      <Flex
        mt={1}
        align="center"
        justify="center"
        px={6}
        h="40px"
        borderRadius="md"
        color="whiteAlpha.800"
        bg="whiteAlpha.200"
      >
        <Text fontSize="sm">{input}</Text>
      </Flex>
    </Box>
  )
}

function Step1() {
  return (
    <Window>
      <WindowHeader>
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
      </WindowHeader>

      <Flex grow={1} py={10} align="center" justify="center" userSelect="none">
        <VStack spacing={4} w="full" maxW={240}>
          {/* */}

          <FormItem label="Database Name" input="my-serverless-db" />
          <FormItem label="Region" input="US-EAST-1 (N. Virginia)" />
          <Flex
            w="full"
            h="40px"
            px={6}
            align="center"
            justify="center"
            color="black"
            bg="white"
            fontSize="sm"
            borderRadius="md"
          >
            <Text fontSize="sm" fontWeight="medium">
              Create
            </Text>
          </Flex>

          {/* */}
        </VStack>
      </Flex>
    </Window>
  )
}

export default Step1
