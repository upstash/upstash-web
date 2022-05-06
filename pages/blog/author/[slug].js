import Head from "next/head";
import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import PostCard from "components/post-card";
import Bg from "components/bg";
import Section from "components/section";
import { allBlogs } from "contentlayer/generated";
import { countBy, flatten, toLower } from "lodash";
import Link from "components/link";

export async function getStaticPaths() {
  const { undefined, ...authors } = countBy(
    flatten(allBlogs.map((p) => p.author))
  );

  const paths = Object.entries(authors).map(([key]) => ({
    params: { slug: key },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts = allBlogs.filter((p) => {
    return toLower(p.author) === toLower(params.slug);
  });

  if (!posts.length) {
    return {
      redirect: {
        destination: "/404",
      },
    };
  }

  return {
    props: {
      posts,
      slug: params.slug,
    },
  };
}

export default function CareerPage({ posts, slug }) {
  return (
    <>
      <Head>
        <title>Blog - Upstash</title>
      </Head>

      <Box as="section" py={["60px", "80px"]} textAlign="center">
        <Container maxW="5xl">
          <Box as="header">
            <Heading as="h1" fontWeight="normal" size="2xl">
              <Text as="span" color="whiteAlpha.500">
                blog/author/
              </Text>
              <Text as="span" fontWeight="bold">
                {slug}
              </Text>
            </Heading>

            <Box mt={8}>
              <Link href="/blog">Back to All Posts</Link>
            </Box>
          </Box>
        </Container>
      </Box>

      <Section py={["80px", "140px"]}>
        <Bg />

        <Container maxW="5xl">
          <SimpleGrid columns={{ sm: 1, md: 2 }} spacing="24px">
            {posts.map((post) => {
              return <PostCard key={post.slug} {...post} />;
            })}
          </SimpleGrid>
        </Container>
      </Section>
    </>
  );
}
