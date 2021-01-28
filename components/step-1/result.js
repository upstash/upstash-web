import { Box, VStack, useClipboard } from '@chakra-ui/react'
import { Label } from '../form'

function Result({ db }) {
  const { hasCopied, onCopy } = useClipboard('')

  return (
    <Box bg="whiteAlpha.500" color="black">
      <VStack gap={8}>
        <Box>
          <Label>endpoint</Label>
          <Box>{db.endpoint}</Box>
        </Box>
        <Box>
          <Label>password</Label>
          <Box>{db.password}</Box>
        </Box>
        <Box>
          <Label>Region</Label>
          <Box>{db.region}</Box>
        </Box>
        <Box>
          <Label>port</Label>
          <Box>{db.port}</Box>
        </Box>
      </VStack>
    </Box>
  )
}

export default Result
