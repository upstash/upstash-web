import { Box } from '@chakra-ui/react'
import { useState } from 'react'

import Result from './step-1/result'
import Form from './step-1/form'

function Step1() {
  const [loading, loadingSet] = useState(false)
  const [db, dbSet] = useState(null)

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
    // console.log(data)
    dbSet(data)
  }

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
