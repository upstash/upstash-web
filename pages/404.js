import Head from "next/head";
import { Container, Text, Heading } from "@chakra-ui/react";

function ErrorPage() {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>

      <Container centerContent maxW="2xl" py={40} textAlign="center">
        <Heading
          fontSize="8xl"
          bgGradient="linear(to-t, #00E9A3, #D2FBEE)"
          bgClip="text"
        >
          404
        </Heading>
        <Text>Something’s gone wrong...</Text>
      </Container>
    </>
  );
}

export default ErrorPage;
