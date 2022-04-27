import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { allBlogs } from "contentlayer/generated";

export async function getStaticPaths() {
  const paths = allBlogs.map((doc) => ({ params: { slug: doc.slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = allBlogs.find((doc) => doc.slug === params.slug);

  return {
    props: {
      post,
    },
  };
}

export default function CareerDetailPage({ post }) {
  return (
    <>
      <Head>
        <title>Careers - Upstash</title>
      </Head>

      <Box as="section" py={["100px", "120px"]} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
            {post.title}
          </Heading>
        </Container>
      </Box>
    </>
  );
}
