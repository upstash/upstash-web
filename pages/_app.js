import theme from '../theme'
import Head from 'next/head'
import { ChakraProvider, useDisclosure } from '@chakra-ui/react'
import FontFace from '../components/font-face'
import Footer from '../components/footer'
import Header from '../components/header'
import MobileMenu from '../components/mobile-menu'
import { StoreProvider } from '../store'

export default function MyApp({ Component, pageProps }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <StoreProvider>
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
    </StoreProvider>
  )
}
