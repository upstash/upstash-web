import { Box, Flex } from '@chakra-ui/react'

function Window({ children }) {
  return (
    <Box bg="mainBlack" borderRadius="xl" boxShadow="lg">
      <Flex
        direction="column"
        height="100%"
        overflow="hidden"
        bg="whiteAlpha.200"
        borderRadius="xl"
      >
        {children}
      </Flex>
    </Box>
  )
}

export default Window
