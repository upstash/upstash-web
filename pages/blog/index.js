import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import Bg from "components/bg";
import Section from "components/section";
import PostCard from "components/post-card";
import { compareDesc } from "date-fns";
import { allBlogs } from "contentlayer/generated";

export async function getStaticProps() {
  const posts = allBlogs.sort((a, b) => {
    return compareDesc(new Date(a.date), new Date(b.date));
  });

  return { props: { posts } };
}

export default function CareerPage({ posts }) {
  return (
    <>
      <Head>
        <title>Blog - Upstash</title>
      </Head>

      <Box as="section" py={["100px", "140px"]} textAlign="center">
        <Container maxW="3xl">
          <Heading as="h1" fontWeight="extrabold" size="3xl">
            Blog
          </Heading>
        </Container>
      </Box>

      <Container maxW="5xl">
        <SimpleGrid columns={2} spacing={10}>
          {posts.map((post) => {
            return <PostCard key={post.slug} {...post} />;
          })}
        </SimpleGrid>
      </Container>
    </>
  );
}
