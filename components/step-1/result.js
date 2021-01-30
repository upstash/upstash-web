import { useState, useEffect } from 'react'
import { Box, Button, VStack, Text, useClipboard } from '@chakra-ui/react'
import { Label } from '../label'
import * as Icon from '../icons'

function CopyText({ value, onClick }) {
  return (
    <Button
      as={Text}
      onClick={() => onClick(value)}
      userSelect="auto"
      bg="transparent"
      _hover={{ bg: 'transparent' }}
    >
      <Text>{value}</Text>
      <Box as={Icon.Copy} ml={2} opacity={0.4} />
    </Button>
  )
}

function Result({ db }) {
  const [text, textSet] = useState(null)
  const { onCopy } = useClipboard(text)

  useEffect(() => {
    if (text === null) return
    onCopy()
  }, [text])

  return (
    <Box
      w="full"
      maxW={600}
      mx="auto"
      p={8}
      bg="purple.100"
      color="black"
      borderRadius="2xl"
    >
      <VStack spacing={4}>
        <Box>
          <Label>Endpoint</Label>
          <CopyText value={db.endpoint} onClick={(value) => textSet(value)} />
        </Box>
        <Box>
          <Label>Password</Label>
          <CopyText value={db.password} onClick={(value) => textSet(value)} />
        </Box>
        <Box>
          <Label>Region</Label>
          <CopyText value={db.region} onClick={(value) => textSet(value)} />
        </Box>
        <Box>
          <Label>port</Label>
          <CopyText value={db.port} onClick={(value) => textSet(value)} />
        </Box>
      </VStack>
    </Box>
  )
}

export default Result
