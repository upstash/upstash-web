import { Container, Box } from '@chakra-ui/react'
import Bg from './bg'
import Header from './section-demo-header'
import Stack from './stack'
import Step1 from './section-demo-step-1'
import Step2 from './section-demo-step-2'
import Step3 from './section-demo-step-3'
import { sizes } from '../theme'

function SectionDemo(props) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      marginTop="32px"
      pb={['80px', '160px']}
      textAlign="center"
      {...props}
    >
      <Bg top={`${sizes.bubble / 2}px`} />

      <Container maxW="5xl">
        {/* */}

        <Stack gap={80} gapT={120}>
          <Box>
            <Stack gap={40} gapT={60}>
              <Header
                number="1"
                title="Create"
                desc="Create your serverless database in seconds."
              />
              <Step1 />
            </Stack>
          </Box>

          <Box>
            <Stack gap={40} gapT={60}>
              <Header
                number="2"
                title="Connect"
                desc="Only pay for successful transactions."
              />
              <Step2 />
            </Stack>
          </Box>

          <Box>
            <Header number="3" title="And More" />
            <Step3 />
          </Box>
        </Stack>

        {/*  */}
      </Container>
    </Box>
  )
}

export default SectionDemo
