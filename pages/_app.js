import Head from 'next/head'
import { StoreProvider } from '../store'
import { Auth0Provider } from '@auth0/auth0-react'
import '../styles/app.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </Auth0Provider>
  )
}
