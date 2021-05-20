import { Box } from '@chakra-ui/react'

function Section({ children, ...props }) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      textAlign="center"
      mb={[20, 40]}
      {...props}
    >
      {children}
    </Box>
  )
}

export default Section
