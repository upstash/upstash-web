import { Box, Button, Link } from '@chakra-ui/react'
import { LINKS } from '../../constants'

function Step3() {
  return (
    <Box>
      <Button
        colorScheme="purple"
        size="lg"
        as={Link}
        href={LINKS.console}
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
