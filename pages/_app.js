import '../styles/variables.css'
import theme from '../theme'
import Head from 'next/head'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import ReactTooltip from 'react-tooltip'
import { Auth0Provider } from '@auth0/auth0-react'
import FontFace from '../components/font-face'
import Footer from '../components/footer'
import Header from '../components/header'
import MobileMenu from '../components/mobile-menu'

export default function MyApp({ Component, pageProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Auth0Provider
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      redirectUri={process.env.NEXT_PUBLIC_REDIRECT_URI}
    >
      <ChakraProvider theme={theme}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Header onOpen={onOpen} />
        <MobileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />

        <main>
          <Component {...pageProps} />
        </main>

        <Footer />
        <FontFace />

        <ReactTooltip
          className="customTooltip"
          place="top"
          type="dark"
          effect="solid"
        />
      </ChakraProvider>
    </Auth0Provider>
  )
}
