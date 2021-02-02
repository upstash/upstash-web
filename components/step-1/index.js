import { Box } from '@chakra-ui/react'

import Result from './result'
import Form from './form'

function Step1({ auth0, db, loading, onCreateDB, apierror }) {
  return (
    <Box>
      {db ? (
        <Result db={db} />
      ) : (
        <Form auth0={auth0} loading={loading} apierror={apierror} onCreateDB={onCreateDB} />
      )}
    </Box>
  )
}

export default Step1
