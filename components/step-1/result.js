import { useState, useEffect } from 'react'
import { Box, VStack, useClipboard, useToast } from '@chakra-ui/react'
import { Label } from '../label'
import CopyText from './copy-text'
import Confetti from 'react-dom-confetti'

function Result({ db }) {
  const toast = useToast()

  const [confetti, confettiSet] = useState(false)
  const [text, textSet] = useState('')
  const { onCopy } = useClipboard(text)

  const onClick = (value) => {
    textSet(value)
  }

  useEffect(() => {
    confettiSet(true)
  }, [])

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
      pos="relative"
      w="full"
      maxW={600}
      mx="auto"
      p={8}
      bg="whiteAlpha.900"
      color="black"
      borderRadius="2xl"
    >
      <Box pos="absolute" left="50%" top="50%">
        <Confetti
          config={{
            angle: 90,
            spread: 200,
            startVelocity: 40,
            elementCount: 60,
            dragFriction: 0.12,
            duration: 5000,
            stagger: 5,
            width: '10px',
            height: '10px',
            perspective: '426px',
            colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
          }}
          active={confetti}
        />
      </Box>
      <VStack spacing={1}>
        <Box>
          <Box>
            <Label>Endpoint</Label>
          </Box>
          <CopyText value={db.endpoint} onClick={onClick} />
        </Box>
        <Box>
          <Box>
            <Label>Password</Label>
          </Box>
          <CopyText value={db.password} onClick={onClick} />
        </Box>
        <Box>
          <Box>
            <Label>Region</Label>
          </Box>
          <CopyText value={db.region} onClick={onClick} />
        </Box>
        <Box>
          <Box>
            <Label>port</Label>
          </Box>
          <CopyText value={db.port} onClick={onClick} />
        </Box>
      </VStack>
    </Box>
  )
}

export default Result
