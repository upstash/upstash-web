import { Text } from '@chakra-ui/react'

export function Label({ children, ...props }) {
  return (
    <Text
      tag="label"
      fontSize="xs"
      lineHeight="none"
      letterSpacing="wider"
      textTransform="uppercase"
      opacity={0.5}
      {...props}
    >
      {children}
    </Text>
  )
}
