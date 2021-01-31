import { Box, VStack, Input, Select } from '@chakra-ui/react'
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  names
} from 'unique-names-generator'
import { Label } from '../label'
import CreateButton from './create-button'

const databaseNameConfig = {
  dictionaries: [adjectives, animals, names],
  separator: '-',
  style: 'lowerCase'
}

const DB_NAME = uniqueNamesGenerator(databaseNameConfig)

function Form({ auth0, loading, onCreateDB }) {
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
        <Label htmlFor="db-name">Database Name</Label>
        <Input
          id="db-name"
          defaultValue={DB_NAME}
          variant="filled"
          bg="whiteAlpha.300"
          _hover={{
            bg: 'whiteAlpha.400'
          }}
        />
      </VStack>

      {/* region */}
      <VStack spacing={1} mt={4} align="stretch">
        <Label htmlFor="db-region">Region</Label>
        <Select
          defaultValue="us-east-1"
          variant="filled"
          bg="whiteAlpha.300"
          _hover={{
            bg: 'whiteAlpha.400'
          }}
        >
          <option value="us-east-1">US-EAST-1 (N. Virginia)</option>
        </Select>
      </VStack>

      {/* create */}
      <Box mt={6}>
        <CreateButton auth0={auth0} loading={loading} onCreateDB={onCreateDB} />
      </Box>
    </Box>
  )
}

export default Form
