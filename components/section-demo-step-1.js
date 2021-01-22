import styles from './section-demo-step-1.module.css'
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Stack from './stack'
import Button from './button'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
  names
} from 'unique-names-generator'
import { Input, Label } from './form'

const databaseNameConfig = {
  dictionaries: [adjectives, animals, names],
  separator: '-',
  style: 'lowerCase'
}

const DB_NAME = uniqueNamesGenerator(databaseNameConfig)

function Login({ loading, onCreateDB }) {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithPopup,
    logout,
    getIdTokenClaims
  } = useAuth0()

  useEffect(() => {
    async function getToken() {
      console.log(await getIdTokenClaims())
    }
    !isLoading && getToken()
  }, [isLoading, getIdTokenClaims])

  return (
    <Stack>
      {isLoading && <p>Loading...</p>}

      {error && <div style={{ marginBottom: 16 }}>Oops... {error.message}</div>}

      {isAuthenticated ? (
        <Stack gap={24} className={styles.loggedIn}>
          <div>
            <div className={styles.loggedInUser}>
              <img src={user.picture} width={32} alt={user.name} />
              <span>{user.name}</span>
              {/*<button*/}
              {/*  style={{*/}
              {/*    border: '1px solid',*/}
              {/*    padding: '3px 6px',*/}
              {/*    marginLeft: 5*/}
              {/*  }}*/}
              {/*  onClick={() => logout({ returnTo: process.env.BASE_URL })}*/}
              {/*>*/}
              {/*  Logout*/}
              {/*</button>*/}
            </div>
          </div>
          <Button
            theme="primary"
            className={styles.loggedInButton}
            isLoading={loading}
            onClick={onCreateDB}
          >
            Create
          </Button>
        </Stack>
      ) : (
        <Button onClick={loginWithPopup} theme="primary">
          Login and Create
        </Button>
      )}
    </Stack>
  )
}

function Form({ loading, onCreateDB }) {
  return (
    <div className={styles.form}>
      <Stack gap={24}>
        {/* name */}
        <Stack gap={8}>
          <Label htmlFor="db-name">Database Name</Label>
          <Input id="db-name" defaultValue={DB_NAME} />
        </Stack>
        {/* region */}
        <Stack gap={8}>
          <Label htmlFor="db-region">Region</Label>
          <Input
            id="db-region"
            disabled
            defaultValue="US-EAST-1 (N. Virginia)"
          />
        </Stack>
        {/* create */}
        <Login loading={loading} onCreateDB={onCreateDB} />
      </Stack>
    </div>
  )
}

function Result({ db }) {
  return (
    <div className={styles.result}>
      <Stack gap={8} className={styles.loggedIn}>
        <div>
          <Label>endpoint</Label>
          <CopyToClipboard text={db.endpoint}>
            <div>{db.endpoint}</div>
          </CopyToClipboard>
        </div>
        <div>
          <Label>password</Label>
          <CopyToClipboard text={db.password}>
            <div>{db.password}</div>
          </CopyToClipboard>
        </div>
        <div>
          <Label>Region</Label>
          <CopyToClipboard text={db.region}>
            <div>{db.region}</div>
          </CopyToClipboard>
        </div>
        <div>
          <Label>port</Label>
          <CopyToClipboard text={db.port}>
            <div>{db.port}</div>
          </CopyToClipboard>
        </div>
      </Stack>
    </div>
  )
}

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
    <div className={styles.step1}>
      {db ? (
        <Result db={db} />
      ) : (
        <Form loading={loading} onCreateDB={onCreateDB} />
      )}
    </div>
  )
}

export default Step1
