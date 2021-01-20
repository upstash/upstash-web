import Bg from '../bg'
import Header from './header'
import Stack from '../stack'
import Step1 from './step-1'
import Step2 from './step-2'
import Step3 from './step-3'
import { Container, Box } from '@chakra-ui/react'

function SectionDemo(props) {
  return (
    <Box
      as="section"
      pos="relative"
      overflow="hidden"
      marginTop="32px"
      py={['80px', '160px']}
      textAlign="center"
      {...props}
    >
      <Bg />

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
