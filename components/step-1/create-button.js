import { Box, VStack, Button, Spinner } from '@chakra-ui/react'
import { useEffect } from 'react'
import User from './user'
import Error from './error'

export default function CreateButton({ auth0, loading, onCreateDB }) {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithPopup,
    logout,
    getIdTokenClaims
  } = auth0

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
