import { Box, Flex } from '@chakra-ui/react'

function Window({ children, ...props }) {
  return (
    <Box
      overflow="hidden"
      bg="mainBlack"
      borderRadius="xl"
      boxShadow="dark-lg"
      {...props}
    >
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
