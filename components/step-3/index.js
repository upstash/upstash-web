import { Box, Button, Link } from '@chakra-ui/react'

function Step3({ url }) {
  return (
    <Box>
      <Button
        size="lg"
        as={Link}
        href={url}
        color="black"
        bg="primary"
        _hover={{
          textDecoration: 'none'
        }}
      >
        Go to Console
      </Button>
    </Box>
  )
}

export default Step3
