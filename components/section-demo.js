import { Container, Box, SimpleGrid } from '@chakra-ui/react'
import Step1 from './demo/step-1'
import Step2 from './demo/step-2'
import Bg from './bg'
import Title from './demo/title'

function SectionDemo(props) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      pb={['120px', '220px']}
      textAlign="center"
      {...props}
    >
      <Bg top="140px" />

      <Container maxW="5xl">
        <SimpleGrid columns={[1, 1, 2]} spacing={8}>
          <Step1 />
          <Step2 />
        </SimpleGrid>

        <SimpleGrid columns={[1, 1, 2]} spacing={[6, 8]} mt={6}>
          <Title number="1">Create database in 20 second</Title>
          <Title number="2">Read/Write latency &lt;2 ms</Title>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export default SectionDemo
