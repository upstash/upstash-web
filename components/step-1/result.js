import { useState, useEffect } from 'react'
import { Box, VStack, useClipboard, useToast } from '@chakra-ui/react'
import { Label } from '../label'
import CopyText from './copy-text'

function Result({ db }) {
  const toast = useToast()

  const [text, textSet] = useState('')
  const { onCopy } = useClipboard(text)

  const onClick = (value) => {
    textSet(value)
  }

  useEffect(() => {
    if (text === '') return
    onCopy()
    toast({
      status: 'success',
      title: 'Copied!',
      position: 'top',

      duration: 1500
    })
  }, [text])

  return (
    <Box
      w="full"
      maxW={600}
      mx="auto"
      p={8}
      bg="purple.200"
      color="black"
      borderRadius="2xl"
    >
      <VStack spacing={4}>
        <Box>
          <Label>Endpoint</Label>
          <CopyText value={db.endpoint} onClick={onClick} />
        </Box>
        <Box>
          <Label>Password</Label>
          <CopyText value={db.password} onClick={onClick} />
        </Box>
        <Box>
          <Label>Region</Label>
          <CopyText value={db.region} onClick={onClick} />
        </Box>
        <Box>
          <Label>port</Label>
          <CopyText value={db.port} onClick={onClick} />
        </Box>
      </VStack>
    </Box>
  )
}

export default Result
