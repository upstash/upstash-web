import { useState } from 'react'
import { Container, Box, VStack } from '@chakra-ui/react'
import Bg from './bg'
import Header from './section-demo-header'
import Step1 from './step-1'
import Step2 from './step-2'
import Step3 from './step-3'
import { sizes } from '../theme'

function SectionDemo(props) {
  const [loading, loadingSet] = useState(false)
  const [db, dbSet] = useState()

  const onCreateDB = async () => {
    loadingSet(true)
    const response = await fetch('/api/create', {
      method: 'POST',
      body: JSON.stringify({
        name: ''
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
    const data = await response.json()
    dbSet(data)
  }

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

        <VStack spacing={[16, 40]} align="stretch">
          <VStack spacing={[8, 12]} align="stretch">
            <Header
              number="1"
              title="Create"
              desc="Create your database in seconds."
            />
            <Box>
              <Step1 db={db} loading={loading} onCreateDB={onCreateDB} />
            </Box>
          </VStack>

          <VStack spacing={[8, 12]} align="stretch">
            <Header
              number="2"
              title="Connect"
              desc="Connect with any Redis client from anywhere."
            />
            <Box>
              <Step2 db={db} />
            </Box>
          </VStack>

          <VStack spacing={[8, 12]} align="stretch">
            <Header number="3" title="And More" />
            <Box>
              <Step3 />
            </Box>
          </VStack>
        </VStack>

        {/*  */}
      </Container>
    </Box>
  )
}

export default SectionDemo
