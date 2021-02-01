import {
  Box,
  VStack,
  Input,
  Select,
  Text,
  Button,
  useMediaQuery
} from '@chakra-ui/react'
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
  const [isMobile] = useMediaQuery('(max-width: 30em)')

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
          defaultValue={DB_NAME}
          variant="filled"
          bg="whiteAlpha.300"
          _hover={{
            bg: 'whiteAlpha.400'
          }}
          isDisabled={isMobile}
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
          _hover={{
            bg: 'whiteAlpha.400'
          }}
          isDisabled={isMobile}
        >
          <option value="us-east-1">US-EAST-1 (N. Virginia)</option>
        </Select>
      </VStack>

      {/* create */}
      <Box mt={6}>
        <Box d={['none', 'block']}>
          <CreateButton
            auth0={auth0}
            loading={loading}
            onCreateDB={onCreateDB}
          />
        </Box>
        <Box d={['block', 'none']}>
          <Button w="full" color="black" bg="primary" isDisabled>
            Login and Create
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Form
