import {
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton
} from '@chakra-ui/react'

function Error({ message }) {
  return (
    <Alert status="error" borderRadius="md">
      <AlertIcon />
      <AlertDescription>Oops... {message}</AlertDescription>
      <CloseButton position="absolute" right="8px" top="8px" />
    </Alert>
  )
}

export default Error
