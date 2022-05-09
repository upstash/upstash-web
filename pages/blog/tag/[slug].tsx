import Head from "next/head";
import Link from "components/link";
import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import PostCard from "components/post-card";
import Bg from "components/bg";
import Section from "components/section";
import { allPosts } from "contentlayer/generated";
import type { Post } from "contentlayer/generated";
import { countBy, flatten, toLower } from "lodash";
import { compareDesc } from "date-fns";

export async function getStaticPaths() {
  const { undefined, ...tags } = countBy(
    flatten(allPosts.map((p: Post) => p.tags))
  );

  const paths = Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .map(([key]) => ({
      params: { slug: key },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const posts: Post[] = allPosts
    .filter((post) => {
      return post.tags?.find((c) => toLower(c) === toLower(params.slug));
    })
    .sort((a: Post, b: Post) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  console.log(posts);

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

export default function BlogTagPage({
  posts,
  slug,
}: {
  posts: Post[];
  slug: string;
}) {
  return (
    <>
      <Head>
        <title>tag/{slug} | Upstash Blog</title>
      </Head>

      <Box as="section" py={["60px", "80px"]} textAlign="center">
        <Container maxW="5xl">
          <Box as="header">
            <Heading as="h1" fontWeight="normal" size="2xl">
              <Text as="span" color="whiteAlpha.500">
                blog/tag/
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
