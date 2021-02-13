import { Container, Box, SimpleGrid } from '@chakra-ui/react'
// import Bg from './bg'
import Step1 from './demo/step-1'
import Step2 from './demo/step-2'

function SectionDemo(props) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      pb="220px"
      textAlign="center"
      {...props}
    >
      {/*<Bg top="40px" />*/}

      <Container maxW="5xl">
        <SimpleGrid columns={2} spacing={8}>
          <Step1 />
          <Step2 />
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default SectionDemo
