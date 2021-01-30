import { Box, VStack, Input, Button, Select, Spinner } from '@chakra-ui/react'
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  names
} from 'unique-names-generator'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Label } from '../label'
import User from './user'
import Error from './error'

const databaseNameConfig = {
  dictionaries: [adjectives, animals, names],
  separator: '-',
  style: 'lowerCase'
}

const DB_NAME = uniqueNamesGenerator(databaseNameConfig)

function Login({ loading, onCreateDB }) {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithPopup,
    logout,
    getIdTokenClaims
  } = useAuth0()

  useEffect(() => {
    async function getToken() {
      console.log(await getIdTokenClaims())
    }
    !isLoading && getToken()
  }, [isLoading, getIdTokenClaims])

  return (
    <VStack spacing={6} align="stretch">
      {isLoading && (
        <Box>
          <Spinner />
        </Box>
      )}

      {error && <Error />}

      {isAuthenticated ? (
        <VStack spacing={6} align="stretch">
          <User logout={logout} {...user} />

          <Button
            colorScheme="purple"
            w="full"
            isLoading={loading}
            onClick={onCreateDB}
          >
            Create
          </Button>
        </VStack>
      ) : (
        <Button colorScheme="purple" w="full" onClick={loginWithPopup}>
          Login and Create
        </Button>
      )}
    </VStack>
  )
}

function Form({ loading, onCreateDB }) {
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
        <Login loading={loading} onCreateDB={onCreateDB} />
      </Box>
    </Box>
  )
}

export default Form
