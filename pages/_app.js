import theme from '../theme'
import Head from 'next/head'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import { Auth0Provider } from '@auth0/auth0-react'
import FontFace from '../components/font-face'
import Footer from '../components/footer'
import Header from '../components/header'
import MobileMenu from '../components/mobile-menu'
import { StoreProvider } from '../store'

export default function MyApp({ Component, pageProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      audience={process.env.NEXT_PUBLIC_AUDIENCE}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
    >
      <StoreProvider>
        <ChakraProvider theme={theme}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <FontFace />

          <Header onOpen={onOpen} />
          <MobileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </ChakraProvider>
      </StoreProvider>
    </Auth0Provider>
  )
}
