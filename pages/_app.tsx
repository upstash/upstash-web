import "styles/app.css";
import "styles/prism.css";
import "react-typist/dist/Typist.css";
import "@upstash/claps/style.css";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { Box, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import Head from "next/head";
import Footer from "components/footer";
import Header from "components/header";
import MobileMenu from "components/mobile-menu";
import * as gtag from "lib/gtag";
import { META } from "constants/";
import theme from "theme";
import { Provider, CachePolicies } from "use-http";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleRouteChange = (url) => {
      if (process.env.NODE_ENV !== "development") {
        gtag.pageview(url);
      }
    };
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const options = {
    cachePolicy: CachePolicies.NO_CACHE,
    interceptors: {
      request: async ({ options, url, path, route }) => {
        return options;
      },
      response: async ({ response }) => {
        return response;
      },
    },
  };

  return (
    <ChakraProvider theme={theme}>
      <Provider url={`${process.env.NEXT_PUBLIC_URL}/api`} options={options}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />

          {/* base */}
          <title key="title">{META.title}</title>
          <meta
            key="description"
            name="description"
            content={META.description}
          />
          <link key="canonical" rel="canonical" href={META.url} />

          {/* facebook */}
          <meta key="og:url" property="og:url" content={META.url} />
          <meta key="og:type" property="og:type" content="website" />
          <meta key="og:title" property="og:title" content={META.title} />
          <meta
            key="og:image"
            property="og:image"
            content={META.coverImagePath}
          />
          <meta
            key="og:description"
            property="og:description"
            content={META.description}
          />

          {/* twitter */}
          <meta
            key="twitter:card"
            name="twitter:card"
            content="summary_large_image"
          />
          <meta key="twitter:url" name="twitter:url" content={META.url} />
          <meta
            key="twitter:site"
            name="twitter:site"
            content={META.twitterAccount}
          />
          <meta
            key="twitter:author"
            name="twitter:author"
            content={META.twitterAccount}
          />
          <meta key="twitter:title" name="twitter:title" content={META.title} />
          <meta
            key="twitter:image"
            name="twitter:image"
            content={META.coverImagePath}
          />
          <meta
            key="twitter:description"
            name="twitter:description"
            content={META.description}
          />
        </Head>

        <Box overflow="hidden">
          <Header onOpen={onOpen} />
          <MobileMenu isOpen={isOpen} onClose={onClose} />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </Box>
      </Provider>
    </ChakraProvider>
  );
}
