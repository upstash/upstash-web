import { Box, Button, Input, Select, VStack } from '@chakra-ui/react'
import { Label } from '../label'

function Step1() {
  return (
    <Box
      mx="auto"
      w="full"
      maxW={420}
      p={8}
      borderRadius="2xl"
      bg="whiteAlpha.200"
    >
      {/* name */}

      <VStack spacing={1} align="stretch">
        <Box>
          <Label htmlFor="db-name">Database Name</Label>
        </Box>
        <Input
          id="db-name"
          defaultValue="asd"
          variant="filled"
          bg="whiteAlpha.300"
          isDisabled
        />
      </VStack>

      {/* region */}
      <VStack spacing={1} mt={4} align="stretch">
        <Box>
          <Label htmlFor="db-region">Region</Label>
        </Box>
        <Select
          id="db-region"
          defaultValue="us-east-1"
          variant="filled"
          bg="whiteAlpha.300"
          isDisabled
        >
          <option value="us-east-1">US-EAST-1 (N. Virginia)</option>
        </Select>
      </VStack>

      {/* create */}
      <Box mt={6}>
        <Button w="full" color="black" bg="primary" isDisabled>
          Login and Create
        </Button>
      </Box>
    </Box>
  )
}

export default Step1
