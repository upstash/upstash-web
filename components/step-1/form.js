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
        <Box>
          <Label htmlFor="db-name">Database Name</Label>
        </Box>
        <Box>
          <Input
            id="db-name"
            defaultValue={DB_NAME}
            variant="filled"
            bg="whiteAlpha.300"
            _hover={{
              bg: 'whiteAlpha.400'
            }}
          />
        </Box>
      </VStack>

      {/* region */}
      <VStack spacing={1} mt={4} align="stretch">
        <Box>
          <Label htmlFor="db-region">Region</Label>
        </Box>
        <Box>
          <Select
            variant="filled"
            bg="whiteAlpha.300"
            _hover={{
              bg: 'whiteAlpha.400'
            }}
          >
            <option value="us-east-1" selected>
              US-EAST-1 (N. Virginia)
            </option>
          </Select>
        </Box>
      </VStack>

      {/* create */}
      <Box mt={6}>
        <CreateButton auth0={auth0} loading={loading} onCreateDB={onCreateDB} />
      </Box>
    </Box>
  )
}

export default Form
