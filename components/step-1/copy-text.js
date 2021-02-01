import { Button, Text, Box } from '@chakra-ui/react'
import * as Icon from '../icons'

export default function CopyText({ value, onClick }) {
  return (
    <Button
      as={Text}
      onClick={() => onClick(value)}
      userSelect="auto"
      cursor="pointer"
      bg="transparent"
      _hover={{ bg: 'transparent' }}
    >
      <Text>{value}</Text>
      <Box as={Icon.Copy} ml={2} opacity={0.4} />
    </Button>
  )
}
