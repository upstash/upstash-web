import { Container, Box } from '@chakra-ui/react'
import Bg from './bg'
import Step1 from './step-1'
import Step2 from './step-2'
import { sizes } from '../theme'

function SectionDemo(props) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      marginTop="-80px"
      pt="100px"
      pb={['80px', '160px']}
      textAlign="center"
      {...props}
    >
      <Bg top={`${sizes.bubble / 2 + 100}px`} />

      <Container maxW="5xl">
        {/* */}

        <Step1 />

        <Step2 />

        {/*  */}
      </Container>
    </Box>
  )
}

export default SectionDemo
