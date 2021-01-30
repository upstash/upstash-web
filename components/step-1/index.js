import { Box } from '@chakra-ui/react'

import Result from './result'
import Form from './form'

function Step1({ db, loading, onCreateDB }) {
  return (
    <Box>
      {db ? (
        <Result db={db} />
      ) : (
        <Form loading={loading} onCreateDB={onCreateDB} />
      )}
    </Box>
  )
}

export default Step1
