import { useState } from 'react'
import { Container, Box, VStack } from '@chakra-ui/react'
import Bg from './bg'
import Header from './section-demo-header'
import Step1 from './step-1'
import Step2 from './step-2'
import Step3 from './step-3'
import { sizes } from '../theme'
import { useAuth0 } from '@auth0/auth0-react'

function SectionDemo(props) {
  const auth0 = useAuth0()

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

        <VStack spacing={[20, 32]} align="stretch">
          <VStack spacing={[8, 12]} align="stretch">
            <Header
              number="1"
              title="Create"
              desc="Create your database in seconds."
            />
            <Box>
              <Step1
                auth0={auth0}
                db={db}
                loading={loading}
                onCreateDB={onCreateDB}
              />
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

          {db && (
            <VStack spacing={[8, 12]} align="stretch">
              <Header
                number="3"
                title="And More"
                desc="The console awaits you for more"
              />
              <Box>
                <Step3 />
              </Box>
            </VStack>
          )}
        </VStack>

        {/*  */}
      </Container>
    </Box>
  )
}

export default SectionDemo
