import { Text } from '@chakra-ui/react'

export function Label({ children, ...props }) {
  return (
    <Text
      as="label"
      fontSize="xs"
      lineHeight="none"
      letterSpacing="wider"
      textTransform="uppercase"
      opacity={0.4}
      {...props}
    >
      {children}
    </Text>
  )
}
