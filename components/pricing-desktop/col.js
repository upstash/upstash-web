import { Flex } from '@chakra-ui/react'

export default function Col({ children, highlight = false, ...props }) {
  return (
    <Flex
      p={4}
      align="center"
      justify="center"
      bg={highlight && 'whiteAlpha.300'}
      {...props}
    >
      {children}
    </Flex>
  )
}
