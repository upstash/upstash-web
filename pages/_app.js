import theme from '../theme'
import Head from 'next/head'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import FontFace from '../components/font-face'
import Footer from '../components/footer'
import Header from '../components/header'
import MobileMenu from '../components/mobile-menu'
import 'react-typist/dist/Typist.css'
import * as gtag from '../lib/gtag'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NODE_ENV !== 'development') {
        gtag.pageview(url)
      }
    }
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <FontFace />

      <Header onOpen={onOpen} />
      <MobileMenu isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </ChakraProvider>
  )
}
